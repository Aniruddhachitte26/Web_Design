import React, { useState, useEffect } from 'react';
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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Divider,
  Pagination,
  Paper,
  Stack,
  CircularProgress
} from '@mui/material';
import {
  Search,
  LocationOn,
  Work,
  AttachMoney,
  Sort,
  FilterList,
  Bookmark,
  BookmarkBorder
} from '@mui/icons-material';

// Import the job listings data with updated company names
const jobPosts = [
  {
    id: 1,
    title: "Full Stack Developer",
    description: "Join our team to work on cutting-edge technologies and develop sophisticated web applications.",
    requiredSkills: "JavaScript, React, Node.js, MongoDB",
    salary: "$70,000 - $100,000",
    location: "Mountain View, CA",
    company: "Alphabet Inc.",
    type: "Full-time",
    category: "Development",
    posted: "2 days ago",
    lastUpdated: "Last updated 2 days ago",
    applyLink: "https://example.com/apply/full-stack-developer",
  },
  {
    id: 2,
    title: "Digital Marketing Specialist",
    description: "Elevate our digital marketing strategies with expertise in SEO, SEM, and social media marketing.",
    requiredSkills: "SEO, SEM, Google Analytics, Social Media",
    salary: "$50,000 - $70,000",
    location: "Seattle, WA",
    company: "Amazon.com Inc.",
    type: "Full-time",
    category: "Marketing",
    posted: "1 day ago",
    lastUpdated: "Last updated 1 day ago",
    applyLink: "https://example.com/apply/digital-marketing-specialist",
  },
  {
    id: 3,
    title: "UX/UI Designer",
    description: "Design engaging user experiences and visually captivating interfaces for our products.",
    requiredSkills: "Figma, Sketch, Adobe XD, User Research",
    salary: "$60,000 - $80,000",
    location: "Cupertino, CA",
    company: "Apple Inc.",
    type: "Contract",
    category: "Design",
    posted: "4 hours ago",
    lastUpdated: "Last updated 4 hours ago",
    applyLink: "https://example.com/apply/ux-ui-designer",
  },
  {
    id: 4,
    title: "Data Scientist",
    description: "Leverage advanced analytics and machine learning to uncover insights from vast datasets.",
    requiredSkills: "Python, R, SQL, Machine Learning",
    salary: "$80,000 - $120,000",
    location: "Menlo Park, CA",
    company: "Meta Platforms Inc.",
    type: "Full-time",
    category: "Data Science",
    posted: "3 days ago",
    lastUpdated: "Last updated 3 days ago",
    applyLink: "https://example.com/apply/data-scientist",
  },
  {
    id: 5,
    title: "Customer Support Representative",
    description: "Provide unparalleled customer service and support through effective communication.",
    requiredSkills: "Communication, Problem-Solving, CRM Software",
    salary: "$35,000 - $50,000",
    location: "Redmond, WA",
    company: "Microsoft Corporation",
    type: "Part-time",
    category: "Customer Service",
    posted: "6 hours ago",
    lastUpdated: "Last updated 6 hours ago",
    applyLink: "https://example.com/apply/customer-support-representative",
  },
  {
    id: 6,
    title: "Project Manager",
    description: "Guide project teams to ensure successful project delivery with strong organizational skills.",
    requiredSkills: "Leadership, Agile, Scrum, Communication",
    salary: "$70,000 - $90,000",
    location: "Santa Clara, CA",
    company: "NVIDIA Corporation",
    type: "Full-time",
    category: "Management",
    posted: "1 week ago",
    lastUpdated: "Last updated 1 week ago",
    applyLink: "https://example.com/apply/project-manager",
  },
  {
    id: 7,
    title: "Software Engineer",
    description: "Develop and maintain software solutions using modern technologies.",
    requiredSkills: "Java, Spring Boot, REST APIs, Microservices",
    salary: "$75,000 - $110,000",
    location: "Austin, TX",
    company: "Tesla Inc.",
    type: "Full-time",
    category: "Development",
    posted: "2 days ago",
    lastUpdated: "Last updated 2 days ago",
    applyLink: "https://example.com/apply/software-engineer",
  },
  {
    id: 8,
    title: "Mobile App Developer",
    description: "Design and develop mobile applications for both iOS and Android platforms.",
    requiredSkills: "React Native, Swift, Kotlin, UI/UX Design",
    salary: "$65,000 - $95,000",
    location: "Armonk, NY",
    company: "IBM Corporation",
    type: "Contract",
    category: "Development",
    posted: "3 days ago",
    lastUpdated: "Last updated 3 days ago",
    applyLink: "https://example.com/apply/mobile-app-developer",
  },
  {
    id: 9,
    title: "DevOps Engineer",
    description: "Implement and manage CI/CD pipelines, infrastructure, and deployment strategies.",
    requiredSkills: "Docker, Kubernetes, AWS, Jenkins",
    salary: "$80,000 - $120,000",
    location: "Austin, TX",
    company: "Oracle Corporation",
    type: "Full-time",
    category: "DevOps",
    posted: "2 days ago",
    lastUpdated: "Last updated 2 days ago",
    applyLink: "https://example.com/apply/devops-engineer",
  },
  {
    id: 10,
    title: "Frontend Developer",
    description: "Build and maintain user-friendly, high-performance web interfaces.",
    requiredSkills: "HTML, CSS, JavaScript, React",
    salary: "$60,000 - $90,000",
    location: "San Francisco, CA",
    company: "Salesforce Inc.",
    type: "Full-time",
    category: "Development",
    posted: "5 days ago",
    lastUpdated: "Last updated 5 days ago",
    applyLink: "https://example.com/apply/frontend-developer",
  },
  {
    id: 11,
    title: "Backend Developer",
    description: "Develop robust and scalable backend services and APIs.",
    requiredSkills: "Node.js, Express, MongoDB, REST",
    salary: "$70,000 - $100,000",
    location: "Mountain View, CA",
    company: "Alphabet Inc.",
    type: "Remote",
    category: "Development",
    posted: "3 days ago",
    lastUpdated: "Last updated 3 days ago",
    applyLink: "https://example.com/apply/backend-developer",
  },
  {
    id: 12,
    title: "QA Engineer",
    description: "Test and ensure the quality of software products through manual and automated tests.",
    requiredSkills: "Selenium, JIRA, Test Automation, Manual Testing",
    salary: "$50,000 - $80,000",
    location: "Seattle, WA",
    company: "Amazon.com Inc.",
    type: "Full-time",
    category: "Quality Assurance",
    posted: "1 week ago",
    lastUpdated: "Last updated 1 week ago",
    applyLink: "https://example.com/apply/qa-engineer",
  },
  {
    id: 13,
    title: "Systems Administrator",
    description: "Maintain and manage IT systems and infrastructure for optimal performance.",
    requiredSkills: "Linux, Windows Server, Networking, Troubleshooting",
    salary: "$55,000 - $85,000",
    location: "Cupertino, CA",
    company: "Apple Inc.",
    type: "Full-time",
    category: "IT",
    posted: "4 days ago",
    lastUpdated: "Last updated 4 days ago",
    applyLink: "https://example.com/apply/systems-administrator",
  },
  {
    id: 14,
    title: "Business Analyst",
    description: "Analyze business requirements and translate them into technical specifications.",
    requiredSkills: "Data Analysis, SQL, Communication, Documentation",
    salary: "$60,000 - $90,000",
    location: "Menlo Park, CA",
    company: "Meta Platforms Inc.",
    type: "Full-time",
    category: "Business",
    posted: "6 days ago",
    lastUpdated: "Last updated 6 days ago",
    applyLink: "https://example.com/apply/business-analyst",
  },
  {
    id: 15,
    title: "Content Writer",
    description: "Create compelling content for various digital channels.",
    requiredSkills: "Writing, SEO, Research, Creativity",
    salary: "$35,000 - $55,000",
    location: "Redmond, WA",
    company: "Microsoft Corporation",
    type: "Part-time",
    category: "Content",
    posted: "3 days ago",
    lastUpdated: "Last updated 3 days ago",
    applyLink: "https://example.com/apply/content-writer",
  },
  {
    id: 16,
    title: "HR Specialist",
    description: "Manage HR operations, recruitment, and employee relations.",
    requiredSkills: "Communication, Recruitment, Employee Engagement, HRIS",
    salary: "$45,000 - $70,000",
    location: "Santa Clara, CA",
    company: "NVIDIA Corporation",
    type: "Full-time",
    category: "Human Resources",
    posted: "2 days ago",
    lastUpdated: "Last updated 2 days ago",
    applyLink: "https://example.com/apply/hr-specialist",
  }
];

