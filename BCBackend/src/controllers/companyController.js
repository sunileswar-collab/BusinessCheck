const Company = require('../models/Company');
const cloudinary = require('../config/cloudinary');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

const registerCompany = async (req, res) => {
  try {
    console.log('Company registration request:', req.body);
    console.log('User ID:', req.user.userId);
    
    const companyData = {
      ...req.body,
      owner_id: req.user.userId
    };
    
    console.log('Company data to create:', companyData);

    const existingCompany = await Company.findByOwnerId(req.user.userId);
    if (existingCompany) {
      return res.status(400).json({
        success: false,
        message: 'Company already registered for this user'
      });
    }

    const company = await Company.create(companyData);
    
    res.status(201).json({
      success: true,
      message: 'Company registered successfully',
      data: company
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const company = await Company.findByOwnerId(req.user.userId);
    
    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company profile not found'
      });
    }

    res.json({
      success: true,
      data: company
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const company = await Company.findByOwnerId(req.user.userId);
    
    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company profile not found'
      });
    }

    const updatedCompany = await Company.update(company.id, req.body);
    
    res.json({
      success: true,
      message: 'Company profile updated successfully',
      data: updatedCompany
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const uploadMedia = async (req, res) => {
  try {
    const { file, type } = req.body;
    
    if (!file) {
      return res.status(400).json({
        success: false,
        message: 'Missing required parameter - file'
      });
    }

    if (!type) {
      return res.status(400).json({
        success: false,
        message: 'Missing required parameter - type'
      });
    }
    
    let uploadOptions = {
      folder: `company_${type}s`,
      resource_type: 'auto'
    };

    if (type === 'logo') {
      uploadOptions.transformation = [{ width: 300, height: 300, crop: 'fill' }];
    } else if (type === 'banner') {
      uploadOptions.transformation = [{ width: 1200, height: 400, crop: 'fill' }];
    } else if (type === 'video') {
      uploadOptions.resource_type = 'video';
      uploadOptions.transformation = [{ width: 1280, height: 720, crop: 'limit', quality: 'auto' }];
    }

    const result = await cloudinary.uploader.upload(file, uploadOptions);

    res.json({
      success: true,
      message: `${type.charAt(0).toUpperCase() + type.slice(1)} uploaded successfully`,
      data: { 
        url: result.secure_url,
        public_id: result.public_id,
        resource_type: result.resource_type,
        format: result.format,
        bytes: result.bytes
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const { type } = req.body;
    if (!type) {
      return res.status(400).json({
        success: false,
        message: 'Missing type parameter'
      });
    }

    const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    
    let uploadOptions = {
      folder: `company_${type}s`,
      resource_type: 'auto'
    };

    if (type === 'logo') {
      uploadOptions.transformation = [{ width: 300, height: 300, crop: 'fill' }];
    } else if (type === 'banner') {
      uploadOptions.transformation = [{ width: 1200, height: 400, crop: 'fill' }];
    }

    const result = await cloudinary.uploader.upload(base64, uploadOptions);

    res.json({
      success: true,
      message: `${type} uploaded successfully`,
      data: { 
        url: result.secure_url,
        public_id: result.public_id
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByOwnerId(req.user.userId);
    
    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company profile not found'
      });
    }

    await Company.delete(company.id);
    
    res.json({
      success: true,
      message: 'Company profile deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const deleteMedia = async (req, res) => {
  try {
    const { public_id } = req.body;
    
    if (!public_id) {
      return res.status(400).json({
        success: false,
        message: 'Missing public_id parameter'
      });
    }

    await cloudinary.uploader.destroy(public_id);
    
    res.json({
      success: true,
      message: 'Media deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  registerCompany,
  getProfile,
  updateProfile,
  uploadMedia,
  uploadFile,
  deleteCompany,
  deleteMedia,
  upload
};