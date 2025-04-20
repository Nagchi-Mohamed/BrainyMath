// frontend/src/pages/LessonDetailPage.js
import React, { useEffect, useState } from 'react';
import { Typography, Box, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import api from '../services/api';
import Loader from '../components/Loader';
import Message from '../components/Message';

const LessonDetailPage = () => {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLesson = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/lessons/${id}`);
        setLesson(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id]);

  return (
    <Layout>
      {loading && <Loader />}
      {error && <Message severity="error">{error}</Message>}
      {lesson && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            {lesson.title}
          </Typography>
          <Typography variant="subtitle1" gutterBottom color="textSecondary">
            Category: {lesson.category} | Difficulty: {lesson.difficulty}
          </Typography>
          <Paper sx={{ p: 3, mt: 2 }}>
            <Typography variant="body1" component="div" dangerouslySetInnerHTML={{ __html: lesson.content }} />
          </Paper>
        </Box>
      )}
    </Layout>
  );
};

export default LessonDetailPage;
