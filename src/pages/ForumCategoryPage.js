import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemText, Button, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

const ForumCategoryPage = () => {
  const { categoryId } = useParams();
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const { data } = await axios.get(`/api/forums/categories/${categoryId}/threads`);
        setThreads(data);
        toast.success('Threads loaded successfully!');
      } catch (err) {
        setError('Failed to load threads.');
        toast.error('Error loading threads.');
      } finally {
        setLoading(false);
      }
    };

    fetchThreads();
  }, [categoryId]);

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
        Forum Threads
      </Typography>
      {threads.length === 0 ? (
        <Typography variant="body1">No threads available in this category.</Typography>
      ) : (
        <List>
          {threads.map((thread) => (
            <ListItem key={thread._id} component={Link} to={`/forums/threads/${thread._id}`} button>
              <ListItemText primary={thread.title} secondary={`Posted by: ${thread.user.name}`} />
            </ListItem>
          ))}
        </List>
      )}
      <Button variant="contained" color="primary" component={Link} to="/forums">
        Back to Categories
      </Button>
    </Box>
  );
};

export default ForumCategoryPage;