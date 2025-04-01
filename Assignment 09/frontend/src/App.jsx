import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme, Snackbar, Alert } from '@mui/material';
import NavBar from './components/NavBar.jsx';
import AppRoutes from './routes/AppRoutes.jsx';

// Custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#eda45f',
    },
    secondary: {
      main: '#333333',
    },
    background: {
      default: 'rgb(238, 237, 235)',
    },
  },
  typography: {
    fontFamily: [
      'Poppins',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
  },
});

const App = () => {
  // State management
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    // Check if user is already logged in from localStorage
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedUser = localStorage.getItem('user');
    
    if (storedAuth === 'true' && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
    
    setIsLoading(false);
  }, []);

  // This callback is passed to the NavBar component for logout
  const handleLogout = () => {
    console.log('Logout function called');
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    
    // Show success notification
    setNotification({
      open: true,
      message: 'You have been successfully logged out',
      severity: 'success'
    });
    
    // Navigation is handled in the NavBar component
  };
  
  // This callback is passed to the Login component for login
  const handleLoginSuccess = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    
    // Show success notification
    setNotification({
      open: true,
      message: 'Login successful!',
      severity: 'success'
    });
  };
  
  // Handle closing the notification
  const handleCloseNotification = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotification({
      ...notification,
      open: false
    });
  };

  if (isLoading) {
    return <div>Loading...</div>; // Or a nice loading spinner
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavBar 
          isAuthenticated={isAuthenticated} 
          user={user} 
          onLogout={handleLogout} 
        />
        <AppRoutes 
          isAuthenticated={isAuthenticated} 
          user={user} 
          onLoginSuccess={handleLoginSuccess} 
        />
        
        {/* Notification for login/logout success */}
        <Snackbar
          open={notification.open}
          autoHideDuration={4000}
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={handleCloseNotification} 
            severity={notification.severity} 
            variant="filled"
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </Router>
    </ThemeProvider>
  );
};

export default App;