// frontend/src/pages/HomePage.js
import React from 'react';
import { Typography, Box } from '@mui/material';
import Layout from '../components/Layout';

const HomePage = () => {
  return (
    <Layout>
      <Box sx={{ textAlign: 'center', mt: 8 }}>
        <Typography variant="h3" gutterBottom>
          Welcome to BrainyMath
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Your platform for learning math with interactive lessons and games.
        </Typography>
      </Box>
    </Layout>
  );
};

export default HomePage;
