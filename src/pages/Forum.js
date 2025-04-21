import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemText, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

const ForumsPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('/api/forums/categories');
        setCategories(data);
        toast.success('Categories loaded successfully!');
      } catch (err) {
        setError('Failed to load categories.');
        toast.error('Error loading categories.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Discussion Forums
      </Typography>
      {categories.length === 0 ? (
        <Typography variant="body1">No categories available.</Typography>
      ) : (
        <List>
          {categories.map((category) => (
            <ListItem key={category._id} component={Link} to={`/forums/categories/${category._id}`} button>
              <ListItemText primary={category.name} secondary={category.description} />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default ForumsPage;