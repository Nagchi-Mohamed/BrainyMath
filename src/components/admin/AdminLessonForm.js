import React from 'react';
import PropTypes from 'prop-types';
import { Box, TextField, Button } from '@mui/material';

const AdminLessonForm = ({ lesson, onChange, onSubmit }) => {
  return (
    <Box component="form" onSubmit={onSubmit}>
      <TextField
        label="Title"
        name="title"
        value={lesson.title}
        onChange={onChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        name="description"
        value={lesson.description}
        onChange={onChange}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Save
      </Button>
    </Box>
  );
};

AdminLessonForm.propTypes = {
  lesson: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AdminLessonForm;