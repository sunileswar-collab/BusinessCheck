import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Grid,
  MenuItem
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { toast } from 'react-toastify';
import ImageUploader from './ImageUploader';
import api from '../api';

const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'Manufacturing',
  'Retail',
  'Real Estate',
  'Other'
];

const CompanyRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [foundedDate, setFoundedDate] = useState(null);
  const [logoUrl, setLogoUrl] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [companyVideo, setCompanyVideo] = useState('');
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');

    try {
      const companyData = {
        ...data,
        founded_date: foundedDate ? foundedDate.toISOString().split('T')[0] : null,
        logo_url: logoUrl,
        banner_url: bannerUrl,
        video_url: companyVideo
      };

      const response = await api.post('/company/register', companyData);
      
      if (response.data.success) {
        toast.success('Company registered successfully!');
        navigate('/dashboard');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Company registration failed';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Company Registration
          </Typography>
          
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Company Name"
                  {...register('company_name', { required: 'Company name is required' })}
                  error={!!errors.company_name}
                  helperText={errors.company_name?.message}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  multiline
                  rows={3}
                  {...register('address', { required: 'Address is required' })}
                  error={!!errors.address}
                  helperText={errors.address?.message}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="City"
                  {...register('city', { required: 'City is required' })}
                  error={!!errors.city}
                  helperText={errors.city?.message}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="State"
                  {...register('state', { required: 'State is required' })}
                  error={!!errors.state}
                  helperText={errors.state?.message}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Country"
                  {...register('country', { required: 'Country is required' })}
                  error={!!errors.country}
                  helperText={errors.country?.message}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Postal Code"
                  {...register('postal_code', { required: 'Postal code is required' })}
                  error={!!errors.postal_code}
                  helperText={errors.postal_code?.message}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Industry"
                  defaultValue=""
                  {...register('industry', { required: 'Industry is required' })}
                  error={!!errors.industry}
                  helperText={errors.industry?.message}
                >
                  <MenuItem value="">Select Industry</MenuItem>
                  {industries.map((industry) => (
                    <MenuItem key={industry} value={industry}>
                      {industry}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Website (Optional)"
                  {...register('website')}
                  error={!!errors.website}
                  helperText={errors.website?.message}
                />
              </Grid>
              
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Founded Date (Optional)"
                    value={foundedDate}
                    onChange={setFoundedDate}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description (Optional)"
                  multiline
                  rows={4}
                  {...register('description')}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <ImageUploader
                  onUpload={setLogoUrl}
                  currentImage={logoUrl}
                  label="Company Logo"
                  type="logo"
                  mediaType="image"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <ImageUploader
                  onUpload={setBannerUrl}
                  currentImage={bannerUrl}
                  label="Company Banner"
                  type="banner"
                  mediaType="image"
                />
              </Grid>
              
              <Grid item xs={12}>
                <ImageUploader
                  onUpload={(url) => setCompanyVideo(url)}
                  currentImage={companyVideo}
                  label="Company Video (Optional)"
                  type="video"
                  mediaType="video"
                />
              </Grid>
            </Grid>
            
            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/dashboard')}
                sx={{ flex: 1 }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{ flex: 1 }}
              >
                {loading ? 'Registering...' : 'Register Company'}
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default CompanyRegister;