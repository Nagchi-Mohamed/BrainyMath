import React, { useState } from 'react';
import { Box, Grid, TextField, Select, MenuItem, InputLabel, FormControl, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const AdminLessonForm = ({ initialData = {}, onSubmit, isSubmitting, submitButtonText }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [content, setContent] = useState(initialData.content || '');
  const [category, setCategory] = useState(initialData.category || '');
  const [difficulty, setDifficulty] = useState(initialData.difficulty || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { title, description, content, category, difficulty };
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={3}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            multiline
            rows={6}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="Algebra">Algebra</MenuItem>
              <MenuItem value="Geometry">Geometry</MenuItem>
              <MenuItem value="Calculus">Calculus</MenuItem>
              <MenuItem value="Statistics">Statistics</MenuItem>
              <MenuItem value="General">General</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl component="fieldset" required>
            <RadioGroup
              row
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <FormControlLabel value="Beginner" control={<Radio />} label="Beginner" />
              <FormControlLabel value="Intermediate" control={<Radio />} label="Intermediate" />
              <FormControlLabel value="Advanced" control={<Radio />} label="Advanced" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            {submitButtonText}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminLessonForm;