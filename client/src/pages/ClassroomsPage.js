import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { Grid, Button, Typography, Container } from '@mui/material';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import ClassroomListItem from '../../components/classrooms/ClassroomListItem';

const ClassroomsPage = () => {
  const { isAuthenticated } = useAuth();
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClassrooms = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await api.get('/api/classrooms');
        setClassrooms(data);
      } catch (err) {
        setError('Failed to load classrooms.');
      } finally {
        setLoading(false);
      }
    };

    fetchClassrooms();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Virtual Classrooms
      </Typography>

      {isAuthenticated && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/classrooms/create')}
          sx={{ marginBottom: 2 }}
        >
          Create New Classroom
        </Button>
      )}

      {loading && <Loader />}
      {error && <Message severity="error">{error}</Message>}

      <Grid container spacing={3}>
        {classrooms.map((classroom) => (
          <Grid item xs={12} sm={6} md={4} key={classroom._id}>
            <ClassroomListItem classroom={classroom} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ClassroomsPage;
