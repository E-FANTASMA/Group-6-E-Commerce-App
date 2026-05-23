const Joi = require('joi');

/**
 * Validation schema for user signup
 */
const signupSchema = Joi.object({
  fullName: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.min': 'Full name must be at least 3 characters',
      'string.max': 'Full name must not exceed 100 characters',
      'any.required': 'Full name is required',
    }),
  email: Joi.string()
    .email()
    .lowercase()
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required',
    }),
  password: Joi.string()
    .min(8)
    .required()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .messages({
      'string.min': 'Password must be at least 8 characters',
      'string.pattern.base':
        'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      'any.required': 'Password is required',
    }),
  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'Passwords do not match',
      'any.required': 'Please confirm your password',
    }),
  phoneNumber: Joi.string()
    .pattern(/^\+?[1-9]\d{1,14}$/)
    .optional()
    .messages({
      'string.pattern.base': 'Please provide a valid phone number',
    }),
});

/**
 * Validation schema for user login
 */
const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .lowercase()
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required',
    }),
  password: Joi.string()
    .required()
    .messages({
      'any.required': 'Password is required',
    }),
});

const cartItemSchema = Joi.object({
  productId: Joi.string()
    .trim()
    .required()
    .messages({
      'any.required': 'Product ID is required',
    }),
  quantity: Joi.number()
    .integer()
    .min(1)
    .default(1)
    .messages({
      'number.base': 'Quantity must be a number',
      'number.integer': 'Quantity must be an integer',
      'number.min': 'Quantity must be at least 1',
    }),
});

const cartItemUpdateSchema = Joi.object({
  quantity: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      'number.base': 'Quantity must be a number',
      'number.integer': 'Quantity must be an integer',
      'number.min': 'Quantity must be at least 1',
      'any.required': 'Quantity is required',
    }),
});

const walletTopUpSchema = Joi.object({
  amount: Joi.number()
    .min(1)
    .required()
    .messages({
      'number.base': 'Amount must be a number',
      'number.min': 'Amount must be at least 1',
      'any.required': 'Amount is required',
    }),
  description: Joi.string()
    .trim()
    .max(255)
    .optional()
    .messages({
      'string.max': 'Description must not exceed 255 characters',
    }),
  reference: Joi.string()
    .trim()
    .max(120)
    .optional()
    .messages({
      'string.max': 'Reference must not exceed 120 characters',
    }),
});

const checkoutSchema = Joi.object({
  paymentMethod: Joi.string()
    .valid('wallet')
    .default('wallet')
    .messages({
      'any.only': 'Payment method must be wallet',
    }),
  notes: Joi.string()
    .trim()
    .allow('')
    .max(500)
    .optional()
    .messages({
      'string.max': 'Notes must not exceed 500 characters',
    }),
  shippingAddress: Joi.object({
    fullName: Joi.string().trim().max(100).optional(),
    phoneNumber: Joi.string().trim().max(30).optional(),
    line1: Joi.string().trim().max(255).optional(),
    line2: Joi.string().trim().max(255).allow('').optional(),
    city: Joi.string().trim().max(100).optional(),
    state: Joi.string().trim().max(100).optional(),
    postalCode: Joi.string().trim().max(30).allow('').optional(),
    country: Joi.string().trim().max(100).optional(),
  })
    .optional()
    .messages({
      'object.base': 'Shipping address must be an object',
    }),
});

/**
 * Validation schema for product filtering
 */
const productFilterSchema = Joi.object({
  category: Joi.string()
    .trim()
    .max(100)
    .optional()
    .messages({
      'string.max': 'Category must not exceed 100 characters',
    }),
  search: Joi.string()
    .trim()
    .max(150)
    .optional()
    .messages({
      'string.max': 'Search term must not exceed 150 characters',
    }),
  minPrice: Joi.number()
    .min(0)
    .optional()
    .messages({
      'number.base': 'Minimum price must be a number',
      'number.min': 'Minimum price cannot be negative',
    }),
  maxPrice: Joi.number()
    .min(0)
    .optional()
    .messages({
      'number.base': 'Maximum price must be a number',
      'number.min': 'Maximum price cannot be negative',
    }),
  sortBy: Joi.string()
    .valid('created_at', 'name', 'price', 'category')
    .default('created_at')
    .messages({
      'any.only': 'Sort by must be one of created_at, name, price, or category',
    }),
  sortOrder: Joi.string()
    .valid('asc', 'desc')
    .default('desc')
    .messages({
      'any.only': 'Sort order must be asc or desc',
    }),
  limit: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .default(20)
    .messages({
      'number.base': 'Limit must be a number',
      'number.integer': 'Limit must be an integer',
      'number.min': 'Limit must be at least 1',
      'number.max': 'Limit must not exceed 100',
    }),
  page: Joi.number()
    .integer()
    .min(1)
    .default(1)
    .messages({
      'number.base': 'Page must be a number',
      'number.integer': 'Page must be an integer',
      'number.min': 'Page must be at least 1',
    }),
}).custom((value, helpers) => {
  if (
    value.minPrice !== undefined &&
    value.maxPrice !== undefined &&
    value.minPrice > value.maxPrice
  ) {
    return helpers.error('any.invalid');
  }

  return value;
}, 'price range validation')
  .messages({
    'any.invalid': 'Minimum price cannot be greater than maximum price',
  });

