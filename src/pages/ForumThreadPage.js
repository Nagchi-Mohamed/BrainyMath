import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemText, TextField, Button, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

const ForumThreadPage = () => {
  const { threadId } = useParams();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(`/api/forums/threads/${threadId}/posts`);
        setPosts(data);
        toast.success('Posts loaded successfully!');
      } catch (err) {
        setError('Failed to load posts.');
        toast.error('Error loading posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [threadId]);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/forums/posts', {
        content: newPost,
        thread: threadId,
      });
      setPosts((prevPosts) => [...prevPosts, data]);
      setNewPost('');
      toast.success('Post added successfully!');
    } catch (error) {
      toast.error('Error adding post.');
    }
  };

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
        Forum Thread
      </Typography>
      {posts.length === 0 ? (
        <Typography variant="body1">No posts available in this thread.</Typography>
      ) : (
        <List>
          {posts.map((post) => (
            <ListItem key={post._id}>
              <ListItemText primary={post.content} secondary={`Posted by: ${post.user.name}`} />
            </ListItem>
          ))}
        </List>
      )}
      <form onSubmit={handlePostSubmit}>
        <TextField
          label="Add a new post"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default ForumThreadPage;