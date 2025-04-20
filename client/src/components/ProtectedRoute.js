// frontend/src/components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const ProtectedRoute = ({ adminOnly = false }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !user.isAdmin) {
    // Logged in but not admin
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
