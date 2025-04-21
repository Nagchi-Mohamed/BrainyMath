import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import AdminLessonForm from '../../components/admin/AdminLessonForm';

const AdminEditLessonPage = () => {
  const { id } = useParams();
  const [lesson, setLesson] = useState({ title: '', description: '' });

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const { data } = await axios.get(`/api/admin/lessons/${id}`);
        setLesson(data);
      } catch (error) {
        console.error('Error fetching lesson:', error);
      }
    };

    fetchLesson();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLesson((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/admin/lessons/${id}`, lesson);
      alert('Lesson updated successfully');
    } catch (error) {
      console.error('Error updating lesson:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Edit Lesson
      </Typography>
      <AdminLessonForm lesson={lesson} onChange={handleChange} onSubmit={handleSubmit} />
    </Box>
  );
};

export default AdminEditLessonPage;