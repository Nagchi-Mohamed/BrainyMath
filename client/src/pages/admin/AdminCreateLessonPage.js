import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import api from '../../services/api';
import AdminLessonForm from '../../components/admin/AdminLessonForm';
import Message from '../../components/Message';

const AdminCreateLessonPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCreateLesson = async (formData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await api.post('/api/lessons', formData);
      navigate('/admin/lessons'); // Redirect to lesson list on success
    } catch (err) {
      setError('Failed to create lesson. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Create New Lesson
      </Typography>
      {error && <Message severity="error">{error}</Message>}
      <Box mt={3}>
        <AdminLessonForm
          onSubmit={handleCreateLesson}
          isSubmitting={isSubmitting}
          submitButtonText="Create Lesson"
        />
      </Box>
    </Container>
  );
};

export default AdminCreateLessonPage;