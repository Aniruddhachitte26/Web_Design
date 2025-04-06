import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
  InputAdornment,
  Skeleton,
  Divider,
  Paper,
  Avatar,
  Rating,
  IconButton,
  Snackbar,
  Alert,
  Chip,
  CircularProgress
} from '@mui/material';
import {
  Search,
  LocationOn,
  People,
  Language,
  Bookmark,
  BookmarkBorder,
  LinkedIn,
  Twitter,
  FilterList,
  Business
} from '@mui/icons-material';

// Predefined companies for the showcase
const predefinedCompanies = [
  {
    id: 'alphabet',
    name: 'Alphabet Inc.',
    industry: 'Information Technology',
    location: 'Mountain View, USA',
    employees: '156,000+',
    founded: 1998,
    website: 'https://example.com/alphabet',
    rating: 4.7,
    description: "Parent company of Google and several former Google subsidiaries. Leader in search, cloud computing, software, and hardware with a mission to organize the world's information.",
    imagePath: 'http://localhost:3000/images/alph.png'
  },
  {
    id: 'amazon',
    name: 'Amazon.com Inc.',
    industry: 'E-Commerce & Cloud Computing',
    location: 'Seattle, USA',
    employees: '1,400,000+',
    founded: 1994,
    website: 'https://example.com/amazon',
    rating: 4.5,
    description: 'Global leader in e-commerce, cloud computing, digital streaming, and artificial intelligence. Known for innovation and customer-centric approach across diverse businesses.',
    imagePath: 'http://localhost:3000/images/amazon.jpg'
  },
  {
    id: 'apple',
    name: 'Apple Inc.',
    industry: 'Consumer Electronics',
    location: 'Cupertino, USA',
    employees: '154,000+',
    founded: 1976,
    website: 'https://example.com/apple',
    rating: 4.8,
    description: 'Innovative technology company that designs, develops, and sells consumer electronics, computer software, and online services. Known for iPhone, Mac, and services.',
    imagePath: 'http://localhost:3000/images/apple.png'
  },
  {
    id: 'meta',
    name: 'Meta Platforms Inc.',
    industry: 'Social Media & Technology',
    location: 'Menlo Park, USA',
    employees: '77,000+',
    founded: 2004,
    website: 'https://example.com/meta',
    rating: 4.2,
    description: 'Leading social technology company focusing on building products that enable people to connect and share. Owner of Facebook, Instagram, WhatsApp, and developing metaverse technologies.',
    imagePath: 'http://localhost:3000/images/meta.png'
  },
  {
    id: 'microsoft',
    name: 'Microsoft Corporation',
    industry: 'Software & Cloud Computing',
    location: 'Redmond, USA',
    employees: '181,000+',
    founded: 1975,
    website: 'https://example.com/microsoft',
    rating: 4.6,
    description: 'Leading technology company developing software, hardware, and services. Known for Windows, Office, Azure cloud platform, and enterprise solutions.',
    imagePath: 'http://localhost:3000/images/ms.png'
  },
  {
    id: 'nvidia',
    name: 'NVIDIA Corporation',
    industry: 'Semiconductor & AI',
    location: 'Santa Clara, USA',
    employees: '26,000+',
    founded: 1993,
    website: 'https://example.com/nvidia',
    rating: 4.9,
    description: 'Leading computing technology company specializing in GPUs, AI, and accelerated computing. Transforming industries with innovations in gaming, data centers, and artificial intelligence.',
    imagePath: 'http://localhost:3000/images/nv.png'
  },
  {
    id: 'tesla',
    name: 'Tesla Inc.',
    industry: 'Automotive & Clean Energy',
    location: 'Austin, USA',
    employees: '127,000+',
    founded: 2003,
    website: 'https://example.com/tesla',
    rating: 4.7,
    description: 'Electric vehicle and clean energy company aiming to accelerate the world\'s transition to sustainable energy. Leading innovations in electric cars, battery storage, and solar products.',
    imagePath: 'http://localhost:3000/images/tesla.png'
  },
  {
    id: 'ibm',
    name: 'IBM Corporation',
    industry: 'Information Technology',
    location: 'Armonk, USA',
    employees: '280,000+',
    founded: 1911,
    website: 'https://example.com/ibm',
    rating: 4.4,
    description: 'Global technology and consulting company with a portfolio spanning cloud computing, artificial intelligence, and business services. Pioneer in research and innovation.',
    imagePath: 'http://localhost:3000/images/ibm.png'
  },
  {
    id: 'oracle',
    name: 'Oracle Corporation',
    industry: 'Enterprise Software',
    location: 'Austin, USA',
    employees: '143,000+',
    founded: 1977,
    website: 'https://example.com/oracle',
    rating: 4.3,
    description: 'Multinational computer technology corporation specializing in database software, cloud engineered systems, and enterprise software products. Leading provider of enterprise solutions.',
    imagePath: 'http://localhost:3000/images/oracle.png'
  },
  {
    id: 'salesforce',
    name: 'Salesforce Inc.',
    industry: 'Cloud Computing & CRM',
    location: 'San Francisco, USA',
    employees: '79,000+',
    founded: 1999,
    website: 'https://example.com/salesforce',
    rating: 4.5,
    description: 'Provider of customer relationship management software and applications focused on sales, customer service, marketing automation, analytics, and application development.',
    imagePath: 'http://localhost:3000/images/sf.png'
  }
];

