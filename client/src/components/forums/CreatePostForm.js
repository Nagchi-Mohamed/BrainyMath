import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const CreatePostForm = ({ onSubmit, loading }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content);
      setContent('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ marginTop: 2 }}>
      <TextField
        label="Write your post"
        multiline
        rows={4}
        fullWidth
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={loading}
        required
      />
      <Button type="submit" variant="contained" sx={{ marginTop: 1 }} disabled={loading}>
        Post
      </Button>
    </Box>
  );
};

export default CreatePostForm;
