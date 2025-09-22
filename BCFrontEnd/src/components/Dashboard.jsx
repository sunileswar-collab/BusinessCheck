import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  AppBar,
  Toolbar,
  Card,
  CardContent,
  Grid,
  Avatar,
  Chip,
  LinearProgress,
  IconButton,
  Menu,
  MenuItem,
  Fade,
  Skeleton
} from '@mui/material';
import {
  Business,
  Person,
  Settings,
  ExitToApp,
  Dashboard as DashboardIcon,
  Verified,
  Warning,
  Add,
  Edit,
  LocationOn,
  Language,
  CalendarToday
} from '@mui/icons-material';
import { logout } from '../store/slices/authSlice';
import { setProfile, setLoading } from '../store/slices/companySlice';
import api from '../api';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { profile, loading } = useSelector((state) => state.company);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileCompletion, setProfileCompletion] = useState(0);

  useEffect(() => {
    fetchCompanyProfile();
  }, []);

  useEffect(() => {
    if (profile) {
      calculateProfileCompletion();
    }
  }, [profile]);

  const calculateProfileCompletion = () => {
    const fields = [
      profile.company_name,
      profile.address,
      profile.city,
      profile.state,
      profile.country,
      profile.postal_code,
      profile.industry,
      profile.logo_url,
      profile.description
    ];
    const completed = fields.filter(field => field && field.trim() !== '').length;
    setProfileCompletion(Math.round((completed / fields.length) * 100));
  };

  const fetchCompanyProfile = async () => {
    dispatch(setLoading(true));
    try {
      const response = await api.get('/company/profile');
      if (response.data.success) {
        dispatch(setProfile(response.data.data));
      }
    } catch (err) {
      console.log('No company profile found');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <DashboardIcon sx={{ mr: 2 }} />
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Company Dashboard
          </Typography>
          <IconButton
            color="inherit"
            onClick={handleMenuOpen}
            sx={{ ml: 2 }}
          >
            <Avatar
              sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}
            >
              {user?.full_name?.charAt(0)?.toUpperCase()}
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={() => { navigate('/profile'); handleMenuClose(); }}>
              <Person sx={{ mr: 1 }} /> Profile
            </MenuItem>
            <MenuItem onClick={() => { navigate('/company-register'); handleMenuClose(); }}>
              <Settings sx={{ mr: 1 }} /> Settings
            </MenuItem>
            <MenuItem onClick={() => { handleLogout(); handleMenuClose(); }}>
              <ExitToApp sx={{ mr: 1 }} /> Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Fade in timeout={800}>
              <Paper sx={{ p: 4, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    sx={{ width: 64, height: 64, mr: 3, bgcolor: 'rgba(255,255,255,0.2)' }}
                  >
                    {user?.full_name?.charAt(0)?.toUpperCase()}
                  </Avatar>
                  <Box>
                    <Typography variant="h4" gutterBottom sx={{ mb: 1, fontWeight: 600 }}>
                      {getGreeting()}, {user?.full_name}!
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9 }}>
                      {new Date().toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </Typography>
                  </Box>
                </Box>
                
                {loading ? (
                  <Box sx={{ mt: 3 }}>
                    <Skeleton variant="text" width="60%" height={32} />
                    <Skeleton variant="text" width="40%" height={24} />
                  </Box>
                ) : !profile ? (
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
                      🚀 Let's get your company registered!
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
                      Complete your company registration to unlock all features and start managing your business profile.
                    </Typography>
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<Add />}
                      onClick={() => navigate('/company-register')}
                      sx={{ 
                        bgcolor: 'rgba(255,255,255,0.2)', 
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      Register Company
                    </Button>
                  </Box>
                ) : (
                  <Box sx={{ mt: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Business sx={{ mr: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {profile.company_name}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      <Chip 
                        icon={<Business />} 
                        label={profile.industry} 
                        sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
                      />
                      <Chip 
                        icon={<LocationOn />} 
                        label={`${profile.city}, ${profile.state}`} 
                        sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
                      />
                      {profile.website && (
                        <Chip 
                          icon={<Language />} 
                          label="Website" 
                          sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
                        />
                      )}
                    </Box>
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" sx={{ mb: 1, opacity: 0.9 }}>
                        Profile Completion: {profileCompletion}%
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={profileCompletion} 
                        sx={{ 
                          height: 8, 
                          borderRadius: 4,
                          bgcolor: 'rgba(255,255,255,0.2)',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: 'rgba(255,255,255,0.8)'
                          }
                        }} 
                      />
                    </Box>
                  </Box>
                )}
              </Paper>
            </Fade>
          </Grid>

          <Grid item xs={12} md={6}>
            <Fade in timeout={1000}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Verified sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Account Status
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="body1">Email Verification</Typography>
                      <Chip
                        icon={user?.is_email_verified ? <Verified /> : <Warning />}
                        label={user?.is_email_verified ? 'Verified' : 'Pending'}
                        color={user?.is_email_verified ? 'success' : 'warning'}
                        size="small"
                      />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="body1">Mobile Verification</Typography>
                      <Chip
                        icon={user?.is_mobile_verified ? <Verified /> : <Warning />}
                        label={user?.is_mobile_verified ? 'Verified' : 'Pending'}
                        color={user?.is_mobile_verified ? 'success' : 'warning'}
                        size="small"
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          </Grid>

          <Grid item xs={12} md={6}>
            <Fade in timeout={1200}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Settings sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Quick Actions
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button 
                      variant="outlined" 
                      startIcon={<Person />}
                      onClick={() => navigate('/profile')}
                      fullWidth
                      sx={{ justifyContent: 'flex-start', py: 1.5 }}
                    >
                      Edit Profile
                    </Button>
                    {profile ? (
                      <Button 
                        variant="outlined" 
                        startIcon={<Edit />}
                        onClick={() => navigate('/company-register')}
                        fullWidth
                        sx={{ justifyContent: 'flex-start', py: 1.5 }}
                      >
                        Update Company
                      </Button>
                    ) : (
                      <Button 
                        variant="contained" 
                        startIcon={<Add />}
                        onClick={() => navigate('/company-register')}
                        fullWidth
                        sx={{ py: 1.5 }}
                      >
                        Register Company
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
          {profile && (
            <Grid item xs={12}>
              <Fade in timeout={1400}>
                <Card>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      Company Overview
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={4}>
                        <Box sx={{ textAlign: 'center' }}>
                          {profile.logo_url ? (
                            <Avatar
                              src={profile.logo_url}
                              sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }}
                            />
                          ) : (
                            <Avatar
                              sx={{ width: 80, height: 80, mx: 'auto', mb: 2, bgcolor: 'primary.main' }}
                            >
                              <Business sx={{ fontSize: 40 }} />
                            </Avatar>
                          )}
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {profile.company_name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {profile.industry}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <Box sx={{ pl: { md: 3 } }}>
                          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
                            {profile.description || 'No description available.'}
                          </Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <LocationOn sx={{ mr: 1, color: 'text.secondary', fontSize: 20 }} />
                              <Typography variant="body2" color="text.secondary">
                                {profile.address}, {profile.city}
                              </Typography>
                            </Box>
                            {profile.founded_date && (
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <CalendarToday sx={{ mr: 1, color: 'text.secondary', fontSize: 20 }} />
                                <Typography variant="body2" color="text.secondary">
                                  Founded {new Date(profile.founded_date).getFullYear()}
                                </Typography>
                              </Box>
                            )}
                            {profile.website && (
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Language sx={{ mr: 1, color: 'text.secondary', fontSize: 20 }} />
                                <Typography 
                                  variant="body2" 
                                  color="primary.main"
                                  component="a"
                                  href={profile.website}
                                  target="_blank"
                                  sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                                >
                                  Visit Website
                                </Typography>
                              </Box>
                            )}
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;