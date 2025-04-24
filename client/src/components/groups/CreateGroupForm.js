import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import api from '../../services/api';
import Message from '../Message';

const CreateGroupForm = ({ onGroupCreated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) {
      setError('Both name and description are required.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await api.post('/groups', { name, description });
      setName('');
      setDescription('');
      onGroupCreated(); // Refresh the group list in the parent component
    } catch (err) {
      setError('Failed to create group.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      {error && <Message severity="error">{error}</Message>}
      <TextField
        label="Group Name"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={loading}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Group Description"
        multiline
        rows={4}
        fullWidth
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={loading}
        sx={{ mb: 2 }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
      >
        {loading ? 'Creating...' : 'Create Group'}
      </Button>
    </Box>
  );
};

export default CreateGroupForm;
