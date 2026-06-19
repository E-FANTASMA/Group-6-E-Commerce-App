const supabaseAdmin = require('../config/supabaseAdmin');

class Payment {
  static async create(paymentData) {
    try {
      const { data, error } = await supabaseAdmin
        .from('payments')
        .insert([
          {
            ...paymentData,
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

  static async listByUserId(userId) {
    try {
      const { data, error } = await supabaseAdmin
        .from('payments')
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

module.exports = Payment;
