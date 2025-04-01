import React, { useState } from 'react';
import { 
  Container, 
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
import axios from 'axios';

const Login = ({ onLoginSuccess }) => {
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Validation state
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  
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
    
    // Reset errors
    setLoginError('');
    
    // Validate inputs
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    try {
      setLoading(true);
      
      // Make API call to backend
      const response = await axios.post('http://localhost:3000/login', { 
        email, 
        password 
      });
      
      console.log('Login response:', response.data);
      
      // Check if login was successful
      if (response.data.message === 'Login successful.') {
        const userData = response.data.user;
        
        // Set success state
        setLoginSuccess(true);
        
        // Save user info to local storage
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('isAuthenticated', 'true');
        
        // Call the callback to update auth state in parent component
        if (onLoginSuccess) {
          onLoginSuccess(userData);
        }
        
        // Redirect to home page after a short delay
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        // Handle unexpected success response
        setLoginError('Authentication failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      
      // Handle different error scenarios
      if (error.response) {
        // Server responded with an error
        if (error.response.status === 401) {
          setLoginError('Invalid email or password. Please try again.');
        } else {
          setLoginError(error.response.data?.error || 'Authentication failed. Please try again.');
        }
      } else if (error.request) {
        // Request was made but no response received
        setLoginError('No response from server. Please check your connection and try again.');
      } else {
        // Error setting up the request
        setLoginError('An error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          backgroundColor: 'rgb(238, 237, 235)',
          borderRadius: 2,
          border: '1px solid rgba(0, 0, 0, 0.08)'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: '#eda45f' }}>
          <LockOutlined />
        </Avatar>
        
        <Typography component="h1" variant="h5" sx={{ mb: 3, color: '#333', fontWeight: 'bold' }}>
          Sign In
        </Typography>
        
        {loginSuccess && (
          <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
            Login successful! Redirecting to home page...
          </Alert>
        )}
        
        {loginError && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {loginError}
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
              Use your registered email and password to sign in
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
              mt: 3, 
              mb: 2, 
              py: 1.5,
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
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <MuiLink component={Link} to="#" sx={{ color: '#eda45f', fontWeight: 500 }}>
                  Sign Up
                </MuiLink>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;