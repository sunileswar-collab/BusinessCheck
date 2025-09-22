import { useState } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { VideoFile } from '@mui/icons-material';
import { uploadVideo } from '../services/cloudinaryService';
import { toast } from 'react-toastify';

const VideoUploader = ({ onUpload, currentVideo, label = "Upload Video" }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentVideo);

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      toast.error('Please select a video file');
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      toast.error('Video size should be less than 50MB');
      return;
    }

    setUploading(true);
    try {
      const result = await uploadVideo(file, 'company-videos');
      setPreview(result.url);
      onUpload(result.url);
      toast.success('Video uploaded successfully');
    } catch (error) {
      toast.error('Video upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box sx={{ textAlign: 'center', p: 2, border: '1px dashed #ccc', borderRadius: 2 }}>
      {preview && (
        <video
          src={preview}
          controls
          style={{ width: '100%', maxWidth: 400, height: 200, marginBottom: 16 }}
        />
      )}
      
      <Typography variant="body2" sx={{ mb: 2 }}>
        {label}
      </Typography>
      
      <input
        accept="video/*"
        style={{ display: 'none' }}
        id="upload-video"
        type="file"
        onChange={handleFileSelect}
        disabled={uploading}
      />
      
      <label htmlFor="upload-video">
        <Button
          variant="outlined"
          component="span"
          startIcon={uploading ? <CircularProgress size={20} /> : <VideoFile />}
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Choose Video'}
        </Button>
      </label>
    </Box>
  );
};

export default VideoUploader;