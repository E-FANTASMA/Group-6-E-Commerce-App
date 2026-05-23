const supabaseAdmin = require('../config/supabaseAdmin');
const Product = require('./Product');

class Cart {
  static async findItemByUserAndProduct(userId, productId) {
    try {
      const { data, error } = await supabaseAdmin
        .from('cart_items')
        .select('*')
        .eq('user_id', userId)
        .eq('product_id', productId)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      return data || null;
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  }

  static async listByUserId(userId) {
    try {
      const { data, error } = await supabaseAdmin
        .from('cart_items')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: true });

      if (error) {
        throw error;
      }

      const items = data || [];
      const productIds = [...new Set(items.map((item) => item.product_id))];

      let productMap = new Map();

      if (productIds.length) {
        const { data: products, error: productError } = await supabaseAdmin
          .from('products')
          .select('*')
          .in('id', productIds);

        if (productError) {
          throw productError;
        }

        productMap = new Map((products || []).map((product) => [product.id, product]));
      }

      return {
        success: true,
        data: items
          .map((item) => ({
            ...item,
            product: productMap.get(item.product_id) || null,
          }))
          .filter((item) => item.product),
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async addOrIncrementItem(userId, productId, quantity) {
    try {
      const product = await Product.findById(productId);

      if (!product) {
        return { success: false, status: 404, error: 'Product not found' };
      }

      const existingItem = await Cart.findItemByUserAndProduct(userId, productId);

      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;

        const { data, error } = await supabaseAdmin
          .from('cart_items')
          .update({
            quantity: newQuantity,
            updated_at: new Date(),
          })
          .eq('id', existingItem.id)
          .eq('user_id', userId)
          .select()
          .single();

        if (error) {
          throw error;
        }

        return { success: true, data };
      }

      const { data, error } = await supabaseAdmin
        .from('cart_items')
        .insert([
          {
            user_id: userId,
            product_id: productId,
            quantity,
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

  static async updateQuantity(itemId, userId, quantity) {
    try {
      const { data, error } = await supabaseAdmin
        .from('cart_items')
        .update({
          quantity,
          updated_at: new Date(),
        })
        .eq('id', itemId)
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

  static async removeItem(itemId, userId) {
    try {
      const { error } = await supabaseAdmin
        .from('cart_items')
        .delete()
        .eq('id', itemId)
        .eq('user_id', userId);

      if (error) {
        throw error;
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async clear(userId) {
    try {
      const { error } = await supabaseAdmin
        .from('cart_items')
        .delete()
        .eq('user_id', userId);

      if (error) {
        throw error;
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

module.exports = Cart;
