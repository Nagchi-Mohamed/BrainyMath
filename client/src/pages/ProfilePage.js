// frontend/src/pages/ProfilePage.js
import React, { useState, useContext, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import AuthContext from '../context/AuthContext';
import Layout from '../components/Layout';
import Message from '../components/Message';
import Loader from '../components/Loader';

const ProfilePage = () => {
  const { user, updateProfile, loading } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    setName(user?.name || '');
    setEmail(user?.email || '');
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (password && password !== confirmPassword) {
      setMessage({ severity: 'error', text: 'Passwords do not match' });
      return;
    }

    const profileData = { name, email };
    if (password) profileData.password = password;

    const result = await updateProfile(profileData);
    if (result.success) {
      setMessage({ severity: 'success', text: 'Profile updated successfully' });
      setPassword('');
      setConfirmPassword('');
    } else {
      setMessage({ severity: 'error', text: result.message });
    }
  };

  return (
    <Layout>
      <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        {message && <Message severity={message.severity}>{message.text}</Message>}
        {loading && <Loader />}
        <form onSubmit={submitHandler}>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="New Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            helperText="Leave blank to keep current password"
          />
          <TextField
            label="Confirm New Password"
            type="password"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Update Profile
          </Button>
        </form>
      </Box>
    </Layout>
  );
};

export default ProfilePage;
