const crypto = require('crypto');

const DEFAULT_CURRENCY = process.env.WALLET_CURRENCY || 'NGN';

const toMoneyNumber = (value) => {
  const amount = Number(value || 0);

  if (!Number.isFinite(amount)) {
    return 0;
  }

  return Number(amount.toFixed(2));
};

const generateReference = (prefix) => {
  const randomPart = crypto.randomBytes(4).toString('hex').toUpperCase();
  return `${prefix}-${Date.now()}-${randomPart}`;
};

const generateOrderNumber = () => generateReference('ORD');

const calculateCartTotals = (items) => {
  const normalizedItems = items.map((item) => {
    const unitPrice = toMoneyNumber(item.product.price);
    const quantity = Number(item.quantity);
    const lineTotal = toMoneyNumber(unitPrice * quantity);

    return {
      ...item,
      unitPrice,
      quantity,
      lineTotal,
    };
  });

  const subtotal = toMoneyNumber(
    normalizedItems.reduce((sum, item) => sum + item.lineTotal, 0)
  );

  return {
    currency: DEFAULT_CURRENCY,
    items: normalizedItems,
    subtotal,
    shippingFee: 0,
    total: subtotal,
  };
};

module.exports = {
  DEFAULT_CURRENCY,
  toMoneyNumber,
  generateReference,
  generateOrderNumber,
  calculateCartTotals,
};
