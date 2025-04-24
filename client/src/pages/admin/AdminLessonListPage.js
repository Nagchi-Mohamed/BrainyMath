import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import api from '../../services/api';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const AdminLessonListPage = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLessons = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await api.get('/api/lessons');
        setLessons(data);
      } catch (err) {
        setError('Failed to load lessons.');
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this lesson?')) {
      try {
        await api.delete(`/api/lessons/${id}`);
        setLessons(lessons.filter((lesson) => lesson._id !== id));
      } catch (err) {
        setError('Failed to delete lesson.');
      }
    }
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 200 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'difficulty', headerName: 'Difficulty', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to={`/admin/lessons/${params.row._id}/edit`}
            sx={{ marginRight: 1 }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDelete(params.row._id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Manage Lessons
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={RouterLink}
        to="/admin/lessons/new"
        sx={{ marginBottom: 2 }}
      >
        Create New Lesson
      </Button>
      {loading && <Loader />}
      {error && <Message severity="error">{error}</Message>}
      {lessons.length === 0 && !loading && !error && (
        <Typography variant="body1" color="textSecondary" align="center" sx={{ marginTop: 2 }}>
          No lessons found. Click the 'Create New Lesson' button to add one.
        </Typography>
      )}
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={lessons}
          columns={columns}
          getRowId={(row) => row._id}
          loading={loading} // Pass loading state directly to DataGrid
        />
      </div>
    </Container>
  );
};

export default AdminLessonListPage;
