import { useState } from 'react';
import { Box, Button, Typography, Avatar, CircularProgress } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { uploadMedia } from '../services/cloudinaryService';
import { toast } from 'react-toastify';

const ImageUploader = ({ onUpload, currentImage, label = "Upload Media", type = "logo", mediaType = "image" }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage);

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    
    if (mediaType === 'image' && !isImage) {
      toast.error('Please select an image file');
      return;
    }
    
    if (mediaType === 'video' && !isVideo) {
      toast.error('Please select a video file');
      return;
    }
    
    if (mediaType === 'both' && !isImage && !isVideo) {
      toast.error('Please select an image or video file');
      return;
    }

    // File size validation
    const maxSize = isVideo ? 50 * 1024 * 1024 : 5 * 1024 * 1024; // 50MB for video, 5MB for image
    if (file.size > maxSize) {
      toast.error(`File size should be less than ${isVideo ? '50MB' : '5MB'}`);
      return;
    }

    setUploading(true);
    try {
      const fileType = isVideo ? 'video' : 'image';
      const result = await uploadMedia(file, fileType, `company-${type}`);
      setPreview(result.url);
      onUpload(result.url);
      toast.success(`${fileType} uploaded successfully`);
    } catch (error) {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box sx={{ textAlign: 'center', p: 2, border: '1px dashed #ccc', borderRadius: 2 }}>
      {preview && (
        <Avatar
          src={preview}
          sx={{ 
            width: type === 'banner' ? 200 : 100, 
            height: type === 'banner' ? 100 : 100, 
            mx: 'auto', 
            mb: 2 
          }}
          variant={type === 'banner' ? 'rounded' : 'circular'}
        />
      )}
      
      <Typography variant="body2" sx={{ mb: 2 }}>
        {label}
      </Typography>
      
      <input
        accept={mediaType === 'image' ? 'image/*' : mediaType === 'video' ? 'video/*' : 'image/*,video/*'}
        style={{ display: 'none' }}
        id={`upload-${type}`}
        type="file"
        onChange={handleFileSelect}
        disabled={uploading}
      />
      
      <label htmlFor={`upload-${type}`}>
        <Button
          variant="outlined"
          component="span"
          startIcon={uploading ? <CircularProgress size={20} /> : <CloudUpload />}
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Choose File'}
        </Button>
      </label>
    </Box>
  );
};

export default ImageUploader;