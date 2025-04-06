// frontend/src/components/NavBar.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
  Divider,
  Chip,
  Avatar
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Menu as MenuIcon, ExitToApp, SupervisorAccount, Work, Person, Home } from '@mui/icons-material';
import { logout } from '../redux/actions/authActions';

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  // Helper function to safely get user initials
  const getInitial = (name) => {
    if (name && typeof name === 'string' && name.length > 0) {
      return name.charAt(0).toUpperCase();
    }
    return null;
  };

  // Helper function to safely capitalize words
  const capitalize = (text) => {
    if (text && typeof text === 'string' && text.length > 0) {
      return text.charAt(0).toUpperCase() + text.slice(1);
    }
    return text;
  };

  // Define navigation items based on user type
  const getNavItems = () => {
    const items = [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' }
    ];

    if (isAuthenticated && user) {
      if (user.type === 'admin') {
        items.push(
          { name: 'Employees', path: '/admin/employees' },
          { name: 'Add Job', path: '/add-job' },

        );
      } else {
        items.push(
          { name: 'Jobs', path: '/jobs' },
          { name: 'Companies', path: '/company-showcase' },
          { name: 'Contact', path: '/contact' }
        );
      }
    }

    return items;
  };

  const navItems = getNavItems();

  // Mobile drawer content
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, color: '#eda45f', fontWeight: 'bold' }}>
        Job Portal
      </Typography>
      
      {isAuthenticated && user && (
        <Box sx={{ mb: 2, px: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <Avatar 
              sx={{ 
                bgcolor: user.type === 'admin' ? '#eda45f' : '#333',
                color: 'white',
                width: 60,
                height: 60,
                mb: 1
              }}
            >
              {getInitial(user.fullName) || <Person />}
            </Avatar>
          </Box>
          <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
            {user.fullName || 'User'}
          </Typography>
          {user.type && (
            <Chip 
              label={capitalize(user.type)}
              color={user.type === 'admin' ? 'primary' : 'secondary'}
              icon={user.type === 'admin' ? <SupervisorAccount /> : <Work />}
              size="small"
              sx={{ mt: 1 }}
            />
          )}
        </Box>
      )}
      
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
    <AppBar position="sticky" sx={{ backgroundColor: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', width: '100vw' }}>
      <Container maxWidth={false} sx={{ width: '100%', px: { xs: 2, md: 4 } }}>
        <Toolbar disableGutters sx={{ width: '100%' }}>
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

          {isAuthenticated && !isMobile && user && (
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
              <Avatar 
                sx={{ 
                  bgcolor: user.type === 'admin' ? '#eda45f' : '#333',
                  width: 40,
                  height: 40,
                  mr: 1
                }}
              >
                {getInitial(user.fullName) || <Person />}
              </Avatar>
              <Box sx={{ mr: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', lineHeight: 1.2 }}>
                  {user.fullName || 'User'}
                </Typography>
                {user.type && (
                  <Chip 
                    label={capitalize(user.type)}
                    color={user.type === 'admin' ? 'primary' : 'secondary'}
                    size="small"
                    sx={{ height: 20, fontSize: '0.7rem' }}
                  />
                )}
              </Box>
            </Box>
          )}

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
                },
                borderRadius: 2
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
                },
                borderRadius: 2
              }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </Container>

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
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default NavBar;