/**
 * Validation schema for product image upload
 */
const productImageUploadSchema = Joi.object({
  fileName: Joi.string()
    .trim()
    .max(255)
    .required()
    .messages({
      'string.max': 'File name must not exceed 255 characters',
      'any.required': 'File name is required',
    }),
  contentType: Joi.string()
    .trim()
    .valid('image/jpeg', 'image/png', 'image/webp', 'image/gif')
    .required()
    .messages({
      'any.only': 'Content type must be image/jpeg, image/png, image/webp, or image/gif',
      'any.required': 'Content type is required',
    }),
  imageBase64: Joi.string()
    .trim()
    .required()
    .messages({
      'any.required': 'Image base64 data is required',
    }),
  folder: Joi.string()
    .trim()
    .max(100)
    .default('products')
    .messages({
      'string.max': 'Folder name must not exceed 100 characters',
    }),
});

/**
 * Validation schema for product creation
 */
const createProductSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(255)
    .required()
    .messages({
      'string.min': 'Product name must be at least 2 characters',
      'string.max': 'Product name must not exceed 255 characters',
      'any.required': 'Product name is required',
    }),
  description: Joi.string()
    .trim()
    .allow('')
    .max(5000)
    .optional()
    .messages({
      'string.max': 'Description must not exceed 5000 characters',
    }),
  category: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.min': 'Category must be at least 2 characters',
      'string.max': 'Category must not exceed 100 characters',
      'any.required': 'Category is required',
    }),
  price: Joi.number()
    .min(0)
    .required()
    .messages({
      'number.base': 'Price must be a number',
      'number.min': 'Price cannot be negative',
      'any.required': 'Price is required',
    }),
  image_url: Joi.string()
    .trim()
    .uri()
    .optional()
    .messages({
      'string.uri': 'Image URL must be a valid URL',
    }),
  image_path: Joi.string()
    .trim()
    .max(500)
    .optional()
    .messages({
      'string.max': 'Image path must not exceed 500 characters',
    }),
  stock_quantity: Joi.number()
    .integer()
    .min(0)
    .default(0)
    .messages({
      'number.base': 'Stock quantity must be a number',
      'number.integer': 'Stock quantity must be an integer',
      'number.min': 'Stock quantity cannot be negative',
    }),
});

/**
 * Validation schema for product updates
 */
const updateProductSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(255)
    .optional()
    .messages({
      'string.min': 'Product name must be at least 2 characters',
      'string.max': 'Product name must not exceed 255 characters',
    }),
  description: Joi.string()
    .trim()
    .allow('')
    .max(5000)
    .optional()
    .messages({
      'string.max': 'Description must not exceed 5000 characters',
    }),
  category: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .optional()
    .messages({
      'string.min': 'Category must be at least 2 characters',
      'string.max': 'Category must not exceed 100 characters',
    }),
  price: Joi.number()
    .min(0)
    .optional()
    .messages({
      'number.base': 'Price must be a number',
      'number.min': 'Price cannot be negative',
    }),
  image_url: Joi.string()
    .trim()
    .uri()
    .allow('')
    .optional()
    .messages({
      'string.uri': 'Image URL must be a valid URL',
    }),
  image_path: Joi.string()
    .trim()
    .max(500)
    .allow('')
    .optional()
    .messages({
      'string.max': 'Image path must not exceed 500 characters',
    }),
  stock_quantity: Joi.number()
    .integer()
    .min(0)
    .optional()
    .messages({
      'number.base': 'Stock quantity must be a number',
      'number.integer': 'Stock quantity must be an integer',
      'number.min': 'Stock quantity cannot be negative',
    }),
}).min(1).messages({
  'object.min': 'At least one product field is required for update',
});

/**
 * Validate data against a schema
 * @param {object} data - Data to validate
 * @param {Joi.Schema} schema - Joi validation schema
 * @returns {object} - { value, error }
 */
const validateData = (data, schema) => {
  const { value, error } = schema.validate(data, { abortEarly: false });
  return { value, error };
};

module.exports = {
  signupSchema,
  loginSchema,
  cartItemSchema,
  cartItemUpdateSchema,
  walletTopUpSchema,
  checkoutSchema,
  productFilterSchema,
  productImageUploadSchema,
  createProductSchema,
  updateProductSchema,
  validateData,
};
