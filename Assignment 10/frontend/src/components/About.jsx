import React from 'react';
import { Container, Typography, Box, Card, CardContent } from '@mui/material';

const About = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center" sx={{ marginBottom: 4 }}>
        {/* About Us */}
      </Typography>

      <Card sx={{ marginBottom: 4 }}>
        <CardContent>
          <Typography variant="body1" paragraph>
            Welcome to our job portal, your one-stop destination for connecting job seekers with potential employers. Our platform is designed to simplify the hiring process, making it more efficient and accessible for everyone involved. Whether you're looking for your dream job or searching for the perfect candidate, we've got you covered.
          </Typography>
          <Typography variant="body1" paragraph>
            Founded with the vision of bridging the gap between talent and opportunity, we are committed to fostering meaningful connections that drive success for individuals and organizations alike.
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ marginBottom: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Why Choose Us?
          </Typography>
          <Typography variant="body1" paragraph>
            - A comprehensive database of job listings across diverse industries and roles.<br />
            - User-friendly interface designed for seamless navigation.<br />
            - Advanced search and filtering tools to help you find exactly what you're looking for.<br />
            - Personalized recommendations based on your preferences and qualifications.<br />
            - Dedicated customer support to assist you at every step of your journey.<br />
            - Secure and reliable platform ensuring the privacy of your data.
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ marginBottom: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Our Vision
          </Typography>
          <Typography variant="body1" paragraph>
            To become the leading platform for connecting talent with opportunity, empowering individuals and organizations to achieve their goals. We aim to create a world where finding the right job or the right candidate is no longer a challenge but an opportunity to grow and succeed.
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ marginBottom: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Our Values
          </Typography>
          <Typography variant="body1" paragraph>
            - **Integrity**: We are committed to maintaining transparency and honesty in all our interactions.<br />
            - **Innovation**: Continuously improving our platform to meet the evolving needs of our users.<br />
            - **Inclusivity**: Providing equal opportunities for everyone, regardless of background or experience.<br />
            - **Excellence**: Striving to deliver the best possible experience for our users.
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ marginBottom: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Our Story
          </Typography>
          <Typography variant="body1" paragraph>
            Our journey began with a simple idea: to make the job search and hiring process easier for everyone. Over the years, we have grown into a trusted platform used by thousands of job seekers and employers worldwide. Our team is passionate about creating solutions that make a real difference in people's lives.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default About;
