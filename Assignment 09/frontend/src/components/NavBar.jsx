import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  IconButton,
  Container,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Menu as MenuIcon, ExitToApp } from '@mui/icons-material';

const NavBar = ({ isAuthenticated, user, onLogout }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
      // Redirect to login page
      navigate('/login');
      console.log('Logout successful, redirected to login');
    } else {
      console.error('Logout function not provided');
    }
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Jobs', path: '/jobs' },
    { name: 'Companies', path: '/companies' },
    { name: 'Contact', path: '/contact' }
  ];

  // Mobile drawer content
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, color: '#eda45f', fontWeight: 'bold' }}>
        Job Portal
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem 
            key={item.name} 
            component={Link} 
            to={item.path} 
            sx={{ 
              textDecoration: 'none', 
              color: 'inherit',
              '&:hover': {
                backgroundColor: 'rgba(237, 164, 95, 0.1)',
              }
            }}
          >
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
        {isAuthenticated && (
          <ListItem 
            button 
            onClick={handleLogout}
            sx={{ 
              color: '#eda45f',
              '&:hover': {
                backgroundColor: 'rgba(237, 164, 95, 0.1)',
              }
            }}
          >
            <ListItemText primary="Logout" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <Container maxWidth="lg">
          <Toolbar>
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, color: '#333' }}
              >
                <MenuIcon />
              </IconButton>
            )}
            
            <Typography 
              variant="h6" 
              component={Link} 
              to="/" 
              sx={{ 
                flexGrow: 1, 
                textDecoration: 'none', 
                color: '#eda45f', 
                fontWeight: 'bold',
                fontSize: '1.5rem'
              }}
            >
              Job Portal
            </Typography>

            {!isMobile && (
              <Box sx={{ display: 'flex', mx: 1 }}>
                {navItems.map((item) => (
                  <Button 
                    key={item.name} 
                    component={Link} 
                    to={item.path} 
                    sx={{ 
                      color: '#333',
                      mx: 1,
                      '&:hover': {
                        backgroundColor: 'rgba(237, 164, 95, 0.1)',
                        color: '#eda45f',
                      }
                    }}
                  >
                    {item.name}
                  </Button>
                ))}
              </Box>
            )}

            {isAuthenticated ? (
              <Button 
                onClick={handleLogout}
                variant="contained" 
                startIcon={<ExitToApp />}
                sx={{ 
                  backgroundColor: '#eda45f', 
                  '&:hover': {
                    backgroundColor: '#d69149',
                  }
                }}
                data-testid="logout-button"
              >
                Logout
              </Button>
            ) : (
              <Button 
                component={Link} 
                to="/login" 
                variant="contained" 
                sx={{ 
                  backgroundColor: '#eda45f', 
                  '&:hover': {
                    backgroundColor: '#d69149',
                  }
                }}
              >
                Login
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default NavBar;