const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { generateToken } = require('../utils/jwt');
const admin = require('../config/firebase');

const register = async (req, res) => {
  try {
    console.log('Registration request received:', req.body);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password, full_name, gender, mobile_no } = req.body;
    
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      console.log('User already exists:', email);
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    console.log('Creating new user...');
    const user = await User.create({
      email, password, full_name, gender, mobile_no, signup_type: 'e'
    });
    console.log('User created successfully:', user.id);

    const token = generateToken({ userId: user.id, email: user.email });

    res.status(201).json({
      success: true,
      message: 'User registered successfully. Please verify mobile OTP.',
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          full_name: user.full_name,
          gender: user.gender,
          mobile_no: user.mobile_no,
          is_mobile_verified: user.is_mobile_verified,
          is_email_verified: user.is_email_verified
        }
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    if (error.code === '23505') {
      if (error.constraint === 'users_email_key') {
        return res.status(400).json({
          success: false,
          message: 'User with this email already exists'
        });
      }
      if (error.constraint === 'users_mobile_no_key') {
        return res.status(400).json({
          success: false,
          message: 'User with this mobile number already exists'
        });
      }
    }
    
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({
        success: false,
        message: 'Database connection failed. Please check if PostgreSQL is running.'
      });
    }
    
    res.status(500).json({
      success: false,
      message: `Registration failed: ${error.message}`
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const isValidPassword = await User.validatePassword(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const token = generateToken({ userId: user.id, email: user.email });
    
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          full_name: user.full_name,
          is_mobile_verified: user.is_mobile_verified,
          is_email_verified: user.is_email_verified
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const verifyMobile = async (req, res) => {
  try {
    const { user_id, otp } = req.body;
    
    // In real implementation, verify OTP with Firebase
    // For now, just mark as verified
    await User.updateMobileVerification(user_id, true);
    
    res.json({
      success: true,
      message: 'Mobile verified successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { user_id } = req.query;
    
    await User.updateEmailVerification(user_id, true);
    
    res.json({
      success: true,
      message: 'Email verified successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    
    // Delete user's company first if exists
    const Company = require('../models/Company');
    const company = await Company.findByOwnerId(userId);
    if (company) {
      await Company.delete(company.id);
    }
    
    // Delete user
    await User.delete(userId);
    
    res.json({
      success: true,
      message: 'User account deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  register,
  login,
  verifyMobile,
  verifyEmail,
  deleteUser
};