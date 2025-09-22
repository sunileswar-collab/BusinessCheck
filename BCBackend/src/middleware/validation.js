const { body, validationResult } = require('express-validator');
const sanitizeHtml = require('sanitize-html');
const { parsePhoneNumber } = require('libphonenumber-js');

// Sanitization middleware
const sanitizeInput = (req, res, next) => {
  for (const key in req.body) {
    if (typeof req.body[key] === 'string') {
      req.body[key] = sanitizeHtml(req.body[key], {
        allowedTags: [],
        allowedAttributes: {}
      });
    }
  }
  next();
};

// Validation rules
const registerValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('full_name')
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage('Full name must be 2-255 characters'),
  body('gender')
    .isIn(['m', 'f', 'o'])
    .withMessage('Gender must be m, f, or o'),
  body('mobile_no')
    .isLength({ min: 10 })
    .withMessage('Mobile number must be at least 10 digits')
];

const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

const companyValidation = [
  body('company_name')
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage('Company name must be 2-255 characters'),
  body('address')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Address is required'),
  body('city')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('City must be 2-50 characters'),
  body('state')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('State must be 2-50 characters'),
  body('country')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Country must be 2-50 characters'),
  body('postal_code')
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage('Postal code must be 3-20 characters'),
  body('industry')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Industry is required'),
  body('website')
    .optional({ nullable: true, checkFalsy: true })
    .isURL()
    .withMessage('Valid website URL required'),
  body('founded_date')
    .optional({ nullable: true, checkFalsy: true })
    .isISO8601()
    .withMessage('Valid date required')
];

// Validation result handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

module.exports = {
  sanitizeInput,
  registerValidation,
  loginValidation,
  companyValidation,
  handleValidationErrors
};