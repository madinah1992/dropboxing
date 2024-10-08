// src/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './contexts/AuthProvider';  // Assuming you have an AuthProvider that provides authentication

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default ProtectedRoute;
