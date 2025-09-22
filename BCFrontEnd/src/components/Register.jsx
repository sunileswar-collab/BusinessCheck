import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import { toast } from 'react-toastify';
import api from '../api';
import 'react-phone-input-2/lib/style.css';

const steps = ['Personal Info', 'Contact Details', 'Verification'];

const Register = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const onSubmitPersonal = async (data) => {
    console.log('Registration attempt with data:', { ...data, mobile_no: `+${phone}` });
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/register', {
        ...data,
        mobile_no: `+${phone}`
      });
      
      console.log('Registration response:', response.data);
      
      if (response.data.success) {
        setUserId(response.data.data.user.id);
        // Store token for immediate login
        localStorage.setItem('token', response.data.data.token);
        toast.success('Registration successful! Please verify your mobile number.');
        handleNext();
      } else {
        const errorMessage = response.data.message || 'Registration failed';
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } catch (err) {
      console.error('Registration error:', err);
      const errorMessage = err.response?.data?.message || 'Registration failed';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const onVerifyOTP = async () => {
    setLoading(true);
    try {
      // For demo purposes, accept any 4-digit OTP
      if (otp.length === 4) {
        const response = await api.post('/auth/verify-mobile', {
          user_id: userId,
          otp: otp
        });
        
        if (response.data.success) {
          toast.success('Mobile verified successfully! Redirecting to dashboard...');
          // Redirect to dashboard instead of login since user is already registered
          navigate('/dashboard');
        }
      } else {
        setError('Please enter a 4-digit OTP');
        toast.error('Please enter a 4-digit OTP');
      }
    } catch (err) {
      console.error('OTP verification error:', err);
      const errorMessage = err.response?.data?.message || 'OTP verification failed';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <form onSubmit={handleSubmit(onSubmitPersonal)}>
            <TextField
              fullWidth
              label="Full Name"
              margin="normal"
              {...register('full_name', { required: 'Full name is required' })}
              error={!!errors.full_name}
              helperText={errors.full_name?.message}
            />
            
            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            
            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' }
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            
            <FormControl component="fieldset" margin="normal">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup row>
                <FormControlLabel
                  value="m"
                  control={<Radio {...register('gender', { required: 'Gender is required' })} />}
                  label="Male"
                />
                <FormControlLabel
                  value="f"
                  control={<Radio {...register('gender', { required: 'Gender is required' })} />}
                  label="Female"
                />
                <FormControlLabel
                  value="o"
                  control={<Radio {...register('gender', { required: 'Gender is required' })} />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
            
            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant="body2" gutterBottom>Mobile Number</Typography>
              <PhoneInput
                country={'in'}
                value={phone}
                onChange={setPhone}
                inputStyle={{ width: '100%' }}
              />
            </Box>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
              disabled={loading || !phone}
            >
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </form>
        );
      
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              OTP Verification
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Please enter the OTP sent to +{phone}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
              For demo: Enter any 4-digit number (e.g., 1234)
            </Typography>
            
            <TextField
              fullWidth
              label="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              margin="normal"
            />
            
            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              <Button onClick={handleBack} sx={{ flex: 1 }}>
                Back
              </Button>
              <Button
                variant="contained"
                onClick={onVerifyOTP}
                disabled={loading || !otp}
                sx={{ flex: 1 }}
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </Button>
            </Box>
          </Box>
        );
      
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Register
          </Typography>
          
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          
          {renderStepContent()}
          
          <Box textAlign="center" sx={{ mt: 2 }}>
            <Link to="/login">
              Already have an account? Login here
            </Link>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;