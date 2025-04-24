import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import api from '../../services/api';
import AdminLessonForm from '../../components/admin/AdminLessonForm';
import Message from '../../components/Message';
import Loader from '../../components/Loader';

const AdminEditLessonPage = () => {
  const { lessonId } = useParams();
  const [lessonData, setLessonData] = useState(null);
  const [loadingLesson, setLoadingLesson] = useState(true);
  const [errorLesson, setErrorLesson] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLesson = async () => {
      setLoadingLesson(true);
      setErrorLesson(null);
      try {
        const { data } = await api.get(`/api/lessons/${lessonId}`);
        setLessonData(data);
      } catch (err) {
        setErrorLesson('Failed to load lesson data.');
      } finally {
        setLoadingLesson(false);
      }
    };

    fetchLesson();
  }, [lessonId]);

  const handleUpdateLesson = async (formData) => {
    setIsSubmitting(true);
    setErrorUpdate(null);
    try {
      await api.put(`/api/lessons/${lessonId}`, formData);
      navigate('/admin/lessons'); // Redirect to lesson list on success
    } catch (err) {
      setErrorUpdate('Failed to update lesson. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingLesson) return <Loader />;
  if (errorLesson) return <Message severity="error">{errorLesson}</Message>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Edit Lesson
      </Typography>
      {errorUpdate && <Message severity="error">{errorUpdate}</Message>}
      {lessonData && (
        <Box mt={3}>
          <AdminLessonForm
            initialData={lessonData}
            onSubmit={handleUpdateLesson}
            isSubmitting={isSubmitting}
            submitButtonText="Update Lesson"
          />
        </Box>
      )}
    </Container>
  );
};

export default AdminEditLessonPage;