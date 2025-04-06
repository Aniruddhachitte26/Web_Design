// frontend/src/components/employee/Jobs.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  TextField,
  InputAdornment,
  Divider,
  Pagination,
  Paper,
  Stack,
  CircularProgress,
  Alert,
  Avatar,
  CardHeader
} from '@mui/material';
import {
  Search,
  LocationOn,
  Work,
  AttachMoney,
  Business,
  AccessTime
} from '@mui/icons-material';
import { fetchJobs } from '../../redux/actions/jobActions';

const Jobs = () => {
  const dispatch = useDispatch();
  const { jobs, pagination, loading, error } = useSelector(state => state.jobs);
  
  // State for search and filter
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [page, setPage] = useState(1);
  
  // Fetch jobs on component mount
  useEffect(() => {
    dispatch(fetchJobs(page, 5));
  }, [dispatch, page]);
  
  // Filter jobs based on search term
  useEffect(() => {
    if (jobs) {
      setFilteredJobs(
        jobs.filter(job =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [jobs, searchTerm]);
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Handle pagination change
  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box sx={{ 
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      py: 4,
      bgcolor: '#f8f7f5'
    }}>
      <Container maxWidth="lg" sx={{ width: '100%' }}>
        {/* Page Header */}
        <Card 
          elevation={0} 
          sx={{ 
            mb: 4,
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
          }}
        >
          <CardHeader
            title="Available Job Opportunities"
            subheader="Explore our latest job openings and find the perfect role for your career growth"
            sx={{
              bgcolor: '#eda45f',
              color: 'white',
              '& .MuiCardHeader-subheader': {
                color: 'rgba(255, 255, 255, 0.8)'
              },
              textAlign: 'center'
            }}
          />
          
          <CardContent sx={{ p: 3 }}>
            <TextField
              fullWidth
              placeholder="Search for jobs by title, company, or keywords..."
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: '#eda45f' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&.Mui-focused fieldset': {
                    borderColor: '#eda45f',
                    borderWidth: 2
                  },
                }
              }}
            />
          </CardContent>
        </Card>
        
        {/* Error alert */}
        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 4,
              borderRadius: 2
            }}
          >
            {error}
          </Alert>
        )}
        
        {/* Loading state */}
        {loading ? (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            justifyContent: 'center', 
            my: 8 
          }}>
            <CircularProgress 
              sx={{ 
                color: '#eda45f',
                mb: 2
              }} 
            />
            <Typography variant="body1" color="text.secondary">
              Loading available jobs...
            </Typography>
          </Box>
        ) : filteredJobs.length === 0 ? (
          <Paper 
            elevation={0} 
            sx={{ 
              p: 4, 
              textAlign: 'center', 
              borderRadius: 3,
              mb: 4,
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              border: '1px solid rgba(0,0,0,0.05)'
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                bgcolor: 'rgba(237, 164, 95, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2
              }}
            >
              <Search sx={{ fontSize: 36, color: '#eda45f' }} />
            </Box>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              No jobs found matching your search criteria
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 600, mx: 'auto' }}>
              Try adjusting your search terms or browse all available positions
            </Typography>
            <Button 
              variant="contained" 
              onClick={() => setSearchTerm('')}
              sx={{ 
                px: 4,
                py: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(45deg, #eda45f 30%, #f0b983 90%)',
                boxShadow: '0 3px 5px 2px rgba(237, 164, 95, .3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 10px 2px rgba(237, 164, 95, .3)',
                }
              }}
            >
              View All Jobs
            </Button>
          </Paper>
        ) : (
          <>
            {/* Job Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {filteredJobs.map((job) => (
                <Grid item xs={12} key={job._id || job.id}>
                  <Card 
                    sx={{ 
                      borderRadius: 3,
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      border: '1px solid rgba(0,0,0,0.05)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 16px 30px rgba(0,0,0,0.1)'
                      }
                    }}
                  >
                    <Box sx={{ position: 'relative' }}>
                      <CardContent sx={{ p: 0 }}>
                        <Box sx={{ 
                          p: 3, 
                          borderBottom: '1px solid rgba(0,0,0,0.05)',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 2,
                          flexDirection: { xs: 'column', sm: 'row' }
                        }}>
                          <Avatar 
                            variant="rounded"
                            sx={{ 
                              bgcolor: '#eda45f', 
                              width: { xs: 48, sm: 56 }, 
                              height: { xs: 48, sm: 56 },
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '1.5rem',
                              fontWeight: 'bold',
                              color: 'white',
                              boxShadow: '0 4px 10px rgba(237, 164, 95, 0.3)'
                            }}
                          >
                            {job.companyName.charAt(0)}
                          </Avatar>
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h5" component="h2" fontWeight="bold">
                              {job.title}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                              <Business sx={{ color: '#eda45f', mr: 0.5, fontSize: 18 }} />
                              <Typography variant="subtitle1" color="text.secondary">
                                {job.companyName}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                              <Chip 
                                icon={<Work fontSize="small" />}
                                label="Full-time" 
                                size="small"
                                sx={{ 
                                  borderRadius: 1,
                                  bgcolor: 'rgba(25, 118, 210, 0.1)', 
                                  color: '#1976d2'
                                }}
                              />
                              <Chip 
                                icon={<LocationOn fontSize="small" />}
                                label="Remote" 
                                size="small"
                                sx={{ 
                                  borderRadius: 1,
                                  bgcolor: 'rgba(76, 175, 80, 0.1)', 
                                  color: '#4caf50'
                                }}
                              />
                              <Chip 
                                icon={<AccessTime fontSize="small" />}
                                label="Posted 2 days ago" 
                                size="small"
                                sx={{ 
                                  borderRadius: 1,
                                  bgcolor: 'rgba(0, 0, 0, 0.05)', 
                                  color: 'text.secondary'
                                }}
                              />
                            </Box>
                          </Box>
                          <Box 
                            sx={{ 
                              px: 2, 
                              py: 1, 
                              bgcolor: 'rgba(237, 164, 95, 0.1)', 
                              borderRadius: 2,
                              color: '#eda45f',
                              fontWeight: 'bold',
                              whiteSpace: 'nowrap',
                              alignSelf: { xs: 'flex-start', sm: 'center' }
                            }}
                          >
                            {job.salary}
                          </Box>
                        </Box>
                        
                        <Box sx={{ p: 3 }}>
                          <Typography variant="body1" paragraph>
                            {job.description}
                          </Typography>
                          
                          <Button 
                            variant="contained" 
                            fullWidth
                            sx={{ 
                              mt: 2,
                              py: 1.5,
                              borderRadius: 2,
                              background: 'linear-gradient(45deg, #eda45f 30%, #f0b983 90%)',
                              boxShadow: '0 3px 5px 2px rgba(237, 164, 95, .3)',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 6px 10px 2px rgba(237, 164, 95, .3)',
                              }
                            }}
                          >
                            Apply Now
                          </Button>
                        </Box>
                      </CardContent>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
            
            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, mb: 2 }}>
                <Pagination 
                  count={pagination.totalPages} 
                  page={page} 
                  onChange={handlePageChange} 
                  size="large"
                  sx={{
                    '& .MuiPaginationItem-root': {
                      mx: 0.5,
                      borderRadius: 1.5,
                    },
                    '& .MuiPaginationItem-root.Mui-selected': {
                      bgcolor: '#eda45f !important',
                      color: 'white',
                      fontWeight: 'bold',
                      boxShadow: '0 2px 5px rgba(237, 164, 95, 0.3)',
                    }
                  }}
                />
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

export default Jobs;