const CompanyShowcase = () => {
  // State
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savedCompanies, setSavedCompanies] = useState([]);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  // Industries for filtering
  const industries = [...new Set(predefinedCompanies.map(company => company.industry))];

  // Fetch companies from backend and combine with predefined companies
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        
        // Try to fetch from backend
        try {
          const response = await axios.get('http://localhost:3000/getUser');
          // Assume response.data.users is an array of user objects
          const fetchedCompanies = response.data.users
            .filter(user => user.imagePath)
            .map(user => ({
              id: user._id,
              name: user.fullName,
              // Use existing fields or set defaults if not provided
              industry: user.industry || "Not specified",
              location: user.location || "Unknown Location",
              employees: user.employees || "N/A",
              founded: user.founded || "N/A",
              website: user.website || "#",
              rating: user.rating || 4.0,
              description: user.description || "Company description not available.",
              imagePath: user.imagePath.startsWith('http') ? user.imagePath : `http://localhost:3000${user.imagePath}`
            }));
            
          // Combine fetched companies with predefined companies
          const allCompanies = [...predefinedCompanies];
          setFilteredCompanies(allCompanies);
        } catch (err) {
          console.error('Error fetching companies from backend:', err);
          // If backend fetch fails, just use predefined companies
          setFilteredCompanies(predefinedCompanies);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error setting up companies:', err);
        setError('Failed to load companies. Please try again later.');
        setFilteredCompanies(predefinedCompanies);
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  // Filter companies based on search term and industry filter
  useEffect(() => {
    let result = [...predefinedCompanies]; // Start with predefined companies
    
    // Filter by search term
    if (searchTerm.trim()) {
      result = result.filter(company =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by industry
    if (industryFilter) {
      result = result.filter(company =>
        company.industry === industryFilter
      );
    }
    
    setFilteredCompanies(result);
  }, [searchTerm, industryFilter]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleIndustryFilterChange = (event) => {
    setIndustryFilter(event.target.value);
  };

  const handleSaveCompany = (companyId) => {
    if (savedCompanies.includes(companyId)) {
      setSavedCompanies(savedCompanies.filter(id => id !== companyId));
      setNotification({
        open: true,
        message: 'Company removed from saved list',
        severity: 'info'
      });
    } else {
      setSavedCompanies([...savedCompanies, companyId]);
      setNotification({
        open: true,
        message: 'Company saved to your list',
        severity: 'success'
      });
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <Box sx={{ bgcolor: 'rgb(238, 237, 235)', py: 4, minHeight: '100vh' }}>
      <Container maxWidth="lg">
        {/* Page Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Company Showcase
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Explore our partner companies and find your ideal workplace. Learn about company cultures, missions, and open positions.
          </Typography>
        </Box>

        {/* Search and Filter Bar */}
        <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search by company name, industry, or location..."
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#eda45f',
                    }
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Business color="primary" />
                <TextField
                  select
                  fullWidth
                  // label="Filter by Industry"
                  value={industryFilter}
                  onChange={handleIndustryFilterChange}
                  SelectProps={{
                    native: true,
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: '#eda45f',
                      }
                    }
                  }}
                >
                  <option value="">All Industries</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </TextField>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Company Gallery */}
        <Box sx={{ mb: 6 }}>
          {loading ? (
            // Loading skeleton
            <Grid container spacing={3}>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Skeleton variant="rectangular" height={200} />
                    <CardContent>
                      <Skeleton variant="text" height={40} />
                      <Skeleton variant="text" />
                      <Skeleton variant="text" />
                      <Skeleton variant="text" width="60%" />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : error ? (
            // Error message
            <Paper
              elevation={0}
              sx={{
                p: 4,
                textAlign: 'center',
                borderRadius: 2,
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
              }}
            >
              <Typography variant="h6" color="error" gutterBottom>
                {error}
              </Typography>
              <Button
                variant="contained"
                onClick={() => window.location.reload()}
                sx={{ 
                  mt: 2,
                  bgcolor: '#eda45f',
                  '&:hover': {
                    bgcolor: '#d69149',
                  }
                }}
              >
                Try Again
              </Button>
            </Paper>
          ) : filteredCompanies.length > 0 ? (
            // Company cards
            <Grid container spacing={3}>
              {filteredCompanies.map((company) => (
                <Grid item xs={12} sm={6} md={4} key={company.id}>
                  <Card
                    elevation={0}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 2,
                      overflow: 'hidden',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 12px 20px rgba(0,0,0,0.1)',
                      }
                    }}
                  >
                    <Box sx={{ position: 'relative' }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={company.imagePath}
                        alt={company.name}
                        sx={{ objectFit: 'cover' }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 10,
                          right: 10,
                          zIndex: 1,
                        }}
                      >
                        <IconButton
                          onClick={() => handleSaveCompany(company.id)}
                          sx={{
                            bgcolor: 'rgba(255, 255, 255, 0.8)',
                            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' }
                          }}
                        >
                          {savedCompanies.includes(company.id) ? (
                            <Bookmark sx={{ color: '#eda45f' }} />
                          ) : (
                            <BookmarkBorder sx={{ color: '#eda45f' }} />
                          )}
                        </IconButton>
                      </Box>
                      <Avatar
                        sx={{
                          position: 'absolute',
                          bottom: -24,
                          left: 16,
                          width: 48,
                          height: 48,
                          bgcolor: '#eda45f',
                          border: '2px solid white',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        }}
                      >
                        {company.name.charAt(0)}
                      </Avatar>
                    </Box>
                    <CardContent sx={{ pt: 4, pb: 2, flexGrow: 1 }}>
                      <Typography variant="h6" component="div" gutterBottom fontWeight="medium">
                        {company.name}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Rating
                          value={company.rating}
                          precision={0.1}
                          size="small"
                          readOnly
                        />
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                          {company.rating}
                        </Typography>
                      </Box>
                      <Chip 
                        label={company.industry} 
                        size="small"
                        sx={{ 
                          mb: 2,
                          bgcolor: 'rgba(237, 164, 95, 0.1)', 
                          color: '#eda45f' 
                        }}
                      />
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <LocationOn fontSize="small" color="action" sx={{ mr: 0.5 }} />
                        <Typography variant="body2" color="text.secondary">
                          {company.location}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <People fontSize="small" color="action" sx={{ mr: 0.5 }} />
                        <Typography variant="body2" color="text.secondary">
                          {company.employees} employees
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {company.description.length > 120 ? 
                          `${company.description.substring(0, 120)}...` : 
                          company.description}
                      </Typography>
                    </CardContent>
                    <Divider />
                    <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Language />}
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          borderColor: '#eda45f',
                          color: '#eda45f',
                          '&:hover': {
                            borderColor: '#d69149',
                            bgcolor: 'rgba(237, 164, 95, 0.1)',
                          }
                        }}
                      >
                        Website
                      </Button>
                      <Box>
                        <IconButton size="small" sx={{ color: '#0077B5', mr: 1 }}>
                          <LinkedIn />
                        </IconButton>
                        <IconButton size="small" sx={{ color: '#1DA1F2' }}>
                          <Twitter />
                        </IconButton>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            // No results
            <Box sx={{ textAlign: 'center', py: 5 }}>
              <Typography variant="h6" color="text.secondary">
                No companies found matching your search.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try adjusting your search criteria.
              </Typography>
              <Button
                variant="contained"
                onClick={() => {
                  setSearchTerm('');
                  setIndustryFilter('');
                }}
                sx={{ 
                  mt: 3,
                  bgcolor: '#eda45f',
                  '&:hover': {
                    bgcolor: '#d69149',
                  }
                }}
              >
                Clear Filters
              </Button>
            </Box>
          )}
        </Box>

        {/* Notification */}
        <Snackbar
          open={notification.open}
          autoHideDuration={3000}
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
      </Container>
    </Box>
  );
};

export default CompanyShowcase;