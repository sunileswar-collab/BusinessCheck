import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  AppBar,
  Toolbar,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip
} from '@mui/material';
import { Person, Business, Email, Phone, LocationOn } from '@mui/icons-material';
import api from '../api';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [companyProfile, setCompanyProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCompanyProfile();
  }, []);

  const fetchCompanyProfile = async () => {
    try {
      const response = await api.get('/company/profile');
      if (response.data.success) {
        setCompanyProfile(response.data.data);
      }
    } catch (err) {
      console.log('No company profile found');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Profile
          </Typography>
          <Button color="inherit" onClick={() => navigate('/dashboard')}>
            Dashboard
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          {/* User Profile Card */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                    <Person />
                  </Avatar>
                  <Typography variant="h6">Personal Information</Typography>
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Full Name
                  </Typography>
                  <Typography variant="body1">{user?.full_name}</Typography>
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Email
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Email fontSize="small" />
                    <Typography variant="body1">{user?.email}</Typography>
                    <Chip
                      label={user?.is_email_verified ? 'Verified' : 'Not Verified'}
                      color={user?.is_email_verified ? 'success' : 'warning'}
                      size="small"
                    />
                  </Box>
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Mobile
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Phone fontSize="small" />
                    <Typography variant="body1">{user?.mobile_no}</Typography>
                    <Chip
                      label={user?.is_mobile_verified ? 'Verified' : 'Not Verified'}
                      color={user?.is_mobile_verified ? 'success' : 'warning'}
                      size="small"
                    />
                  </Box>
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Gender
                  </Typography>
                  <Typography variant="body1">
                    {user?.gender === 'm' ? 'Male' : user?.gender === 'f' ? 'Female' : 'Other'}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Company Profile Card */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ mr: 2, bgcolor: 'secondary.main' }}>
                    <Business />
                  </Avatar>
                  <Typography variant="h6">Company Information</Typography>
                </Box>
                
                {loading ? (
                  <Typography>Loading company profile...</Typography>
                ) : companyProfile ? (
                  <>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Company Name
                      </Typography>
                      <Typography variant="body1">{companyProfile.company_name}</Typography>
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Industry
                      </Typography>
                      <Typography variant="body1">{companyProfile.industry}</Typography>
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Location
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationOn fontSize="small" />
                        <Typography variant="body1">
                          {companyProfile.city}, {companyProfile.state}, {companyProfile.country}
                        </Typography>
                      </Box>
                    </Box>
                    
                    {companyProfile.website && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Website
                        </Typography>
                        <Typography variant="body1">
                          <a href={companyProfile.website} target="_blank" rel="noopener noreferrer">
                            {companyProfile.website}
                          </a>
                        </Typography>
                      </Box>
                    )}
                    
                    <Button
                      variant="outlined"
                      onClick={() => navigate('/company-register')}
                      sx={{ mt: 2 }}
                    >
                      Edit Company Profile
                    </Button>
                  </>
                ) : (
                  <Box>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      No company profile found.
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={() => navigate('/company-register')}
                    >
                      Create Company Profile
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Profile;