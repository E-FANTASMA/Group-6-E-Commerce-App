const Cart = require('../models/Cart');
const { validateData, cartItemSchema, cartItemUpdateSchema } = require('../utils/validation');
const { calculateCartTotals } = require('../utils/commerceUtils');

const buildCartResponse = async (userId) => {
  const result = await Cart.listByUserId(userId);

  if (!result.success) {
    throw new Error(result.error);
  }

  const cart = calculateCartTotals(result.data);

  return {
    items: cart.items,
    summary: {
      currency: cart.currency,
      subtotal: cart.subtotal,
      shippingFee: cart.shippingFee,
      total: cart.total,
      itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0),
      uniqueItems: cart.items.length,
    },
  };
};

const getCart = async (req, res) => {
  try {
    const cart = await buildCartResponse(req.user.id);

    res.status(200).json({
      success: true,
      message: 'Cart fetched successfully',
      data: cart,
    });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching cart',
      error: error.message,
    });
  }
};

const addCartItem = async (req, res) => {
  try {
    const { value, error } = validateData(req.body, cartItemSchema);

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Invalid cart item data',
        errors: error.details.map((detail) => detail.message),
      });
    }

    const result = await Cart.addOrIncrementItem(req.user.id, value.productId, value.quantity);

    if (!result.success) {
      return res.status(result.status || 500).json({
        success: false,
        message: result.error,
      });
    }

    const cart = await buildCartResponse(req.user.id);

    res.status(201).json({
      success: true,
      message: 'Item added to cart successfully',
      data: cart,
    });
  } catch (error) {
    console.error('Add cart item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while adding item to cart',
      error: error.message,
    });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { value, error } = validateData(req.body, cartItemUpdateSchema);

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Invalid cart update data',
        errors: error.details.map((detail) => detail.message),
      });
    }

    const result = await Cart.updateQuantity(req.params.itemId, req.user.id, value.quantity);

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to update cart item',
        error: result.error,
      });
    }

    const cart = await buildCartResponse(req.user.id);

    res.status(200).json({
      success: true,
      message: 'Cart item updated successfully',
      data: cart,
    });
  } catch (error) {
    console.error('Update cart item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating cart item',
      error: error.message,
    });
  }
};

const removeCartItem = async (req, res) => {
  try {
    const result = await Cart.removeItem(req.params.itemId, req.user.id);

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to remove cart item',
        error: result.error,
      });
    }

    const cart = await buildCartResponse(req.user.id);

    res.status(200).json({
      success: true,
      message: 'Cart item removed successfully',
      data: cart,
    });
  } catch (error) {
    console.error('Remove cart item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while removing cart item',
      error: error.message,
    });
  }
};

const clearCart = async (req, res) => {
  try {
    const result = await Cart.clear(req.user.id);

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to clear cart',
        error: result.error,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Cart cleared successfully',
      data: {
        items: [],
        summary: {
          currency: process.env.WALLET_CURRENCY || 'NGN',
          subtotal: 0,
          shippingFee: 0,
          total: 0,
          itemCount: 0,
          uniqueItems: 0,
        },
      },
    });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while clearing cart',
      error: error.message,
    });
  }
};

module.exports = {
  getCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearCart,
};
