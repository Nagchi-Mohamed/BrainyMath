import React, { useState } from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  Box, 
  TextField, 
  Button, 
  Avatar, 
  Grid,
  Divider,
  Alert,
  CircularProgress
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Profile = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: currentUser?.displayName || '',
    email: currentUser?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Validate form
    if (!formData.name.trim()) {
      return setError('Name cannot be empty');
    }
    
    setLoading(true);
    try {
      await axios.put('/api/user/profile', {
        displayName: formData.name
      });
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
      console.error('Error updating profile:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Validate password form
    if (!formData.currentPassword) {
      return setError('Current password is required');
    }
    
    if (formData.newPassword.length < 6) {
      return setError('New password must be at least 6 characters');
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      return setError('New passwords do not match');
    }
    
    setLoading(true);
    try {
      await axios.put('/api/user/password', {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setSuccess('Password updated successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update password');
      console.error('Error updating password:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };
  
  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 2, mb: 4 }}>
        My Profile
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <Avatar 
              sx={{ 
                width: 120, 
                height: 120, 
                fontSize: 48, 
                mx: 'auto',
                bgcolor: 'primary.main'
              }}
            >
              {getInitials(formData.name)}
            </Avatar>
            
            <Typography variant="h5" sx={{ mt: 2 }}>
              {formData.name}
            </Typography>
            
            <Typography variant="body2" color="text.secondary">
              {formData.email}
            </Typography>
            
            <Box sx={{ mt: 3 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Member since
              </Typography>
              <Typography variant="body1">
                {new Date().toLocaleDateString()}
              </Typography>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3 }}>
            {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}
            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
            
            {/* Profile Update Form */}
            <Typography variant="h6" gutterBottom>
              Edit Profile
            </Typography>
            
            <Box component="form" onSubmit={handleUpdateProfile} sx={{ mt: 2 }}>
              <TextField 
                fullWidth
                margin="normal"
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={loading}
              />
              <TextField 
                fullWidth
                margin="normal"
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                disabled={true}
                helperText="Email cannot be changed"
              />
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                disabled={loading}
                sx={{ mt: 2 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Update Profile'}
              </Button>
            </Box>
            
            <Divider sx={{ my: 4 }} />
            
            {/* Password Change Form */}
            <Typography variant="h6" gutterBottom>
              Change Password
            </Typography>
            
            <Box component="form" onSubmit={handleChangePassword} sx={{ mt: 2 }}>
              <TextField 
                fullWidth
                margin="normal"
                label="Current Password"
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                disabled={loading}
              />
              <TextField 
                fullWidth
                margin="normal"
                label="New Password"
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                disabled={loading}
              />
              <TextField 
                fullWidth
                margin="normal"
                label="Confirm New Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={loading}
              />
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                disabled={loading}
                sx={{ mt: 2 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Change Password'}
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile; 