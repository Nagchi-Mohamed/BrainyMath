import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Loader from '../components/Loader';
import Message from '../components/Message';
import QuizListItem from '../components/games/QuizListItem';
import { useAuth } from '../context/AuthContext';

const GamesPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await api.get('/quizzes');
        setQuizzes(data);
      } catch (err) {
        setError('Failed to load quizzes.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Educational Games
      </Typography>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message severity="error">{error}</Message>
      ) : (
        <Grid container spacing={4}>
          {quizzes.map((quiz) => (
            <Grid item key={quiz._id} xs={12} sm={6} md={4}>
              <QuizListItem quiz={quiz} />
            </Grid>
          ))}
        </Grid>
      )}

      {user?.isAdmin && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/games/create-quiz')}
          >
            Create New Quiz
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default GamesPage;