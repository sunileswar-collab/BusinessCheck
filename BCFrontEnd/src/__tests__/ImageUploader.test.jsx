import { render, screen, fireEvent } from '@testing-library/react';
import ImageUploader from '../components/ImageUploader';

// Mock toast
jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn()
  }
}));

// Mock cloudinary service
jest.mock('../services/cloudinaryService', () => ({
  uploadImage: jest.fn()
}));

describe('ImageUploader Component', () => {
  const mockOnUpload = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders upload button and label', () => {
    render(
      <ImageUploader 
        onUpload={mockOnUpload}
        label="Upload Logo"
        type="logo"
      />
    );
    
    expect(screen.getByText('Upload Logo')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /choose file/i })).toBeInTheDocument();
  });

  test('shows preview when current image is provided', () => {
    render(
      <ImageUploader 
        onUpload={mockOnUpload}
        currentImage="https://example.com/image.jpg"
        label="Upload Logo"
        type="logo"
      />
    );
    
    const avatar = screen.getByRole('img');
    expect(avatar).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  test('validates file type', () => {
    const { toast } = require('react-toastify');
    
    render(
      <ImageUploader 
        onUpload={mockOnUpload}
        label="Upload Logo"
        type="logo"
      />
    );
    
    const fileInput = screen.getByRole('button').previousSibling;
    const file = new File(['test'], 'test.txt', { type: 'text/plain' });
    
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    expect(toast.error).toHaveBeenCalledWith('Please select an image file');
  });

  test('validates file size', () => {
    const { toast } = require('react-toastify');
    
    render(
      <ImageUploader 
        onUpload={mockOnUpload}
        label="Upload Logo"
        type="logo"
      />
    );
    
    const fileInput = screen.getByRole('button').previousSibling;
    const largeFile = new File(['x'.repeat(6 * 1024 * 1024)], 'large.jpg', { type: 'image/jpeg' });
    
    fireEvent.change(fileInput, { target: { files: [largeFile] } });
    
    expect(toast.error).toHaveBeenCalledWith('Image size should be less than 5MB');
  });
});