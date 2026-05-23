const supabaseAdmin = require('../config/supabaseAdmin');

class Order {
  static async create(orderData) {
    try {
      const { data, error } = await supabaseAdmin
        .from('orders')
        .insert([
          {
            ...orderData,
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

  static async createItems(items) {
    try {
      const { data, error } = await supabaseAdmin
        .from('order_items')
        .insert(items)
        .select();

      if (error) {
        throw error;
      }

      return { success: true, data: data || [] };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async update(orderId, updates) {
    try {
      const { data, error } = await supabaseAdmin
        .from('orders')
        .update({
          ...updates,
          updated_at: new Date(),
        })
        .eq('id', orderId)
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

  static async getItemsForOrderIds(orderIds) {
    if (!orderIds.length) {
      return [];
    }

    const { data, error } = await supabaseAdmin
      .from('order_items')
      .select('*')
      .in('order_id', orderIds)
      .order('created_at', { ascending: true });

    if (error) {
      throw error;
    }

    return data || [];
  }

  static async hydrateOrders(orders) {
    const orderIds = orders.map((order) => order.id);
    const items = await Order.getItemsForOrderIds(orderIds);
    const orderItemsMap = new Map();

    items.forEach((item) => {
      const current = orderItemsMap.get(item.order_id) || [];
      current.push(item);
      orderItemsMap.set(item.order_id, current);
    });

    return orders.map((order) => ({
      ...order,
      items: orderItemsMap.get(order.id) || [],
    }));
  }

  static async listByUserId(userId) {
    try {
      const { data, error } = await supabaseAdmin
        .from('orders')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      const hydrated = await Order.hydrateOrders(data || []);
      return { success: true, data: hydrated };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async findByIdForUser(orderId, userId) {
    try {
      const { data, error } = await supabaseAdmin
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (!data) {
        return null;
      }

      const [hydrated] = await Order.hydrateOrders([data]);
      return hydrated;
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  }
}

module.exports = Order;
