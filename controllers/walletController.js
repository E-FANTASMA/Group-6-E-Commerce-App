const Wallet = require('../models/Wallet');
const Payment = require('../models/Payment');
const { validateData, walletTopUpSchema } = require('../utils/validation');
const { DEFAULT_CURRENCY, generateReference, toMoneyNumber } = require('../utils/commerceUtils');

const getWallet = async (req, res) => {
  try {
    const walletResult = await Wallet.getOrCreateByUserId(req.user.id);

    if (!walletResult.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch wallet',
        error: walletResult.error,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Wallet fetched successfully',
      data: walletResult.data,
    });
  } catch (error) {
    console.error('Get wallet error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching wallet',
      error: error.message,
    });
  }
};

const topUpWallet = async (req, res) => {
  try {
    const { value, error } = validateData(req.body, walletTopUpSchema);

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Invalid wallet top-up data',
        errors: error.details.map((detail) => detail.message),
      });
    }

    const walletResult = await Wallet.getOrCreateByUserId(req.user.id);

    if (!walletResult.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to initialize wallet',
        error: walletResult.error,
      });
    }

    const wallet = walletResult.data;
    const amount = toMoneyNumber(value.amount);
    const balanceBefore = toMoneyNumber(wallet.balance);
    const balanceAfter = toMoneyNumber(balanceBefore + amount);
    const reference = value.reference || generateReference('TOPUP');

    const updateResult = await Wallet.updateBalance(req.user.id, balanceAfter);

    if (!updateResult.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to update wallet balance',
        error: updateResult.error,
      });
    }

    const transactionResult = await Wallet.createTransaction({
      user_id: req.user.id,
      type: 'credit',
      amount,
      balance_before: balanceBefore,
      balance_after: balanceAfter,
      reference,
      description: value.description || 'Demo wallet top-up',
      status: 'completed',
      currency: DEFAULT_CURRENCY,
      metadata: { source: 'demo-top-up' },
    });

    if (!transactionResult.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to record wallet transaction',
        error: transactionResult.error,
      });
    }

    await Payment.create({
      user_id: req.user.id,
      order_id: null,
      amount,
      currency: DEFAULT_CURRENCY,
      payment_method: 'demo_top_up',
      provider: 'demo-wallet',
      provider_reference: reference,
      status: 'completed',
      metadata: {
        description: value.description || 'Demo wallet top-up',
      },
    });

    res.status(201).json({
      success: true,
      message: 'Wallet funded successfully with demo money',
      data: {
        wallet: updateResult.data,
        transaction: transactionResult.data,
      },
    });
  } catch (error) {
    console.error('Top up wallet error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while funding wallet',
      error: error.message,
    });
  }
};

const getWalletTransactions = async (req, res) => {
  try {
    const result = await Wallet.listTransactions(req.user.id);

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch wallet transactions',
        error: result.error,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Wallet transactions fetched successfully',
      data: result.data,
    });
  } catch (error) {
    console.error('Get wallet transactions error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching wallet transactions',
      error: error.message,
    });
  }
};

module.exports = {
  getWallet,
  topUpWallet,
  getWalletTransactions,
};
