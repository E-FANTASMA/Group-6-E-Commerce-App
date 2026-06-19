const Cart = require('../models/Cart');
const Order = require('../models/Order');
const Payment = require('../models/Payment');
const Product = require('../models/Product');
const Wallet = require('../models/Wallet');
const { validateData, checkoutSchema } = require('../utils/validation');
const {
  DEFAULT_CURRENCY,
  calculateCartTotals,
  generateOrderNumber,
  generateReference,
  toMoneyNumber,
} = require('../utils/commerceUtils');

const buildCheckoutState = async (userId) => {
  const [cartResult, walletResult] = await Promise.all([
    Cart.listByUserId(userId),
    Wallet.getOrCreateByUserId(userId),
  ]);

  if (!cartResult.success) {
    throw new Error(cartResult.error);
  }

  if (!walletResult.success) {
    throw new Error(walletResult.error);
  }

  const totals = calculateCartTotals(cartResult.data);

  return {
    cartItems: totals.items,
    cartSummary: {
      currency: totals.currency,
      subtotal: totals.subtotal,
      shippingFee: totals.shippingFee,
      total: totals.total,
      itemCount: totals.items.reduce((sum, item) => sum + item.quantity, 0),
      uniqueItems: totals.items.length,
    },
    wallet: walletResult.data,
    canPayWithWallet: toMoneyNumber(walletResult.data.balance) >= totals.total,
  };
};

const previewCheckout = async (req, res) => {
  try {
    const checkout = await buildCheckoutState(req.user.id);

    res.status(200).json({
      success: true,
      message: 'Checkout preview fetched successfully',
      data: checkout,
    });
  } catch (error) {
    console.error('Preview checkout error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while preparing checkout preview',
      error: error.message,
    });
  }
};

const checkout = async (req, res) => {
  try {
    const { value, error } = validateData(req.body, checkoutSchema);

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Invalid checkout data',
        errors: error.details.map((detail) => detail.message),
      });
    }

    const checkoutState = await buildCheckoutState(req.user.id);

    if (!checkoutState.cartItems.length) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty',
      });
    }

    const outOfStockItems = checkoutState.cartItems.filter(
      (item) => item.quantity > Number(item.product.stock_quantity || 0)
    );

    if (outOfStockItems.length) {
      return res.status(400).json({
        success: false,
        message: 'Some cart items are out of stock',
        data: outOfStockItems.map((item) => ({
          productId: item.product.id,
          name: item.product.name,
          requestedQuantity: item.quantity,
          availableQuantity: item.product.stock_quantity,
        })),
      });
    }

    if (value.paymentMethod !== 'wallet') {
      return res.status(400).json({
        success: false,
        message: 'Only wallet payments are supported right now',
      });
    }

    if (!checkoutState.canPayWithWallet) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient wallet balance',
        data: {
          currentBalance: checkoutState.wallet.balance,
          total: checkoutState.cartSummary.total,
          currency: DEFAULT_CURRENCY,
        },
      });
    }

    const orderNumber = generateOrderNumber();
    const paymentReference = generateReference('PAY');

    const orderResult = await Order.create({
      user_id: req.user.id,
      order_number: orderNumber,
      status: 'pending',
      payment_status: 'pending',
      payment_method: 'wallet',
      subtotal_amount: checkoutState.cartSummary.subtotal,
      shipping_fee: checkoutState.cartSummary.shippingFee,
      total_amount: checkoutState.cartSummary.total,
      currency: DEFAULT_CURRENCY,
      shipping_address: value.shippingAddress || null,
      notes: value.notes || null,
    });

    if (!orderResult.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to create order',
        error: orderResult.error,
      });
    }

    const order = orderResult.data;

    const orderItemsPayload = checkoutState.cartItems.map((item) => ({
      order_id: order.id,
      product_id: item.product.id,
      product_name_snapshot: item.product.name,
      image_url_snapshot: item.product.image_url || null,
      category_snapshot: item.product.category || null,
      unit_price: item.unitPrice,
      quantity: item.quantity,
      line_total: item.lineTotal,
      created_at: new Date(),
    }));

    const orderItemsResult = await Order.createItems(orderItemsPayload);

    if (!orderItemsResult.success) {
      await Order.update(order.id, {
        status: 'failed',
        notes: 'Order items could not be recorded',
      });

      return res.status(500).json({
        success: false,
        message: 'Failed to save order items',
        error: orderItemsResult.error,
      });
    }

    for (const item of checkoutState.cartItems) {
      const newStockQuantity = Number(item.product.stock_quantity) - Number(item.quantity);
      const updateResult = await Product.update(item.product.id, {
        stock_quantity: newStockQuantity,
        updated_at: new Date(),
      });

      if (!updateResult.success) {
        await Order.update(order.id, {
          status: 'failed',
          notes: `Stock update failed for product ${item.product.id}`,
        });

        return res.status(500).json({
          success: false,
          message: 'Failed to update product stock during checkout',
          error: updateResult.error,
        });
      }
    }

    const balanceBefore = toMoneyNumber(checkoutState.wallet.balance);
    const balanceAfter = toMoneyNumber(balanceBefore - checkoutState.cartSummary.total);

    const walletUpdateResult = await Wallet.updateBalance(req.user.id, balanceAfter);

    if (!walletUpdateResult.success) {
      await Order.update(order.id, {
        status: 'failed',
        notes: 'Wallet debit failed',
      });

      return res.status(500).json({
        success: false,
        message: 'Failed to debit wallet',
        error: walletUpdateResult.error,
      });
    }

    const walletTransactionResult = await Wallet.createTransaction({
      user_id: req.user.id,
      type: 'debit',
      amount: checkoutState.cartSummary.total,
      balance_before: balanceBefore,
      balance_after: balanceAfter,
      reference: paymentReference,
      description: `Payment for order ${orderNumber}`,
      status: 'completed',
      currency: DEFAULT_CURRENCY,
      metadata: {
        orderId: order.id,
        orderNumber,
      },
    });

    if (!walletTransactionResult.success) {
      await Order.update(order.id, {
        status: 'failed',
        notes: 'Wallet transaction record failed',
      });

      return res.status(500).json({
        success: false,
        message: 'Failed to record wallet transaction',
        error: walletTransactionResult.error,
      });
    }

    const paymentResult = await Payment.create({
      user_id: req.user.id,
      order_id: order.id,
      amount: checkoutState.cartSummary.total,
      currency: DEFAULT_CURRENCY,
      payment_method: 'wallet',
      provider: 'demo-wallet',
      provider_reference: paymentReference,
      status: 'completed',
      metadata: {
        orderNumber,
      },
    });

    if (!paymentResult.success) {
      await Order.update(order.id, {
        status: 'failed',
        notes: 'Payment record failed',
      });

      return res.status(500).json({
        success: false,
        message: 'Failed to create payment record',
        error: paymentResult.error,
      });
    }

    await Order.update(order.id, {
      status: 'confirmed',
      payment_status: 'paid',
    });

    await Cart.clear(req.user.id);

    const finalOrder = await Order.findByIdForUser(order.id, req.user.id);

    res.status(201).json({
      success: true,
      message: 'Checkout completed successfully',
      data: {
        order: finalOrder,
        payment: paymentResult.data,
        wallet: walletUpdateResult.data,
      },
    });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during checkout',
      error: error.message,
    });
  }
};

module.exports = {
  previewCheckout,
  checkout,
};
