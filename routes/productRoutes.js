const express = require('express');
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getCategories,
  uploadImage,
} = require('../controllers/productController');
const { authenticate, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

/**
 * @route   POST /api/products
 * @desc    Create a product for sale
 * @access  Private
 */
router.post('/', authenticate, authorizeRoles('admin'), createProduct);

/**
 * @route   GET /api/products
 * @desc    Get all products with filters
 * @access  Private
 */
router.get('/', authenticate, getProducts);

/**
 * @route   GET /api/products/categories
 * @desc    Get all available product categories
 * @access  Private
 */
router.get('/categories', authenticate, getCategories);

/**
 * @route   POST /api/products/upload-image
 * @desc    Upload a product image
 * @access  Private
 */
router.post('/upload-image', authenticate, authorizeRoles('admin'), uploadImage);

/**
 * @route   PUT /api/products/:id
 * @desc    Update a product for sale
 * @access  Private (Admin)
 */
router.put('/:id', authenticate, authorizeRoles('admin'), updateProduct);

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete a product for sale
 * @access  Private (Admin)
 */
router.delete('/:id', authenticate, authorizeRoles('admin'), deleteProduct);

module.exports = router;
