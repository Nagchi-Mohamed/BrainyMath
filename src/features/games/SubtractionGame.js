import { useState, useEffect, useCallback } from 'react';
import GameLayout from '../../components/GameLayout';
import { useScore } from '../../hooks/useScore';
import { trackProgress } from '../../lib/analytics';

export default function SubtractionGame() {
  const [problem, setProblem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds game
  const [gameActive, setGameActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const { score, incrementScore, resetScore } = useScore('subtraction');
  
  // Adaptive difficulty based on performance
  const difficultyLevel = Math.min(10, Math.floor(score / 4) + 1);

  const generateProblem = useCallback(() => {
    // Create a subtraction problem where the result is always positive
    const a = Math.floor(Math.random() * difficultyLevel * 10) + 5;
    const b = Math.floor(Math.random() * a); // Make sure b is smaller than a
    return { a, b, answer: a - b };
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
    resetScore();
    setTimeLeft(60);
    setGameActive(true);
    setGameOver(false);
    setFeedback(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!gameActive || gameOver) return;

    const isCorrect = parseInt(userAnswer) === problem.answer;
    
    if (isCorrect) {
      incrementScore();
      setFeedback({ type: 'success', message: 'Correct!' });
      trackProgress('subtraction', true);
    } else {
      setFeedback({
        type: 'error',
        message: `Incorrect. The answer was ${problem.answer}`,
        explanation: `${problem.a} - ${problem.b} = ${problem.answer}`
      });
      trackProgress('subtraction', false);
    }
    
    setUserAnswer('');
    setTimeout(() => {
      setProblem(generateProblem());
      setFeedback(null);
    }, 1500);
  };

  return (
    <GameLayout
      title="Subtraction Challenge"
      score={score}
      timeLeft={timeLeft}
      gameActive={gameActive}
      gameOver={gameOver}
      onStartGame={startGame}
    >
      {gameActive && problem && (
        <div className="game-play">
          <div className="problem">
            <span className="problem-text">
              {problem.a} - {problem.b} = ?
            </span>
          </div>

          <form onSubmit={handleSubmit} className="game-form">
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Your answer"
              autoFocus
              className="answer-input"
            />
            <button type="submit" className="btn btn-primary">
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
    </GameLayout>
  );
} 