const JobListings = () => {
  // State for filters and search
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [savedJobs, setSavedJobs] = useState([]);
  
  // State for pagination
  const [page, setPage] = useState(1);
  const jobsPerPage = 6;
  
  // State for filtered jobs
  const [filteredJobs, setFilteredJobs] = useState(jobPosts);
  const [loading, setLoading] = useState(false);
  
  // Unique values for filters
  const locations = [...new Set(jobPosts.map(job => job.location))];
  const categories = [...new Set(jobPosts.map(job => job.category))];
  const types = [...new Set(jobPosts.map(job => job.type))];

  // Filter jobs based on search and filters
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call delay
    const timeoutId = setTimeout(() => {
      let result = [...jobPosts];
      
      // Apply search filter
      if (searchTerm) {
        result = result.filter(job => 
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.requiredSkills.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      // Apply location filter
      if (locationFilter) {
        result = result.filter(job => job.location === locationFilter);
      }
      
      // Apply category filter
      if (categoryFilter) {
        result = result.filter(job => job.category === categoryFilter);
      }
      
      // Apply type filter
      if (typeFilter) {
        result = result.filter(job => job.type === typeFilter);
      }
      
      // Apply sorting
      if (sortBy === 'recent') {
        result.sort((a, b) => a.id - b.id); // Assuming lower IDs are more recent
      } else if (sortBy === 'salary-high') {
        result.sort((a, b) => {
          const aAvg = parseFloat(a.salary.replace(/[^0-9.]/g, '').split('-').map(Number).reduce((a, b) => a + b, 0) / 2);
          const bAvg = parseFloat(b.salary.replace(/[^0-9.]/g, '').split('-').map(Number).reduce((a, b) => a + b, 0) / 2);
          return bAvg - aAvg;
        });
      } else if (sortBy === 'salary-low') {
        result.sort((a, b) => {
          const aAvg = parseFloat(a.salary.replace(/[^0-9.]/g, '').split('-').map(Number).reduce((a, b) => a + b, 0) / 2);
          const bAvg = parseFloat(b.salary.replace(/[^0-9.]/g, '').split('-').map(Number).reduce((a, b) => a + b, 0) / 2);
          return aAvg - bAvg;
        });
      } else if (sortBy === 'title-asc') {
        result.sort((a, b) => a.title.localeCompare(b.title));
      }
      
      setFilteredJobs(result);
      setLoading(false);
      setPage(1); // Reset to first page when filters change
    }, 500); // 500ms delay to simulate API call
    
    return () => clearTimeout(timeoutId);
  }, [searchTerm, locationFilter, categoryFilter, typeFilter, sortBy]);

  // Handle pagination change
  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle job saved status
  const handleSaveJob = (jobId) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter(id => id !== jobId));
    } else {
      setSavedJobs([...savedJobs, jobId]);
    }
  };

  // Calculate current jobs for pagination
  const indexOfLastJob = page * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  return (
    <Box sx={{ bgcolor: 'rgb(238, 237, 235)', py: 4, minHeight: '100vh' }}>
      <Container maxWidth="lg">
        {/* Page Header */}
        <Typography variant="h4" component="h1" fontWeight="bold" sx={{ mb: 1 }}>
          Browse Job Listings
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Find the perfect opportunity from our curated list of top job openings
        </Typography>
        
        {/* Search and Filter Section */}
        <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
            
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel id="location-filter-label">Location</InputLabel>
                <Select
                  labelId="location-filter-label"
                  id="location-filter"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">
                      <LocationOn color="primary" />
                    </InputAdornment>
                  }
                  label="Location"
                  sx={{
                    '.MuiOutlinedInput-notchedOutline': {
                      borderColor: locationFilter ? '#eda45f' : undefined,
                    }
                  }}
                >
                  <MenuItem value="">All Locations</MenuItem>
                  {locations.map((location) => (
                    <MenuItem key={location} value={location}>{location}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel id="category-filter-label">Category</InputLabel>
                <Select
                  labelId="category-filter-label"
                  id="category-filter"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">
                      <Work color="primary" />
                    </InputAdornment>
                  }
                  label="Category"
                  sx={{
                    '.MuiOutlinedInput-notchedOutline': {
                      borderColor: categoryFilter ? '#eda45f' : undefined,
                    }
                  }}
                >
                  <MenuItem value="">All Categories</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>{category}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth>
                <InputLabel id="type-filter-label">Job Type</InputLabel>
                <Select
                  labelId="type-filter-label"
                  id="type-filter"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  label="Job Type"
                  sx={{
                    '.MuiOutlinedInput-notchedOutline': {
                      borderColor: typeFilter ? '#eda45f' : undefined,
                    }
                  }}
                >
                  <MenuItem value="">All Types</MenuItem>
                  {types.map((type) => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel id="sort-by-label">Sort By</InputLabel>
                <Select
                  labelId="sort-by-label"
                  id="sort-by"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">
                      <Sort color="primary" />
                    </InputAdornment>
                  }
                  label="Sort By"
                >
                  <MenuItem value="recent">Most Recent</MenuItem>
                  <MenuItem value="salary-high">Highest Salary</MenuItem>
                  <MenuItem value="salary-low">Lowest Salary</MenuItem>
                  <MenuItem value="title-asc">Title (A-Z)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={8}>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {searchTerm && (
                  <Chip 
                    label={`Search: ${searchTerm}`} 
                    onDelete={() => setSearchTerm('')}
                    sx={{ bgcolor: 'rgba(237, 164, 95, 0.1)', color: '#eda45f' }}
                  />
                )}
                {locationFilter && (
                  <Chip 
                    label={`Location: ${locationFilter}`} 
                    onDelete={() => setLocationFilter('')}
                    sx={{ bgcolor: 'rgba(237, 164, 95, 0.1)', color: '#eda45f' }}
                  />
                )}
                {categoryFilter && (
                  <Chip 
                    label={`Category: ${categoryFilter}`} 
                    onDelete={() => setCategoryFilter('')}
                    sx={{ bgcolor: 'rgba(237, 164, 95, 0.1)', color: '#eda45f' }}
                  />
                )}
                {typeFilter && (
                  <Chip 
                    label={`Type: ${typeFilter}`} 
                    onDelete={() => setTypeFilter('')}
                    sx={{ bgcolor: 'rgba(237, 164, 95, 0.1)', color: '#eda45f' }}
                  />
                )}
                {(searchTerm || locationFilter || categoryFilter || typeFilter) && (
                  <Chip 
                    label="Clear All Filters" 
                    onDelete={() => {
                      setSearchTerm('');
                      setLocationFilter('');
                      setCategoryFilter('');
                      setTypeFilter('');
                    }}
                    sx={{ bgcolor: 'rgba(237, 164, 95, 0.8)', color: 'white' }}
                  />
                )}
              </Box>
            </Grid>
          </Grid>
        </Paper>
        
        {/* Results Info */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Showing {filteredJobs.length > 0 ? indexOfFirstJob + 1 : 0}-
            {Math.min(indexOfLastJob, filteredJobs.length)} of {filteredJobs.length} jobs
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Page {page} of {Math.ceil(filteredJobs.length / jobsPerPage)}
          </Typography>
        </Box>
        
        {/* Job Listings */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
            <CircularProgress sx={{ color: '#eda45f' }} />
          </Box>
        ) : filteredJobs.length === 0 ? (
          <Paper 
            elevation={0} 
            sx={{ 
              p: 4, 
              textAlign: 'center', 
              borderRadius: 2,
              mb: 4
            }}
          >
            <Typography variant="h6" gutterBottom>
              No jobs found matching your criteria
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Try adjusting your filters or search terms
            </Typography>
            <Button 
              variant="contained" 
              onClick={() => {
                setSearchTerm('');
                setLocationFilter('');
                setCategoryFilter('');
                setTypeFilter('');
              }}
              sx={{ 
                bgcolor: '#eda45f',
                '&:hover': {
                  bgcolor: '#d69149',
                }
              }}
            >
              Clear All Filters
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {currentJobs.map((job) => (
              <Grid item xs={12} key={job.id}>
                <Card 
                  sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', md: 'row' },
                    p: 0,
                    borderRadius: 2,
                    overflow: 'hidden',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <Box 
                    sx={{ 
                      bgcolor: '#eda45f',
                      color: 'white',
                      p: 2,
                      width: { xs: '100%', md: '40px' },
                      display: 'flex',
                      flexDirection: { xs: 'row', md: 'column' },
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <Button 
                      sx={{ 
                        minWidth: 'auto', 
                        p: 0,
                        color: 'white',
                        '&:hover': {
                          bgcolor: 'transparent',
                        }
                      }}
                      onClick={() => handleSaveJob(job.id)}
                    >
                      {savedJobs.includes(job.id) ? (
                        <Bookmark sx={{ fontSize: 28 }} />
                      ) : (
                        <BookmarkBorder sx={{ fontSize: 28 }} />
                      )}
                    </Button>
                    <Divider 
                      orientation="horizontal" 
                      sx={{ 
                        bgcolor: 'rgba(255,255,255,0.3)',
                        my: 1,
                        display: { xs: 'none', md: 'block' },
                        width: '100%'
                      }} 
                    />
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        writingMode: { xs: 'horizontal-tb', md: 'vertical-rl' },
                        transform: { xs: 'none', md: 'rotate(180deg)' },
                        textAlign: 'center',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {job.posted}
                    </Typography>
                  </Box>
                  
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={8}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                          <Box sx={{ mb: 1 }}>
                            <Typography variant="h5" component="h2" fontWeight="bold">
                              {job.title}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                              {job.company} • {job.location}
                            </Typography>
                          </Box>
                          
                          <Typography variant="body2" paragraph>
                            {job.description}
                          </Typography>
                          
                          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                            Required Skills:
                          </Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                            {job.requiredSkills.split(', ').map((skill, index) => (
                              <Chip 
                                key={index} 
                                label={skill} 
                                size="small"
                                sx={{ 
                                  bgcolor: 'rgba(237, 164, 95, 0.1)', 
                                  color: '#666',
                                  borderRadius: 1
                                }}
                              />
                            ))}
                          </Box>
                          
                          <Typography variant="caption" color="text.secondary" sx={{ mt: 'auto' }}>
                            {job.lastUpdated}
                          </Typography>
                        </Box>
                      </Grid>
                      
                      <Grid item xs={12} md={4}>
                        <Box 
                          sx={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            justifyContent: 'space-between',
                            height: '100%',
                            borderLeft: { xs: 'none', md: '1px solid #eee' },
                            pl: { xs: 0, md: 2 }
                          }}
                        >
                          <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                              <AttachMoney sx={{ color: '#eda45f', mr: 1 }} />
                              <Typography variant="h6" component="p" fontWeight="bold">
                                {job.salary}
                              </Typography>
                            </Box>
                            
                            <Chip 
                              label={job.type} 
                              sx={{ 
                                bgcolor: 
                                  job.type === 'Full-time' ? 'rgba(25, 118, 210, 0.1)' : 
                                  job.type === 'Part-time' ? 'rgba(156, 39, 176, 0.1)' : 
                                  job.type === 'Contract' ? 'rgba(255, 152, 0, 0.1)' : 
                                  'rgba(76, 175, 80, 0.1)',
                                color: 
                                  job.type === 'Full-time' ? '#1976d2' : 
                                  job.type === 'Part-time' ? '#9c27b0' : 
                                  job.type === 'Contract' ? '#ff9800' : 
                                  '#4caf50',
                                mb: 2
                              }} 
                            />
                            
                            <Chip 
                              label={job.category} 
                              sx={{ 
                                bgcolor: 'rgba(237, 164, 95, 0.1)', 
                                color: '#eda45f'
                              }} 
                            />
                          </Box>
                          
                          <CardActions sx={{ px: 0, pb: 0, pt: 2 }}>
                            <Button 
                              fullWidth 
                              variant="contained" 
                              href={job.applyLink} 
                              target="_blank"
                              sx={{ 
                                bgcolor: '#eda45f',
                                '&:hover': {
                                  bgcolor: '#d69149',
                                }
                              }}
                            >
                              Apply Now
                            </Button>
                          </CardActions>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
        
        {/* Pagination */}
        {filteredJobs.length > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 2 }}>
            <Pagination 
              count={Math.ceil(filteredJobs.length / jobsPerPage)} 
              page={page} 
              onChange={handlePageChange} 
              color="primary"
              sx={{
                '.MuiPaginationItem-root.Mui-selected': {
                  bgcolor: '#eda45f !important',
                  color: 'white'
                }
              }}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default JobListings;