import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const ProtectedRoute = ({ children }) => {
  const { user } = useApp();
  const location = useLocation();

  if (!user) {
    // Redirect unauthenticated visitors to login page
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
