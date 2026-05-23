const supabase = require('../config/supabase');

class Product {
  /**
   * Create a new product
   * @param {object} productData
   * @returns {Promise<object>}
   */
  static async create(productData) {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([productData])
        .select()
        .single();

      if (error) {
        throw error;
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Find a product by ID
   * @param {string} id
   * @returns {Promise<object|null>}
   */
  static async findById(id) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      return data || null;
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  }

  /**
   * Update a product
   * @param {string} id
   * @param {object} updates
   * @returns {Promise<object>}
   */
  static async update(id, updates) {
    try {
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
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

  /**
   * Delete a product
   * @param {string} id
   * @returns {Promise<object>}
   */
  static async delete(id) {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Fetch products with filtering, sorting, and pagination
   * @param {object} filters
   * @returns {Promise<object>}
   */
  static async findAll(filters = {}) {
    try {
      const {
        category,
        search,
        minPrice,
        maxPrice,
        sortBy = 'created_at',
        sortOrder = 'desc',
        page = 1,
        limit = 20,
      } = filters;

      const from = (page - 1) * limit;
      const to = from + limit - 1;

      let query = supabase
        .from('products')
        .select('*', { count: 'exact' });

      if (category) {
        query = query.ilike('category', category);
      }

      if (search) {
        query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
      }

      if (minPrice !== undefined) {
        query = query.gte('price', minPrice);
      }

      if (maxPrice !== undefined) {
        query = query.lte('price', maxPrice);
      }

      query = query
        .order(sortBy, { ascending: sortOrder === 'asc' })
        .range(from, to);

      const { data, error, count } = await query;

      if (error) {
        throw error;
      }

      return {
        success: true,
        data: data || [],
        pagination: {
          page,
          limit,
          total: count || 0,
          totalPages: count ? Math.ceil(count / limit) : 0,
        },
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Fetch available product categories
   * @returns {Promise<object>}
   */
  static async getCategories() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('category')
        .not('category', 'is', null);

      if (error) {
        throw error;
      }

      const categories = [...new Set((data || []).map((item) => item.category).filter(Boolean))].sort();

      return {
        success: true,
        data: categories,
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

module.exports = Product;
