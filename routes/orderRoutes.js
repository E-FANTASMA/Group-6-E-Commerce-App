const express = require('express');
const { getOrders, getOrderById } = require('../controllers/orderController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);
router.get('/', getOrders);
router.get('/:orderId', getOrderById);

module.exports = router;
