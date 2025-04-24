import React from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const NotFound = () => {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 5, mt: 8, textAlign: 'center' }}>
        <ErrorOutlineIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h3" component="h1" gutterBottom>
          404 - Page Not Found
        </Typography>
        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', mb: 4 }}>
          Oops! The page you're looking for doesn't exist or has been moved.
        </Typography>
        <Box sx={{ '& > *': { mx: 1 } }}>
          <Button
            component={Link}
            to="/"
            variant="contained"
            color="primary"
            size="large"
          >
            Go to Dashboard
          </Button>
          <Button
            component={Link}
            to="/games/addition"
            variant="outlined"
            size="large"
          >
            Play a Game
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default NotFound; 