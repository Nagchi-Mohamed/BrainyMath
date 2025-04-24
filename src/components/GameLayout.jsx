import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/auth';
import { trackFeatureUsage } from '../lib/analytics';

/**
 * GameLayout - A reusable component for consistent game UI
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - The game content
 * @param {string} props.title - Game title
 * @param {number} props.score - Current score
 * @param {number} props.timeLeft - Time remaining (in seconds)
 * @param {boolean} props.gameActive - Whether game is currently active
 * @param {boolean} props.gameOver - Whether game is over
 * @param {Function} props.onStartGame - Function to start game
 * @param {Function} props.onExitGame - Function to exit game (optional)
 */
const GameLayout = ({
  children,
  title,
  score = 0,
  timeLeft = 0,
  gameActive = false,
  gameOver = false,
  onStartGame,
  onExitGame
}) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleExit = () => {
    if (onExitGame) {
      onExitGame();
    } else {
      trackFeatureUsage('game', 'exit', { title });
      navigate('/dashboard');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="game-layout">
      <div className="game-header">
        <h2 className="game-title">{title}</h2>
        <div className="game-metrics">
          <div className="score-display">Score: {score}</div>
          {timeLeft > 0 && (
            <div className="timer-display">
              Time: {formatTime(timeLeft)}
            </div>
          )}
        </div>
      </div>

      <div className="game-content">
        {!gameActive && !gameOver && (
          <div className="game-start-screen">
            <h3>Ready to play?</h3>
            <p>Test your math skills and see how high you can score!</p>
            {currentUser ? (
              <button onClick={onStartGame} className="btn btn-primary">
                Start Game
              </button>
            ) : (
              <div className="login-prompt">
                <p>Sign in to track your progress and compete on the leaderboard!</p>
                <div className="btn-group">
                  <button onClick={() => navigate('/login')} className="btn btn-secondary">
                    Sign In
                  </button>
                  <button onClick={onStartGame} className="btn btn-primary">
                    Play as Guest
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Game content passed as children */}
        {(gameActive || gameOver) && children}

        {gameOver && (
          <div className="game-over-screen">
            <h3>Game Over!</h3>
            <p className="final-score">Your score: {score}</p>
            
            <div className="game-over-actions">
              <button onClick={onStartGame} className="btn btn-primary">
                Play Again
              </button>
              <button onClick={handleExit} className="btn btn-secondary">
                Back to Dashboard
              </button>
            </div>

            {currentUser && score > 0 && (
              <div className="score-saved-message">
                <p>Your score has been saved!</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="game-footer">
        {gameActive && (
          <button onClick={handleExit} className="btn btn-text">
            Exit Game
          </button>
        )}
      </div>
    </div>
  );
};

export default GameLayout; 