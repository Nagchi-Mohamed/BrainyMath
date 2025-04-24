import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create context
const AuthContext = createContext();

// Custom hook to use auth context
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  
  // Initialize auth state on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          // Set default auth header for all requests
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Verify token and get user data
          const response = await axios.get(`${API_URL}/auth/me`);
          
          if (response.data && response.data.user) {
            setCurrentUser(response.data.user);
          }
        } catch (error) {
          console.error('Authentication error:', error);
          // Clear invalid token
          localStorage.removeItem('token');
          delete axios.defaults.headers.common['Authorization'];
        }
      }
      
      setLoading(false);
    };
    
    checkAuthStatus();
  }, [API_URL]);
  
  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });
      
      const { token, user } = response.data;
      
      // Store token in localStorage
      localStorage.setItem('token', token);
      
      // Set auth header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Set user state
      setCurrentUser(user);
      setError('');
      
      return user;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to login');
      throw error;
    }
  };
  
  // Register function
  const register = async (name, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password
      });
      
      const { token, user } = response.data;
      
      // Store token in localStorage
      localStorage.setItem('token', token);
      
      // Set auth header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Set user state
      setCurrentUser(user);
      setError('');
      
      return user;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to register');
      throw error;
    }
  };
  
  // Logout function
  const logout = async () => {
    try {
      // Clear token from localStorage
      localStorage.removeItem('token');
      
      // Remove auth header
      delete axios.defaults.headers.common['Authorization'];
      
      // Clear user state
      setCurrentUser(null);
      setError('');
      
      return true;
    } catch (error) {
      setError('Failed to logout');
      throw error;
    }
  };
  
  // Update profile function
  const updateProfile = async (userData) => {
    try {
      const response = await axios.put(`${API_URL}/users/profile`, userData);
      
      // Update user state
      setCurrentUser(response.data.user);
      setError('');
      
      return response.data.user;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update profile');
      throw error;
    }
  };
  
  // Change password function
  const changePassword = async (currentPassword, newPassword) => {
    try {
      await axios.put(`${API_URL}/users/password`, {
        currentPassword,
        newPassword
      });
      
      setError('');
      return true;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to change password');
      throw error;
    }
  };
  
  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    changePassword
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext; 