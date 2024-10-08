// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthProvider';

const ProtectedRoute = ({ element }) => {
  const { currentUser } = React.useContext(AuthContext);
  return currentUser ? element : <Navigate to="/signin" />;
};

export default ProtectedRoute;
