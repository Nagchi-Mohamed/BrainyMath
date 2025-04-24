import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Message from '../components/Message';

const CreateThreadPage = () => {
  const { categoryId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError('Both title and content are required.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post(`/forums/categories/${categoryId}/threads`, {
        title,
        content,
      });
      navigate(`/forums/threads/${data._id}`); // Redirect to the new thread's page
    } catch (err) {
      setError('Failed to create thread.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Create New Thread
      </Typography>

      {error && <Message severity="error">{error}</Message>}

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          label="Thread Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Thread Content"
          multiline
          rows={6}
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
          {loading ? 'Creating...' : 'Create Thread'}
        </Button>
      </Box>
    </Container>
  );
};

export default CreateThreadPage;