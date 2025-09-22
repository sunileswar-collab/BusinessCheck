export const uploadMedia = async (file, type = 'image', folder = 'company-assets') => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
  formData.append('folder', folder);
  
  // Set resource type for videos
  if (type === 'video') {
    formData.append('resource_type', 'video');
  }

  try {
    const endpoint = type === 'video' ? 'video/upload' : 'image/upload';
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/${endpoint}`,
      {
        method: 'POST',
        body: formData
      }
    );
    
    const data = await response.json();
    return {
      url: data.secure_url,
      public_id: data.public_id,
      resource_type: data.resource_type,
      format: data.format,
      bytes: data.bytes
    };
  } catch (error) {
    throw new Error(`${type} upload failed`);
  }
};

// Backward compatibility
export const uploadImage = (file, folder) => uploadMedia(file, 'image', folder);
export const uploadVideo = (file, folder) => uploadMedia(file, 'video', folder);