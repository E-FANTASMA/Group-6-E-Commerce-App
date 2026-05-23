const User = require('../models/User');
const { hashPassword, comparePassword, generateToken } = require('../utils/authUtils');
const { validateData, signupSchema, loginSchema } = require('../utils/validation');

/**
 * User signup controller
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const signup = async (req, res) => {
  try {
    // 1) Validate incoming payload against the Joi schema (required fields, formats, etc.)
    //    This helps us fail fast before doing any DB work.
    const { value, error } = validateData(req.body, signupSchema);

    if (error) {
      // Joi can return multiple validation errors; map them into a clean array for the client.
      const messages = error.details.map((detail) => detail.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: messages,
      });
    }

    // Use the validated/coerced values (not raw req.body).
    const { fullName, email, password, phoneNumber } = value;

    // 2) Check if the email is already in use to prevent duplicate accounts.
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered. Please login or use a different email.',
      });
    }

    // 3) Hash the password before saving. We never store raw/plaintext passwords.
    const hashedPassword = await hashPassword(password);

    // 4) Create the user record in the database.
    //    Note: field names here match the DB schema (snake_case).
    const result = await User.create({
      full_name: fullName,
      email: email.toLowerCase(),
      password_hash: hashedPassword,
      phone_number: phoneNumber || null,
      role: 'user',
      created_at: new Date(),
      updated_at: new Date(),
    });

    if (!result.success) {
      // If the model layer reports a failure, return a server error to the client.
      return res.status(500).json({
        success: false,
        message: 'Failed to create user',
        error: result.error,
      });
    }

    // 5) Generate a JWT so the user can be immediately authenticated after signup.
    //    Keep the token payload minimal (only what the app needs).
    const token = generateToken(
      {
        id: result.data.id,
        email: result.data.email,
        fullName: result.data.full_name,
        role: result.data.role,
      },
      '7d'
    );

    // 6) Return a safe response (do not include password hashes or sensitive fields).
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        id: result.data.id,
        fullName: result.data.full_name,
        email: result.data.email,
        phoneNumber: result.data.phone_number,
        role: result.data.role,
        token,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during signup',
      error: error.message,
    });
  }
};

/**
 * User login controller
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const login = async (req, res) => {
  try {
    // Validate input
    const { value, error } = validateData(req.body, loginSchema);

    if (error) {
      const messages = error.details.map((detail) => detail.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: messages,
      });
    }

    const { email, password } = value;

    // Find user by email
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Compare passwords
    const isPasswordValid = await comparePassword(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Generate JWT token
    const token = generateToken(
      {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        role: user.role,
      },
      '7d'
    );

    // Return success response
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        phoneNumber: user.phone_number,
        role: user.role,
        token,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: error.message,
    });
  }
};

module.exports = {
  signup,
  login,
};
