const express = require('express');
const { register, login, verifyMobile, verifyEmail, deleteUser } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');
const { 
  sanitizeInput, 
  registerValidation, 
  loginValidation, 
  handleValidationErrors 
} = require('../middleware/validation');

const router = express.Router();

router.post('/register', 
  sanitizeInput,
  registerValidation,
  handleValidationErrors,
  register
);

router.post('/login', 
  sanitizeInput,
  loginValidation,
  handleValidationErrors,
  login
);

router.post('/verify-mobile', verifyMobile);
router.get('/verify-email', verifyEmail);
router.delete('/user', authenticateToken, deleteUser);

module.exports = router;