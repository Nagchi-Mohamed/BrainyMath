import { useState, useEffect } from 'react';
import { useAuth } from '../features/auth/auth';

/**
 * Custom hook for managing game scores
 * Handles score state, persistence, and high score tracking
 */
export const useScore = (gameType) => {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const { currentUser } = useAuth();

  // Load high score from localStorage on mount
  useEffect(() => {
    if (!gameType) return;
    
    const storedHighScore = localStorage.getItem(`highScore_${gameType}`);
    if (storedHighScore) {
      setHighScore(parseInt(storedHighScore, 10));
    }
  }, [gameType]);

  // Check for new high score when score changes
  useEffect(() => {
    if (score > highScore && gameType) {
      setHighScore(score);
      localStorage.setItem(`highScore_${gameType}`, score.toString());
      
      // If user is logged in, save high score to backend
      if (currentUser) {
        saveHighScoreToServer(gameType, score);
      }
    }
  }, [score, highScore, gameType, currentUser]);

  const incrementScore = (points = 1) => {
    setScore(prevScore => prevScore + points);
  };

  const resetScore = () => {
    setScore(0);
  };

  // Function to save high score to server (to be implemented)
  const saveHighScoreToServer = async (gameType, score) => {
    try {
      // This would be implemented to call your API
      console.log(`Saving high score: ${score} for ${gameType}`);
      
      // Example API call (to be implemented)
      /*
      const response = await fetch('/api/scores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await currentUser.getIdToken()}`
        },
        body: JSON.stringify({
          gameType,
          score,
          timestamp: new Date().toISOString()
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to save score');
      }
      */
    } catch (error) {
      console.error('Error saving high score:', error);
    }
  };

  return {
    score,
    highScore,
    incrementScore,
    resetScore,
    setScore
  };
};

export default useScore; 