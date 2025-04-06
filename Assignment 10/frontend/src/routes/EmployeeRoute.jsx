import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const EmployeeRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector(state => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user.type !== 'employee') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default EmployeeRoute;