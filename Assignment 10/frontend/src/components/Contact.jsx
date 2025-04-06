// frontend/src/components/Contact.jsx
import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Paper,
  Snackbar,
  Alert,
  MenuItem,
  CircularProgress,
  Divider
} from '@mui/material';
import {
  Phone,
  Email,
  LocationOn,
  Send,
  ContactSupport
} from '@mui/icons-material';

const Contact = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  // Form validation state
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  // Validate form
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };
    
    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    
    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }
    
    // Validate subject
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
      isValid = false;
    }
    
    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        setSubmitStatus({
          open: true,
          message: 'Your message has been sent successfully! We will get back to you soon.',
          severity: 'success'
        });
        
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }, 1500);
    }
  };
  
  // Close snackbar
  const handleCloseSnackbar = () => {
    setSubmitStatus({
      ...submitStatus,
      open: false
    });
  };
  
  // Contact reasons options
  const contactReasons = [
    'General Inquiry',
    'Job Posting',
    'Partnership Opportunity',
    'Technical Support',
    'Feedback',
    'Other'
  ];

  return (
    <Box sx={{ bgcolor: 'rgb(238, 237, 235)', py: 4, minHeight: '100vh', width: '100%' }}>
      <Container maxWidth={false} sx={{ px: { xs: 2, sm: 4, md: 6 } }}>
        {/* Page Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '700px', mx: 'auto'}}>
            Have questions or feedback? Our team is here to help. Reach out to us and we'll respond as soon as possible.
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {/* Contact Information */}
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 4, 
                height: '100%',
                borderRadius: 2,
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                bgcolor: '#fff',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Typography variant="h5" component="h2" fontWeight="bold" sx={{ mb: 3, color: '#eda45f' }}>
                Get In Touch
              </Typography>
              
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" component="h3" gutterBottom>
                  Contact Information
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  We're available Monday through Friday, 9am to 5pm EST.
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      borderRadius: '50%',
                      bgcolor: 'rgba(237, 164, 95, 0.1)',
                      width: 40,
                      height: 40,
                      mr: 2
                    }}
                  >
                    <Email sx={{ color: '#eda45f' }} />
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Email
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      info@jobportal.com
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      borderRadius: '50%',
                      bgcolor: 'rgba(237, 164, 95, 0.1)',
                      width: 40,
                      height: 40,
                      mr: 2
                    }}
                  >
                    <Phone sx={{ color: '#eda45f' }} />
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Phone
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      +1 (555) 123-4567
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      borderRadius: '50%',
                      bgcolor: 'rgba(237, 164, 95, 0.1)',
                      width: 40,
                      height: 40,
                      mr: 2
                    }}
                  >
                    <LocationOn sx={{ color: '#eda45f' }} />
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Address
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      123 Business Avenue, Suite 400<br />
                      San Francisco, CA 94107
                    </Typography>
                  </Box>
                </Box>
              </Box>
              
              <Box sx={{ mt: 'auto' }}>
                <Typography variant="h6" component="h3" gutterBottom>
                  Customer Support
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Need immediate assistance? Contact our customer support team for help with any technical issues.
                </Typography>
                <Box 
                  component="a" 
                  href="tel:+18001234567" 
                  sx={{ 
                    display: 'inline-flex',
                    alignItems: 'center',
                    color: '#eda45f',
                    fontWeight: 'medium',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  <ContactSupport sx={{ mr: 1 }} />
                  +1 (800) 123-4567
                </Box>
              </Box>
            </Paper>
          </Grid>
          
          {/* Contact Form */}
          <Grid item xs={12} md={8}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 4, 
                borderRadius: 2,
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                bgcolor: '#fff'
              }}
            >
              <Typography variant="h5" component="h2" fontWeight="bold" sx={{ mb: 3 }}>
                Send Us a Message
              </Typography>
              
              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&.Mui-focused fieldset': {
                            borderColor: '#eda45f',
                          }
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#eda45f',
                        }
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Your Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&.Mui-focused fieldset': {
                            borderColor: '#eda45f',
                          }
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#eda45f',
                        }
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      select
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      error={!!errors.subject}
                      helperText={errors.subject}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&.Mui-focused fieldset': {
                            borderColor: '#eda45f',
                          }
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#eda45f',
                        }
                      }}
                    >
                      {contactReasons.map((reason) => (
                        <MenuItem key={reason} value={reason}>
                          {reason}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Your Message"
                      name="message"
                      multiline
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      error={!!errors.message}
                      helperText={errors.message}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&.Mui-focused fieldset': {
                            borderColor: '#eda45f',
                          }
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#eda45f',
                        }
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={loading}
                      startIcon={loading ? <CircularProgress size={24} /> : <Send />}
                      sx={{ 
                        py: 1.5,
                        px: 4,
                        bgcolor: '#eda45f',
                        '&:hover': {
                          bgcolor: '#d69149',
                        },
                        '&:disabled': {
                          bgcolor: '#f0b983',
                        }
                      }}
                    >
                      {loading ? 'Sending...' : 'Send Message'}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        
        {/* FAQ Section */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            mt: 4,
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            bgcolor: '#fff'
          }}
        >
          <Typography variant="h5" component="h2" fontWeight="bold" sx={{ mb: 3 }}>
            Frequently Asked Questions
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="h6" component="h3" gutterBottom sx={{ color: '#eda45f' }}>
                  How can I post a job on your platform?
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  To post a job, you need to create an employer account first. Once registered, you can click on the "Post a Job" button on your dashboard and follow the instructions.
                </Typography>
              </Box>
              
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" component="h3" gutterBottom sx={{ color: '#eda45f' }}>
                  What is the cost of posting a job?
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  We offer various pricing plans starting from $49/month. You can view our detailed pricing on the "Pricing" page or contact our sales team for custom enterprise solutions.
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="h6" component="h3" gutterBottom sx={{ color: '#eda45f' }}>
                  How do I create a job seeker account?
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Click on the "Sign Up" button in the top right corner, select "Job Seeker" as your account type, and follow the registration process. It's free and takes less than 2 minutes.
                </Typography>
              </Box>
              
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" component="h3" gutterBottom sx={{ color: '#eda45f' }}>
                  Can I get a refund if I'm not satisfied?
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Yes, we offer a 14-day money-back guarantee for all new subscriptions. If you're not satisfied, contact our support team within 14 days of your purchase.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
        
        {/* Snackbar for form submission status */}
        <Snackbar
          open={submitStatus.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={submitStatus.severity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {submitStatus.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Contact;