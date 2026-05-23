const Product = require('../models/Product');
const {
  validateData,
  productFilterSchema,
  productImageUploadSchema,
  createProductSchema,
  updateProductSchema,
} = require('../utils/validation');
const { uploadProductImage, PRODUCT_IMAGES_BUCKET } = require('../utils/storageUtils');

/**
 * Create a new product
 * @param {object} req
 * @param {object} res
 */
const createProduct = async (req, res) => {
  try {
    const { value, error } = validateData(req.body, createProductSchema);

    if (error) {
      const messages = error.details.map((detail) => detail.message);

      return res.status(400).json({
        success: false,
        message: 'Invalid product data',
        errors: messages,
      });
    }

    const productPayload = {
      name: value.name,
      description: value.description || null,
      category: value.category,
      price: value.price,
      image_url: value.image_url || value.image_path || null,
      stock_quantity: value.stock_quantity,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const result = await Product.create(productPayload);

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to create product',
        error: result.error,
      });
    }

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: result.data,
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating product',
      error: error.message,
    });
  }
};

/**
 * Update an existing product
 * @param {object} req
 * @param {object} res
 */
const updateProduct = async (req, res) => {
  try {
    const existingProduct = await Product.findById(req.params.id);

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    const { value, error } = validateData(req.body, updateProductSchema);

    if (error) {
      const messages = error.details.map((detail) => detail.message);

      return res.status(400).json({
        success: false,
        message: 'Invalid product update data',
        errors: messages,
      });
    }

    const updates = {
      ...value,
      updated_at: new Date(),
    };

    if (Object.prototype.hasOwnProperty.call(value, 'description')) {
      updates.description = value.description || null;
    }

    if (
      Object.prototype.hasOwnProperty.call(value, 'image_url') ||
      Object.prototype.hasOwnProperty.call(value, 'image_path')
    ) {
      updates.image_url = value.image_url || value.image_path || null;
      delete updates.image_path;
    }

    const result = await Product.update(req.params.id, updates);

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to update product',
        error: result.error,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: result.data,
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating product',
      error: error.message,
    });
  }
};

/**
 * Delete a product
 * @param {object} req
 * @param {object} res
 */
const deleteProduct = async (req, res) => {
  try {
    const existingProduct = await Product.findById(req.params.id);

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    const result = await Product.delete(req.params.id);

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to delete product',
        error: result.error,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting product',
      error: error.message,
    });
  }
};

/**
 * Get all products with filtering support
 * @param {object} req
 * @param {object} res
 */
const getProducts = async (req, res) => {
  try {
    const { value, error } = validateData(req.query, productFilterSchema);

    if (error) {
      const messages = error.details.map((detail) => detail.message);

      return res.status(400).json({
        success: false,
        message: 'Invalid product filter parameters',
        errors: messages,
      });
    }

    const result = await Product.findAll(value);

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch products',
        error: result.error,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully',
      filters: value,
      pagination: result.pagination,
      data: result.data,
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching products',
      error: error.message,
    });
  }
};

/**
 * Get all available product categories
 * @param {object} req
 * @param {object} res
 */
const getCategories = async (req, res) => {
  try {
    const result = await Product.getCategories();

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch categories',
        error: result.error,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Categories fetched successfully',
      data: result.data,
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching categories',
      error: error.message,
    });
  }
};

/**
 * Upload product image to Supabase Storage
 * @param {object} req
 * @param {object} res
 */
const uploadImage = async (req, res) => {
  try {
    const { value, error } = validateData(req.body, productImageUploadSchema);

    if (error) {
      const messages = error.details.map((detail) => detail.message);

      return res.status(400).json({
        success: false,
        message: 'Invalid image upload data',
        errors: messages,
      });
    }

    const result = await uploadProductImage(value);

    res.status(201).json({
      success: true,
      message: 'Product image uploaded successfully',
      data: result,
    });
  } catch (error) {
    console.error('Upload image error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while uploading product image',
      error: error.message,
      bucket: PRODUCT_IMAGES_BUCKET,
    });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getCategories,
  uploadImage,
};
