// frontend/src/components/admin/AddJob.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Snackbar,
  Alert,
  CircularProgress,
  InputAdornment
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { createJob } from '../../redux/actions/jobActions';
import { useNavigate, Link } from 'react-router-dom';

const AddJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const { createJobStatus } = useSelector(state => state.jobs);
  
  // Form state
  const [formData, setFormData] = useState({
    companyName: '',
    title: '',
    description: '',
    salary: ''
  });
  
  // Validation state
  const [errors, setErrors] = useState({
    companyName: '',
    title: '',
    description: '',
    salary: ''
  });
  
  // UI state
  const [snackbar, setSnackbar] = useState({
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
    
    // Clear errors when typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Form validation
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };
    
    // Company Name validation
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
      isValid = false;
    }
    
    // Job Title validation
    if (!formData.title.trim()) {
      newErrors.title = 'Job title is required';
      isValid = false;
    }
    
    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = 'Job description is required';
      isValid = false;
    } else if (formData.description.trim().length < 20) {
      newErrors.description = 'Description should be at least 20 characters';
      isValid = false;
    }
    
    // Salary validation
    if (!formData.salary.trim()) {
      newErrors.salary = 'Salary information is required';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        await dispatch(createJob({
          ...formData,
          userId: user._id
        }));
        
        // Show success message
        setSnackbar({
          open: true,
          message: 'Job created successfully!',
          severity: 'success'
        });
        
        // Reset form on success
        setFormData({
          companyName: '',
          title: '',
          description: '',
          salary: ''
        });
      } catch (error) {
        setSnackbar({
          open: true,
          message: error.message || 'Failed to create job. Please try again.',
          severity: 'error'
        });
      }
    }
  };
  
  // Handle snackbar close
  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };
  
  // Handle back button
  const handleBack = () => {
    navigate('/admin/employees');
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '100%', p: 3 }}>
      {/* Breadcrumb */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Link 
          to="/admin/employees"
          style={{ 
            textDecoration: 'none', 
            color: '#666', 
            display: 'flex', 
            alignItems: 'center' 
          }}
        >
          Dashboard
        </Link>
        <Typography sx={{ mx: 1 }}>&gt;</Typography>
        <Typography color="text.primary">Add New Job</Typography>
      </Box>
      
      {/* Header */}
      <Box 
        sx={{ 
          bgcolor: '#f0a04b', 
          color: 'white', 
          p: 3, 
          borderRadius: 1,
          mb: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight="bold">
            Add New Job
          </Typography>
          <Typography variant="body2">
            Create a new job posting to be listed on the platform
          </Typography>
        </Box>
        
        <Button
          startIcon={<ArrowBack />}
          onClick={handleBack}
          sx={{ 
            color: 'white', 
            bgcolor: 'rgba(255,255,255,0.2)',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.3)'
            }
          }}
        >
          Back
        </Button>
      </Box>
      
      {/* Form */}
      <Box 
        component="form" 
        onSubmit={handleSubmit}
        sx={{ 
          bgcolor: 'white', 
          p: 3, 
          borderRadius: 1, 
          border: '1px solid #eee'
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Box>
              <Typography variant="body2" fontWeight="medium" mb={0.5}>
                Company Name *
              </Typography>
              <TextField
                fullWidth
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                error={!!errors.companyName}
                helperText={errors.companyName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box component="span" sx={{ color: '#999' }}>
                        🏢
                      </Box>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1
                  }
                }}
                size="small"
              />
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Box>
              <Typography variant="body2" fontWeight="medium" mb={0.5}>
                Job Title *
              </Typography>
              <TextField
                fullWidth
                name="title"
                value={formData.title}
                onChange={handleChange}
                error={!!errors.title}
                helperText={errors.title}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box component="span" sx={{ color: '#999' }}>
                        💼
                      </Box>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1
                  }
                }}
                size="small"
              />
            </Box>
          </Grid>
          
          <Grid item xs={12}>
            <Box>
              <Typography variant="body2" fontWeight="medium" mb={0.5}>
                Job Description *
              </Typography>
              <TextField
                fullWidth
                name="description"
                value={formData.description}
                onChange={handleChange}
                error={!!errors.description}
                helperText={errors.description}
                multiline
                rows={4}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box component="span" sx={{ color: '#999' }}>
                        📝
                      </Box>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1
                  }
                }}
              />
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Box>
              <Typography variant="body2" fontWeight="medium" mb={0.5}>
                Salary Range *
              </Typography>
              <TextField
                fullWidth
                name="salary"
                placeholder="e.g. $50,000 - $70,000"
                value={formData.salary}
                onChange={handleChange}
                error={!!errors.salary}
                helperText={errors.salary}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box component="span" sx={{ color: '#999' }}>
                        $
                      </Box>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1
                  }
                }}
                size="small"
              />
            </Box>
          </Grid>
        </Grid>
        
        {/* Buttons */}
        <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={handleBack}
            sx={{ 
              px: 4,
              py: 1,
              color: '#666',
              borderColor: '#ccc'
            }}
          >
            Cancel
          </Button>
          
          <Button
            type="submit"
            variant="contained"
            disabled={createJobStatus.loading}
            startIcon={createJobStatus.loading && <CircularProgress size={20} color="inherit" />}
            // frontend/src/components/admin/AddJob.jsx (continued)
            sx={{ 
              px: 4,
              py: 1,
              bgcolor: '#f0a04b',
              color: 'white',
              '&:hover': {
                bgcolor: '#e09040',
              },
              '&:disabled': {
                bgcolor: '#f0b983',
                color: 'white'
              }
            }}
          >
            {createJobStatus.loading ? 'Submitting...' : 'Add Job'}
          </Button>
        </Box>
      </Box>
      
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddJob;