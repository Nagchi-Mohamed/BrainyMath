// frontend/src/pages/LessonsPage.js
import React, { useEffect, useState } from 'react';
import { Typography, Grid, Card, CardContent, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import api from '../services/api';
import Loader from '../components/Loader';
import Message from '../components/Message';

const LessonsPage = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLessons = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/lessons');
        setLessons(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Lessons
      </Typography>
      {loading && <Loader />}
      {error && <Message severity="error">{error}</Message>}
      <Grid container spacing={3}>
        {lessons.map((lesson) => (
          <Grid item xs={12} sm={6} md={4} key={lesson._id}>
            <Card>
              <CardActionArea onClick={() => navigate(`/lessons/${lesson._id}`)}>
                <CardContent>
                  <Typography variant="h6">{lesson.title}</Typography>
                  <Typography variant="body2" color="textSecondary" noWrap>
                    {lesson.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default LessonsPage;
