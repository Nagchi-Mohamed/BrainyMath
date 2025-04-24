import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Container, 
  CircularProgress,
  Alert,
  Stack,
  LinearProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const MultiplicationGame = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds per game
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  // Generate a new question based on difficulty
  const generateQuestion = () => {
    // Adjust max number based on score for adaptive difficulty
    // For multiplication, we use smaller numbers
    const max = Math.min(12, Math.max(5, Math.floor(score / 3) + 5));
    
    const num1 = Math.floor(Math.random() * max) + 1;
    const num2 = Math.floor(Math.random() * max) + 1;
    
    setCurrentQuestion({ num1, num2, correctAnswer: num1 * num2 });
    setAnswer('');
    setFeedback(null);
  };
  
  // Start the game
  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setGameOver(false);
    setGameStarted(true);
    generateQuestion();
  };
  
  // Handle answer submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!answer.trim()) return;
    
    const userAnswer = parseInt(answer);
    const isCorrect = userAnswer === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
      setFeedback({ correct: true, message: 'Correct! Great job!' });
    } else {
      setFeedback({ 
        correct: false, 
        message: `Incorrect. ${currentQuestion.num1} × ${currentQuestion.num2} = ${currentQuestion.correctAnswer}` 
      });
    }
    
    // Generate a new question after a short delay
    setTimeout(() => {
      generateQuestion();
    }, 1500);
  };
  
  // Save game results
  const saveGameResults = async () => {
    if (!currentUser) return;
    
    setLoading(true);
    try {
      await axios.post('/api/games/save', {
        gameType: 'multiplication',
        score,
        duration: 60
      });
    } catch (err) {
      setError('Failed to save game results. Please try again.');
      console.error('Error saving game results:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Timer effect
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameOver(true);
          saveGameResults();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [gameStarted, gameOver]);
  
  // Auto-focus the input field when a new question appears
  useEffect(() => {
    if (gameStarted && !gameOver && currentQuestion) {
      const inputElement = document.getElementById('answer-input');
      if (inputElement) {
        inputElement.focus();
      }
    }
  }, [currentQuestion, gameStarted, gameOver]);
  
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Multiplication Challenge
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        {!gameStarted && !gameOver && (
          <Box sx={{ textAlign: 'center', my: 4 }}>
            <Typography variant="h6" gutterBottom>
              Test your multiplication skills!
            </Typography>
            <Typography variant="body1" paragraph>
              Solve as many multiplication problems as you can in 60 seconds.
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              size="large" 
              onClick={startGame}
            >
              Start Game
            </Button>
          </Box>
        )}
        
        {gameStarted && !gameOver && (
          <>
            <Box sx={{ mb: 2 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">Score: {score}</Typography>
                <Typography variant="h6">Time: {timeLeft}s</Typography>
              </Stack>
              <LinearProgress 
                variant="determinate" 
                value={(timeLeft / 60) * 100} 
                sx={{ mt: 1, height: 10, borderRadius: 5 }}
              />
            </Box>
            
            <Box sx={{ textAlign: 'center', my: 4 }}>
              <Typography variant="h3" gutterBottom>
                {currentQuestion?.num1} × {currentQuestion?.num2} = ?
              </Typography>
              
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <TextField
                  id="answer-input"
                  type="number"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  variant="outlined"
                  sx={{ width: '120px' }}
                  inputProps={{ 
                    style: { fontSize: '24px', textAlign: 'center' },
                    inputMode: 'numeric'
                  }}
                  autoFocus
                />
                
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary"
                  size="large"
                  sx={{ ml: 2, height: '56px' }}
                >
                  Submit
                </Button>
              </Box>
              
              {feedback && (
                <Alert 
                  severity={feedback.correct ? "success" : "error"}
                  sx={{ mt: 2, width: '100%', maxWidth: '400px', mx: 'auto' }}
                >
                  {feedback.message}
                </Alert>
              )}
            </Box>
          </>
        )}
        
        {gameOver && (
          <Box sx={{ textAlign: 'center', my: 4 }}>
            <Typography variant="h5" gutterBottom>
              Game Over!
            </Typography>
            <Typography variant="h4" paragraph>
              Your Score: {score}
            </Typography>
            {loading ? (
              <CircularProgress />
            ) : (
              <>
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large" 
                  onClick={startGame}
                  sx={{ mr: 2 }}
                >
                  Play Again
                </Button>
                <Button 
                  variant="outlined"
                  onClick={() => navigate('/')}
                >
                  Back to Dashboard
                </Button>
              </>
            )}
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default MultiplicationGame; 