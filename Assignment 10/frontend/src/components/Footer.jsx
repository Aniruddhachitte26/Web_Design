// frontend/src/components/Footer.jsx
import React from 'react';
import { Box, Container, Grid, Typography, Link, Divider, IconButton } from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        bgcolor: '#333',
        color: 'white',
        py: 4,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Job Portal
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: '#ccc' }}>
              Your gateway to exciting career opportunities and company insights.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link
                component={RouterLink}
                to="/"
                sx={{
                  color: '#ccc',
                  textDecoration: 'none',
                  '&:hover': { color: '#eda45f' }
                }}
              >
                Home
              </Link>
              <Link
                component={RouterLink}
                to="/jobs"
                sx={{
                  color: '#ccc',
                  textDecoration: 'none',
                  '&:hover': { color: '#eda45f' }
                }}
              >
                Jobs
              </Link>
              <Link
                component={RouterLink}
                to="/company-showcase"
                sx={{
                  color: '#ccc',
                  textDecoration: 'none',
                  '&:hover': { color: '#eda45f' }
                }}
              >
                Companies
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
              Contact Us
            </Typography>
            <Typography variant="body2" color="#ccc">
              Email: info@jobportal.com
            </Typography>
            <Typography variant="body2" color="#ccc">
              Phone: +1 (555) 123-4567
            </Typography>
            <Typography variant="body2" color="#ccc">
              Address: 123 Business Ave, San Francisco, CA
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, bgcolor: 'rgba(255,255,255,0.1)' }} />

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ color: '#aaa', mb: { xs: 2, sm: 0 } }}>
            © {new Date().getFullYear()} Job Portal. All rights reserved.
          </Typography>

          <Box>
            <IconButton sx={{ color: '#fff' }}>
              <Facebook />
            </IconButton>
            <IconButton sx={{ color: '#fff' }}>
              <Twitter />
            </IconButton>
            <IconButton sx={{ color: '#fff' }}>
              <LinkedIn />
            </IconButton>
            <IconButton sx={{ color: '#fff' }}>
              <Instagram />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;