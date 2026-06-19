const express = require('express');
const { previewCheckout, checkout } = require('../controllers/checkoutController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);
router.get('/preview', previewCheckout);
router.post('/', checkout);

module.exports = router;
