import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../components/Home.jsx';
import About from '../components/About.jsx';
import JobListings from '../components/JobListings.jsx';
import CompanyShowcase from '../components/CompanyShowcase.jsx';
import Contact from '../components/Contact.jsx';
import Login from '../components/Login.jsx';

// Protected route wrapper component
const ProtectedRoute = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AppRoutes = ({ isAuthenticated, user, onLoginSuccess }) => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      
      {/* Protected routes */}
      <Route 
        path="/jobs" 
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <JobListings />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/companies" 
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <CompanyShowcase />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/contact" 
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Contact />
          </ProtectedRoute>
        } 
      />
      
      {/* Login route - redirects to home if already logged in */}
      <Route 
        path="/login" 
        element={
          isAuthenticated ? 
            <Navigate to="/" replace /> : 
            <Login onLoginSuccess={onLoginSuccess} />
        } 
      />
      
      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;