import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import LessonTable from '../../components/admin/LessonTable';

const AdminLessonListPage = () => {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const { data } = await axios.get('/api/admin/lessons');
        setLessons(data);
      } catch (error) {
        console.error('Error fetching lessons:', error);
      }
    };

    fetchLessons();
  }, []);

  const handleEdit = (id) => {
    window.location.href = `/admin/lessons/edit/${id}`;
  };

  const handleDelete = (id) => {
    console.log(`Delete lesson with ID: ${id}`);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Manage Lessons
      </Typography>
      <LessonTable lessons={lessons} onEdit={handleEdit} onDelete={handleDelete} />
    </Box>
  );
};

export default AdminLessonListPage;