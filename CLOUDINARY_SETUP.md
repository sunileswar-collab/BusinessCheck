# 📸 Cloudinary Setup Guide

## ✅ **Features Implemented**

### **Backend Support**
- ✅ Unified `/api/company/upload-media` endpoint
- ✅ Support for images (logo, banner) and videos
- ✅ Automatic transformations based on media type
- ✅ File validation and error handling

### **Frontend Support**
- ✅ Enhanced ImageUploader component for images and videos
- ✅ Dedicated VideoUploader component
- ✅ File type and size validation
- ✅ Upload progress indicators

### **Database Schema**
- ✅ Added `video_url` column to `company_profile` table
- ✅ Support for storing logo, banner, and video URLs

## 🔧 **Configuration Required**

### **1. Cloudinary Account Setup**
1. Sign up at https://cloudinary.com
2. Get your credentials from Dashboard:
   - Cloud Name
   - API Key
   - API Secret

### **2. Backend Environment (.env)**
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### **3. Frontend Environment (.env)**
```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

### **4. Create Upload Preset**
1. Go to Cloudinary Dashboard → Settings → Upload
2. Create new upload preset:
   - Name: `company_uploads`
   - Signing Mode: `Unsigned`
   - Folder: `company-assets`

## 📋 **API Endpoints**

### **Upload Media**
```http
POST /api/company/upload-media
Authorization: Bearer {token}
Content-Type: application/json

{
  "file": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD...",
  "type": "logo" // "logo", "banner", or "video"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Logo uploaded successfully",
  "data": {
    "url": "https://res.cloudinary.com/...",
    "public_id": "company_logos/abc123",
    "resource_type": "image",
    "format": "jpg",
    "bytes": 45678
  }
}
```

## 🎯 **Media Types Supported**

### **Images**
- **Logo**: 300x300px, optimized for profile display
- **Banner**: 1200x400px, optimized for header display
- **Formats**: JPG, PNG, GIF, WebP
- **Max Size**: 5MB

### **Videos**
- **Company Video**: 1280x720px, quality auto
- **Formats**: MP4, MOV, AVI, WebM
- **Max Size**: 50MB

## 🧪 **Testing with Postman**

### **1. Upload Logo**
```json
{
  "file": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD...",
  "type": "logo"
}
```

### **2. Upload Banner**
```json
{
  "file": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD...",
  "type": "banner"
}
```

### **3. Upload Video**
```json
{
  "file": "data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28y...",
  "type": "video"
}
```

## 🔄 **Frontend Usage**

### **Image Upload**
```jsx
<ImageUploader
  onUpload={setLogoUrl}
  currentImage={logoUrl}
  label="Company Logo"
  type="logo"
  mediaType="image"
/>
```

### **Video Upload**
```jsx
<ImageUploader
  onUpload={setVideoUrl}
  currentImage={videoUrl}
  label="Company Video"
  type="video"
  mediaType="video"
/>
```

### **Mixed Media Upload**
```jsx
<ImageUploader
  onUpload={setMediaUrl}
  currentImage={mediaUrl}
  label="Upload Image or Video"
  type="media"
  mediaType="both"
/>
```

## 📊 **File Validation**

### **Client-Side**
- File type validation (image/* or video/*)
- File size limits (5MB images, 50MB videos)
- Real-time error feedback

### **Server-Side**
- Cloudinary automatic validation
- Resource type detection
- Format optimization

## 🚀 **Demo Ready**

### **Postman Collection Updated**
- ✅ Upload Logo endpoint
- ✅ Upload Banner endpoint  
- ✅ Upload Video endpoint
- ✅ Sample base64 data included

### **Frontend Components**
- ✅ Enhanced ImageUploader with video support
- ✅ Dedicated VideoUploader component
- ✅ Company registration form with media uploads

### **Database Schema**
- ✅ Updated with video_url column
- ✅ Migration ready for existing databases

**Status: CLOUDINARY FULLY INTEGRATED** 🎉