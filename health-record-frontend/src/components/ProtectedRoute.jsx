import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner'; // Create this

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, token, loading } = useAuth();
  const location = useLocation();

  // Show loading while checking auth
  if (loading) {
    return <LoadingSpinner />;
  }

  // No token - redirect to login
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role
  const userRole = user?.role?.toLowerCase() || user?.role;
  const isAllowed = allowedRoles.length === 0 || allowedRoles.some(role => 
    role.toLowerCase() === userRole
  );

  if (!isAllowed) {
    // Redirect based on role
    if (userRole === 'doctor') {
      return <Navigate to="/doctor-dashboard" replace />;
    } else if (userRole === 'facility') {
      return <Navigate to="/facility-dashboard" replace />;
    } else {
      return <Navigate to="/patient-dashboard" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;