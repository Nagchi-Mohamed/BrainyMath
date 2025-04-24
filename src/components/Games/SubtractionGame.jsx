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
import { saveGame } from '../../lib/api';

const SubtractionGame = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds per game
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [questionStartTime, setQuestionStartTime] = useState(null);
  const [gameHistory, setGameHistory] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  // Calculate difficulty level based on score
  const calculateDifficulty = () => {
    if (score < 5) return 'EASY';
    if (score < 10) return 'MEDIUM';
    return 'HARD';
  };
  
  // Generate a new question based on difficulty
  const generateQuestion = () => {
    // Adjust max number based on score for adaptive difficulty
    const difficulty = calculateDifficulty();
    let max = 20; // Default for EASY
    
    if (difficulty === 'MEDIUM') {
      max = 50;
    } else if (difficulty === 'HARD') {
      max = 100;
    }
    
    // Ensure num1 >= num2 so the answer is always non-negative
    const num1 = Math.floor(Math.random() * max) + Math.floor(max / 2);
    const num2 = Math.floor(Math.random() * num1);
    
    setCurrentQuestion({ 
      num1, 
      num2, 
      correctAnswer: num1 - num2,
      difficulty
    });
    setQuestionStartTime(Date.now());
    setAnswer('');
    setFeedback(null);
    setTotalQuestions(prev => prev + 1);
  };
  
  // Start the game
  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setGameOver(false);
    setGameStarted(true);
    setStartTime(Date.now());
    setGameHistory([]);
    setTotalQuestions(0);
    setMistakes(0);
    generateQuestion();
  };
  
  // Handle answer submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!answer.trim()) return;
    
    const userAnswer = parseInt(answer);
    const isCorrect = userAnswer === currentQuestion.correctAnswer;
    const timeTaken = Math.round((Date.now() - questionStartTime) / 1000);
    
    // Add question to game history
    setGameHistory(prev => [...prev, {
      question: `${currentQuestion.num1} - ${currentQuestion.num2} = ${currentQuestion.correctAnswer}`,
      userAnswer,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect,
      timeTaken,
      difficulty: currentQuestion.difficulty
    }]);
    
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
      setFeedback({ correct: true, message: 'Correct! Great job!' });
    } else {
      setFeedback({ 
        correct: false, 
        message: `Incorrect. ${currentQuestion.num1} - ${currentQuestion.num2} = ${currentQuestion.correctAnswer}` 
      });
      setMistakes(prev => prev + 1);
    }
    
    // Generate a new question after a short delay
    setTimeout(() => {
      generateQuestion();
    }, 1500);
  };
  
  // Save game results
  const saveGameResults = async () => {
    if (!currentUser) return;
    
    const totalTimePlayed = Math.round((Date.now() - startTime) / 1000);
    
    setLoading(true);
    try {
      const gameData = {
        gameType: 'SUBTRACTION',
        score,
        timeSpent: totalTimePlayed,
        mistakes,
        correctAnswers: score,
        totalQuestions,
        difficulty: calculateDifficulty(),
        details: {
          questions: gameHistory
        }
      };
      
      await saveGame(gameData);
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
          Subtraction Challenge
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        {!gameStarted && !gameOver && (
          <Box sx={{ textAlign: 'center', my: 4 }}>
            <Typography variant="h6" gutterBottom>
              Test your subtraction skills!
            </Typography>
            <Typography variant="body1" paragraph>
              Solve as many subtraction problems as you can in 60 seconds.
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
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Difficulty: {currentQuestion?.difficulty}
              </Typography>
              <Typography variant="h3" gutterBottom>
                {currentQuestion?.num1} - {currentQuestion?.num2} = ?
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
            
            <Box sx={{ mb: 4 }}>
              <Typography variant="body1">
                Questions Answered: {totalQuestions}
              </Typography>
              <Typography variant="body1">
                Mistakes: {mistakes}
              </Typography>
              <Typography variant="body1">
                Accuracy: {totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0}%
              </Typography>
            </Box>
            
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
                  onClick={() => navigate('/history')}
                  sx={{ mr: 2 }}
                >
                  View History
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

export default SubtractionGame; 