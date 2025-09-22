const cloudinary = require('../config/cloudinary');

class CloudinaryService {
  static async uploadImage(imageBuffer, options = {}) {
    try {
      const result = await cloudinary.uploader.upload(imageBuffer, {
        resource_type: 'image',
        ...options
      });
      return {
        url: result.secure_url,
        public_id: result.public_id
      };
    } catch (error) {
      throw new Error('Image upload failed');
    }
  }

  static async uploadLogo(imageBuffer) {
    return this.uploadImage(imageBuffer, {
      folder: 'company_logos',
      transformation: [
        { width: 300, height: 300, crop: 'fill' }
      ]
    });
  }

  static async uploadBanner(imageBuffer) {
    return this.uploadImage(imageBuffer, {
      folder: 'company_banners',
      transformation: [
        { width: 1200, height: 400, crop: 'fill' }
      ]
    });
  }

  static async deleteImage(publicId) {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      return result;
    } catch (error) {
      throw new Error('Image deletion failed');
    }
  }
}

module.exports = CloudinaryService;