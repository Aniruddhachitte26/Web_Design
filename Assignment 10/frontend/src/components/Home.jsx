import React from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Paper,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Divider,
  useTheme,
  useMediaQuery,
  Chip,
} from "@mui/material";
import {
  Work,
  Business,
  TrendingUp,
  Search,
  LocationOn,
  ArrowForward,
  People,
  SupportAgent,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Featured services
  const services = [
    {
      title: "Job Listings",
      description:
        "Thousands of curated job opportunities from top employers in various industries.",
      icon: <Work fontSize="large" />,
    },
    {
      title: "Company Profiles",
      description:
        "Detailed information about potential employers to help you make informed decisions.",
      icon: <Business fontSize="large" />,
    },
    {
      title: "Career Growth",
      description:
        "Resources and tools to help you advance your career and achieve your professional goals.",
      icon: <TrendingUp fontSize="large" />,
    },
    {
      title: "Customer Support",
      description:
        "24/7 support from our dedicated team to assist you with any questions or issues.",
      icon: <SupportAgent fontSize="large" />,
    },
  ];

  // Company statistics
  const stats = [
    { value: "15,000+", label: "Active Job Listings" },
    { value: "5,000+", label: "Partner Companies" },
    { value: "1M+", label: "Registered Job Seekers" },
    { value: "500K+", label: "Success Stories" },
  ];

  // Company features
  const features = [
    {
      title: "For Job Seekers",
      description:
        "Discover opportunities that match your skills and career goals. Apply with ease and track your applications all in one place.",
      image: "/images/job-seekers.jpg",
      points: [
        "Easy job search with advanced filters",
        "One-click applications",
        "Resume builder and profile optimization",
        "Job alerts and recommendations",
      ],
    },
    {
      title: "For Employers",
      description:
        "Find the right talent for your organization. Post jobs, review applications, and connect with qualified candidates efficiently.",
      image: "/images/employers.jpg",
      points: [
        "Post unlimited job listings",
        "AI-powered candidate matching",
        "Applicant tracking system",
        "Analytics and reporting tools",
      ],
    },
  ];

  // Testimonials
  const testimonials = [
    {
      quote:
        "Finding my dream job was never easier. This platform connected me with opportunities I wouldn't have found elsewhere.",
      name: "Sarah Johnson",
      position: "Software Developer",
      company: "Tech Innovations",
    },
    {
      quote:
        "As a hiring manager, I've been able to find qualified candidates quickly and efficiently. The quality of applicants is outstanding.",
      name: "Michael Chen",
      position: "HR Director",
      company: "Global Solutions",
    },
    {
      quote:
        "The platform's user-friendly interface and powerful search tools helped me land a job that perfectly matches my skills and interests.",
      name: "Emma Rodriguez",
      position: "Marketing Specialist",
      company: "Creative Minds",
    },
  ];

  const handleExploreJobs = () => {
    navigate("/jobs");
  };

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "rgb(238, 237, 235)",
        minHeight: "100vh",
        pt: 2,
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: "#eda45f",
          py: { xs: 6, md: 10 },
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ p: { xs: 2, md: 4 } }}>
                <Typography
                  variant="h2"
                  component="h1"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    fontSize: { xs: "2.5rem", md: "3.5rem" },
                  }}
                >
                  Connecting Talent with Opportunity
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    mb: 4,
                    fontWeight: 400,
                    opacity: 0.9,
                  }}
                >
                  Our platform helps job seekers find their dream positions and
                  employers discover perfect candidates.
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleExploreJobs}
                    sx={{
                      px: 4,
                      py: 1.5,
                      bgcolor: "white",
                      color: "#eda45f",
                      fontWeight: "bold",
                      "&:hover": {
                        bgcolor: "rgba(255, 255, 255, 0.9)",
                      },
                    }}
                  >
                    Browse Jobs
                  </Button>

                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate("/company-showcase")}
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderColor: "white",
                      color: "white",
                      "&:hover": {
                        borderColor: "white",
                        bgcolor: "rgba(255, 255, 255, 0.1)",
                      },
                    }}
                  >
                    Explore Companies
                  </Button>
                </Box>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              sx={{ display: { xs: "none", md: "block" } }}
            >

            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Search Box */}
      <Container maxWidth="lg" sx={{ mt: -4, position: "relative", zIndex: 2 }}>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 2,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexGrow: 1,
              width: { xs: "100%", md: "auto" },
            }}
          >
            <Search sx={{ color: "#eda45f", mr: 1 }} />
            <input
              type="text"
              placeholder="Job title or keyword"
              style={{
                border: "none",
                outline: "none",
                width: "100%",
                fontSize: "1rem",
                padding: "8px",
                backgroundColor: "#f5f5f5",
                color: "#000000",
              }}
            />
          </Box>

          <Divider
            orientation={isMobile ? "horizontal" : "vertical"}
            flexItem
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexGrow: 1,
              width: { xs: "100%", md: "auto" },
            }}
          >
            <LocationOn sx={{ color: "#eda45f", mr: 1 }} />
            <input
              type="text"
              placeholder="Location"
              style={{
                border: "none",
                outline: "none",
                width: "100%",
                fontSize: "1rem",
                padding: "8px",
                backgroundColor: "#f5f5f5",
                color: "#000000",
              }}
            />
          </Box>

          <Button
            variant="contained"
            sx={{
              bgcolor: "#eda45f",
              px: 4,
              py: 1.5,
              width: { xs: "100%", md: "auto" },
              "&:hover": {
                bgcolor: "#d69149",
              },
            }}
          >
            Search
          </Button>
        </Paper>
      </Container>

      {/* Company Stats */}
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Paper
                sx={{
                  p: 3,
                  textAlign: "center",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Typography
                  variant="h3"
                  component="p"
                  sx={{
                    fontWeight: 700,
                    color: "#eda45f",
                    mb: 1,
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {stat.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Our Services */}
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Box sx={{ mb: 5, textAlign: "center" }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 700,
              mb: 1,
              color: "#333",
            }}
          >
            Our Services
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: "700px", mx: "auto" }}
          >
            We provide comprehensive solutions to meet the needs of both job
            seekers and employers
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                sx={{
                  p: 4,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 10px 20px rgba(47, 0, 0, 0.1)",
                  },
                }}
              >
                <Box
                  sx={{
                    color: "#eda45f",
                    mb: 2,
                  }}
                >
                  {service.icon}
                </Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  {service.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {service.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Box sx={{ mb: 5, textAlign: "center" }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 700,
              mb: 1,
              color: "#333",
            }}
          >
            Why Choose Us
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: "700px", mx: "auto" }}
          >
            Our platform offers specialized features for both job seekers and
            employers
          </Typography>
        </Box>

        {features.map((feature, index) => (
          <Paper
            key={index}
            sx={{
              mb: 4,
              overflow: "hidden",
              borderRadius: 2,
            }}
          >
            <Grid container>
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  order: { xs: 2, md: index % 2 === 0 ? 2 : 1 },
                }}
              >
                <Box
                  sx={{
                    p: 4,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{ mb: 2, fontWeight: 600, color: "#eda45f" }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3 }}>
                    {feature.description}
                  </Typography>
                  <Box>
                    {feature.points.map((point, i) => (
                      <Box
                        key={i}
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        <Box
                          sx={{
                            borderRadius: "50%",
                            width: 20,
                            height: 20,
                            bgcolor: "rgb(255, 255, 255)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mr: 2,
                          }}
                        >
                          <Box
                            sx={{
                              borderRadius: "50%",
                              width: 8,
                              height: 8,
                              bgcolor: "#eda45f",
                            }}
                          />
                        </Box>
                        <Typography variant="body2">{point}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  order: { xs: 1, md: index % 2 === 0 ? 1 : 2 },
                  bgcolor: "rgba(237, 164, 95, 0.05)",
                }}
              >

              </Grid>
            </Grid>
          </Paper>
        ))}
      </Container>

      {/* Testimonials */}
      <Box
        sx={{
          bgcolor: "rgba(237, 164, 95, 0.1)",
          py: 8,
          mt: 8,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ mb: 5, textAlign: "center" }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: 700,
                mb: 1,
                color: "#333",
              }}
            >
              Success Stories
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: "700px", mx: "auto" }}
            >
              Hear what our users have to say about their experience with our
              platform
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, p: 4 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        mb: 3,
                        fontStyle: "italic",
                        position: "relative",
                        "&::before": {
                          content: '"\\201C"',
                          fontSize: "4rem",
                          color: "rgba(237, 164, 95, 0.2)",
                          position: "absolute",
                          top: -20,
                          left: -10,
                          fontFamily: "serif",
                        },
                      }}
                    >
                      {testimonial.quote}
                    </Typography>
                    <Box sx={{ mt: "auto" }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.position}, {testimonial.company}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box
        sx={{
          bgcolor: "#eda45f",
          py: 6,
          color: "white",
          textAlign: "center",
          mt: 4,
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
            }}
          >
            Ready to Start Your Career Journey?
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 4,
              maxWidth: "700px",
              mx: "auto",
              opacity: 0.9,
            }}
          >
            Whether you're looking for your dream job or seeking top talent, our
            platform connects you with the best opportunities.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              variant="contained"
              size="large"
              onClick={handleExploreJobs}
              sx={{
                px: 4,
                py: 1.5,
                bgcolor: "white",
                color: "#eda45f",
                fontWeight: "bold",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.9)",
                },
              }}
            >
              Find Jobs
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/company-showcase")}

              sx={{
                px: 4,
                py: 1.5,
                borderColor: "white",
                color: "white",
                "&:hover": {
                  borderColor: "white",
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              For Employers
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
