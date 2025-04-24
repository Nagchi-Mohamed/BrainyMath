import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import api from '../../services/api';
import Message from '../Message';

const CreatePostForm = ({ threadId, onPostCreated }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      setError('Post content cannot be empty.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await api.post(`/forums/threads/${threadId}/posts`, { content });
      setContent('');
      onPostCreated(); // Refresh posts in parent component
    } catch (err) {
      setError('Failed to create post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      {error && <Message severity="error">{error}</Message>}
      <TextField
        label="Write a reply"
        multiline
        rows={4}
        fullWidth
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={loading}
        sx={{ mb: 2 }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
      >
        {loading ? 'Posting...' : 'Post Reply'}
      </Button>
    </Box>
  );
};

export default CreatePostForm;
