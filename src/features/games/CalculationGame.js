import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// This will be implemented later
const useScore = () => {
  const [score, setScore] = useState(0);
  const incrementScore = (points = 1) => setScore(prev => prev + points);
  return { score, incrementScore };
};

// Placeholder for the analytics tracking function
const trackProgress = (gameType, isCorrect) => {
  console.log(`Tracking progress: ${gameType}, correct: ${isCorrect}`);
  // In a real implementation, this would send data to your analytics service
};

export default function CalculationGame() {
  const [problem, setProblem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds game
  const [gameActive, setGameActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const { score, incrementScore } = useScore();
  const navigate = useNavigate();
  
  // Adaptive difficulty based on performance
  const difficultyLevel = Math.min(10, Math.floor(score / 5) + 1);

  const generateProblem = useCallback(() => {
    // Enhanced problem generation with difficulty scaling
    const operations = ['+', '-', '*'];
    const op = operations[Math.floor(Math.random() * operations.length)];
    
    let a, b;
    if (op === '*') {
      a = Math.floor(Math.random() * difficultyLevel) + 1;
      b = Math.floor(Math.random() * difficultyLevel) + 1;
    } else if (op === '+') {
      a = Math.floor(Math.random() * difficultyLevel * 10);
      b = Math.floor(Math.random() * difficultyLevel * 5);
    } else { // subtraction
      a = Math.floor(Math.random() * difficultyLevel * 10);
      b = Math.floor(Math.random() * a); // Ensure b is smaller than a for easier problems
    }
    
    let answer;
    switch(op) {
      case '+': answer = a + b; break;
      case '-': answer = a - b; break;
      case '*': answer = a * b; break;
      default: answer = 0;
    }
    
    return { a, b, op, answer };
  }, [difficultyLevel]);

  useEffect(() => {
    if (gameActive && !gameOver) {
      setProblem(generateProblem());
    }
  }, [gameActive, gameOver, generateProblem]);

  useEffect(() => {
    let timer;
    if (gameActive && !gameOver) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setGameOver(true);
            setGameActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameActive, gameOver]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setGameActive(true);
    setGameOver(false);
    setFeedback(null);
    setProblem(generateProblem());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!gameActive || gameOver) return;

    const isCorrect = parseInt(userAnswer) === problem.answer;
    
    if (isCorrect) {
      incrementScore();
      setFeedback({ type: 'success', message: 'Correct!' });
      trackProgress('calculation', true);
    } else {
      setFeedback({
        type: 'error',
        message: `Incorrect. The answer was ${problem.answer}`,
        explanation: getMathExplanation(problem)
      });
      trackProgress('calculation', false);
    }
    
    setUserAnswer('');
    setTimeout(() => {
      setProblem(generateProblem());
      setFeedback(null);
    }, 1500);
  };

  const getMathExplanation = (problem) => {
    switch(problem.op) {
      case '+':
        return `${problem.a} + ${problem.b} = ${problem.answer}`;
      case '-':
        return `${problem.a} - ${problem.b} = ${problem.answer}`;
      case '*':
        return `${problem.a} × ${problem.b} = ${problem.answer}`;
      default:
        return '';
    }
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <h2>Math Challenge</h2>
        <div className="game-stats">
          <div className="score">Score: {score}</div>
          <div className="time">Time: {timeLeft}s</div>
        </div>
      </div>

      {!gameActive && !gameOver && (
        <div className="game-start">
          <h3>Ready to test your math skills?</h3>
          <p>Solve as many problems as you can in 60 seconds!</p>
          <button onClick={startGame} className="btn btn-primary">
            Start Game
          </button>
        </div>
      )}

      {gameActive && problem && (
        <div className="game-play">
          <div className="problem">
            <span className="problem-text">
              {problem.a} {problem.op} {problem.b} = ?
            </span>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Your answer"
              autoFocus
              className="answer-input"
            />
            <button type="submit" className="btn btn-submit">
              Submit
            </button>
          </form>

          {feedback && (
            <div className={`feedback feedback-${feedback.type}`}>
              <p>{feedback.message}</p>
              {feedback.explanation && <p>{feedback.explanation}</p>}
            </div>
          )}
        </div>
      )}

      {gameOver && (
        <div className="game-over">
          <h3>Game Over!</h3>
          <p>Your final score: {score}</p>
          <button onClick={startGame} className="btn btn-primary">
            Play Again
          </button>
          <button onClick={() => navigate('/dashboard')} className="btn btn-secondary">
            Back to Dashboard
          </button>
        </div>
      )}
    </div>
  );
} 