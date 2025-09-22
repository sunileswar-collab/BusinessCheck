const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { 
  sanitizeInput, 
  companyValidation, 
  handleValidationErrors 
} = require('../middleware/validation');
const { 
  registerCompany, 
  getProfile, 
  updateProfile, 
  uploadMedia,
  uploadFile,
  deleteCompany,
  deleteMedia,
  upload
} = require('../controllers/companyController');

const router = express.Router();

router.post('/register', 
  authenticateToken,
  sanitizeInput,
  companyValidation,
  handleValidationErrors,
  registerCompany
);

router.get('/profile', authenticateToken, getProfile);

router.put('/profile', 
  authenticateToken,
  sanitizeInput,
  companyValidation,
  handleValidationErrors,
  updateProfile
);

router.post('/upload-media', authenticateToken, uploadMedia);
router.post('/upload-file', authenticateToken, upload.single('file'), uploadFile);
router.delete('/profile', authenticateToken, deleteCompany);
router.delete('/media', authenticateToken, deleteMedia);

module.exports = router;