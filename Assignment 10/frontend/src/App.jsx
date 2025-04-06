// frontend/src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CssBaseline, ThemeProvider, createTheme, Box } from '@mui/material';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';
import AppRoutes from './routes/AppRoutes.jsx';
import { checkUserSession } from './redux/actions/authActions';

// Custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#f0a04b', // Orange color matching screenshots
    },
    secondary: {
      main: '#333333',
    },
    background: {
      default: '#f8f8f8',
    },
    warning: {
      main: '#f0a04b', // Same as primary for consistent color scheme
    }
  },
  typography: {
    fontFamily: [
      'Poppins',
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '4px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
  },
});

// Layout component to conditionally render NavBar and Footer
const Layout = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh',
      width: '100%'
    }}>
      {!isLoginPage && <NavBar />}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          width: '100%',
          maxWidth: '100%',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: isLoginPage ? '#fff' : '#f8f8f8',
          padding: 0,
          overflow: 'hidden'
        }}
      >
        {children}
      </Box>
      {!isLoginPage && <Footer />}
    </Box>
  );
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if user is already logged in from localStorage
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <AppRoutes />
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;