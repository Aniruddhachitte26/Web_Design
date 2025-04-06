// frontend/src/components/Login.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Typography, 
  TextField, 
  Button, 
  Box, 
  Paper, 
  Grid,
  Link as MuiLink,
  InputAdornment,
  IconButton,
  Alert,
  Avatar,
  CircularProgress,
  FormHelperText
} from '@mui/material';
import { Visibility, VisibilityOff, LockOutlined, Email } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../redux/actions/authActions';

const Login = () => {
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Validation state
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const dispatch = useDispatch();
  const { loading, error, isAuthenticated, user } = useSelector(state => state.auth);
  const navigate = useNavigate();

  // Toggle password visibility
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Validate email format
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
      return false;
    } else if (!re.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  // Validate password
  const validatePassword = (password) => {
    if (!password) {
      setPasswordError('Password is required');
      return false;
    } else if (password.length < 8) {
      setPasswordError('Password should be at least 8 characters long');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  // Handle input changes
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (emailError) validateEmail(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (passwordError) validatePassword(value);
  };

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Validate inputs
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    try {
      await dispatch(login({ email, password }));
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  // Redirect based on user type after successful login
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.type === 'admin') {
        navigate('/admin/employees');
      } else {
        navigate('/jobs');
      }
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <Box sx={{ 
      width: '100vw', 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center',
      background: 'linear-gradient(45deg, #f8f7f5 0%, #ffffff 100%)',
      position: 'fixed',
      top: 0,
      left: 0,
      padding: 0,
      margin: 0,
      overflow: 'hidden'
    }}>
      <Box sx={{ 
        width: '100%', 
        maxWidth: '500px', // Increased width here
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        px: 3
      }}>
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            color: '#eda45f', 
            fontWeight: 'bold',
            mb: 3,
            textAlign: 'center'
          }}
        >
          Job Portal
        </Typography>
        
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            borderRadius: 3,
            width: '100%',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Avatar sx={{ 
            m: 1, 
            bgcolor: '#eda45f', 
            width: 70, // Bigger avatar
            height: 70, // Bigger avatar
            boxShadow: '0 4px 8px rgba(237, 164, 95, 0.3)'
          }}>
            <LockOutlined sx={{ fontSize: 40 }} /> {/* Bigger icon */}
          </Avatar>
          
          <Typography component="h2" variant="h5" sx={{ mb: 3, color: '#333', fontWeight: 'bold' }}>
            Sign In
          </Typography>
          
          {isAuthenticated && (
            <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
              Login successful! Redirecting...
            </Alert>
          )}
          
          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <Box component="form" onSubmit={handleLogin} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={handleEmailChange}
              onBlur={() => validateEmail(email)}
              error={!!emailError}
              helperText={emailError}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: emailError ? 'error.main' : '#888' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  padding: '4px 12px', // More padding
                  '&.Mui-focused fieldset': {
                    borderColor: emailError ? 'error.main' : '#eda45f',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: emailError ? 'error.main' : '#eda45f',
                },
              }}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handlePasswordChange}
              onBlur={() => validatePassword(password)}
              error={!!passwordError}
              helperText={passwordError}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined sx={{ color: passwordError ? 'error.main' : '#888' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  padding: '4px 12px', // More padding
                  '&.Mui-focused fieldset': {
                    borderColor: passwordError ? 'error.main' : '#eda45f',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: passwordError ? 'error.main' : '#eda45f',
                },
              }}
            />
            
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <FormHelperText>
                Use your registered email and password
              </FormHelperText>
              <MuiLink component={Link} to="#" variant="body2" sx={{ color: '#eda45f', fontWeight: 500 }}>
                Forgot password?
              </MuiLink>
            </Box>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ 
                mt: 4, // More space before button
                mb: 2, 
                py: 1.5,
                borderRadius: 2,
                fontSize: '1rem', // Larger font
                backgroundColor: '#eda45f',
                '&:hover': {
                  backgroundColor: '#d69149',
                },
                '&:disabled': {
                  backgroundColor: '#f0b983',
                }
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
            </Button>
            
            <Grid container>
              <Grid item>
                <Typography variant="body2" color="text.secondary" align="center" sx={{ width: '100%' }}>
                  Don't have an account?{' '}
                  <MuiLink component={Link} to="#" sx={{ color: '#eda45f', fontWeight: 500 }}>
                    Sign Up
                  </MuiLink>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Paper>
        
        <Typography variant="body2" color="text.secondary" sx={{ mt: 3, textAlign: 'center' }}>
          © {new Date().getFullYear()} Job Portal. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;