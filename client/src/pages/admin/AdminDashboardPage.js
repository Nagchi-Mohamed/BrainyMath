import React from 'react';
import { Container, Typography, Button, List, ListItem } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const AdminDashboardPage = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography variant="body1" gutterBottom>
        Welcome to the administrative section. Use the links below to manage users and lessons.
      </Typography>
      <List>
        <ListItem>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/admin/users"
          >
            Manage Users
          </Button>
        </ListItem>
        <ListItem>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/admin/lessons"
          >
            Manage Lessons
          </Button>
        </ListItem>
      </List>
    </Container>
  );
};

export default AdminDashboardPage;
