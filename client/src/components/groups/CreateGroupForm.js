import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const CreateGroupForm = ({ onCreate, loading }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onCreate({ name, description });
      setName('');
      setDescription('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Group Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        multiline
        rows={3}
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" disabled={loading}>
        Create Group
      </Button>
    </Box>
  );
};

export default CreateGroupForm;
