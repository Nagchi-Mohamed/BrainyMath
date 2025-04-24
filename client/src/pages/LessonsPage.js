import React, { useEffect, useState } from 'react';
import { Typography, Grid, Card, CardContent, CardActionArea, Skeleton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import api from '../services/api';
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
      {error && <Message severity="error">{error}</Message>}
      <Grid container spacing={3}>
        {loading
          ? Array.from(new Array(6)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Skeleton variant="text" height={40} />
                    <Skeleton variant="text" height={20} />
                  </CardContent>
                </Card>
              </Grid>
            ))
          : lessons.map((lesson) => (
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
