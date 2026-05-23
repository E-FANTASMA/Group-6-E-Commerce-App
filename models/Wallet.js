const supabaseAdmin = require('../config/supabaseAdmin');
const { DEFAULT_CURRENCY, toMoneyNumber } = require('../utils/commerceUtils');

class Wallet {
  static async getByUserId(userId) {
    try {
      const { data, error } = await supabaseAdmin
        .from('wallets')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      return data || null;
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  }

  static async getOrCreateByUserId(userId) {
    try {
      const existingWallet = await Wallet.getByUserId(userId);

      if (existingWallet) {
        return { success: true, data: existingWallet };
      }

      const { data, error } = await supabaseAdmin
        .from('wallets')
        .insert([
          {
            user_id: userId,
            balance: 0,
            currency: DEFAULT_CURRENCY,
            created_at: new Date(),
            updated_at: new Date(),
          },
        ])
        .select()
        .single();

      if (error) {
        throw error;
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async updateBalance(userId, balance) {
    try {
      const { data, error } = await supabaseAdmin
        .from('wallets')
        .update({
          balance: toMoneyNumber(balance),
          updated_at: new Date(),
        })
        .eq('user_id', userId)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async createTransaction(transactionData) {
    try {
      const { data, error } = await supabaseAdmin
        .from('wallet_transactions')
        .insert([
          {
            ...transactionData,
            created_at: new Date(),
          },
        ])
        .select()
        .single();

      if (error) {
        throw error;
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async listTransactions(userId) {
    try {
      const { data, error } = await supabaseAdmin
        .from('wallet_transactions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return { success: true, data: data || [] };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

module.exports = Wallet;
