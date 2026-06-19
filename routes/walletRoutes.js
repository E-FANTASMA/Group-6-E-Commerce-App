const express = require('express');
const {
  getWallet,
  topUpWallet,
  getWalletTransactions,
} = require('../controllers/walletController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);
router.get('/', getWallet);
router.post('/top-up', topUpWallet);
router.get('/transactions', getWalletTransactions);

module.exports = router;
