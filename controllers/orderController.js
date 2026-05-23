const Order = require('../models/Order');
const Payment = require('../models/Payment');

const getOrders = async (req, res) => {
  try {
    const [ordersResult, paymentsResult] = await Promise.all([
      Order.listByUserId(req.user.id),
      Payment.listByUserId(req.user.id),
    ]);

    if (!ordersResult.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch orders',
        error: ordersResult.error,
      });
    }

    const paymentsByOrderId = new Map();

    if (paymentsResult.success) {
      paymentsResult.data.forEach((payment) => {
        if (!payment.order_id) {
          return;
        }

        const current = paymentsByOrderId.get(payment.order_id) || [];
        current.push(payment);
        paymentsByOrderId.set(payment.order_id, current);
      });
    }

    const orders = ordersResult.data.map((order) => ({
      ...order,
      payments: paymentsByOrderId.get(order.id) || [],
    }));

    res.status(200).json({
      success: true,
      message: 'Order history fetched successfully',
      data: orders,
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching order history',
      error: error.message,
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findByIdForUser(req.params.orderId, req.user.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Order fetched successfully',
      data: order,
    });
  } catch (error) {
    console.error('Get order by id error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching order',
      error: error.message,
    });
  }
};

module.exports = {
  getOrders,
  getOrderById,
};
