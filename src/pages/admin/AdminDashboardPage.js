import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const AdminDashboardPage = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Box>
        <Button component={Link} to="/admin/users" variant="contained" color="primary" style={{ marginRight: '10px' }}>
          Manage Users
        </Button>
        <Button component={Link} to="/admin/lessons" variant="contained" color="primary">
          Manage Lessons
        </Button>
      </Box>
    </Box>
  );
};

export default AdminDashboardPage;