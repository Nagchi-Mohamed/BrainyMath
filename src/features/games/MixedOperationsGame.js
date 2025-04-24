import { useState, useEffect, useCallback } from 'react';
import GameLayout from '../../components/GameLayout';
import { useScore } from '../../hooks/useScore';
import { trackProgress } from '../../lib/analytics';

export default function MixedOperationsGame() {
  const [problem, setProblem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [timeLeft, setTimeLeft] = useState(90); // 90 seconds game (longer for mixed)
  const [gameActive, setGameActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const { score, incrementScore, resetScore } = useScore('mixed');
  
  // Adaptive difficulty based on performance
  const difficultyLevel = Math.min(10, Math.floor(score / 3) + 1);

  const generateProblem = useCallback(() => {
    // Randomly select operation type
    const operations = ['+', '-', '*', '÷'];
    const op = operations[Math.floor(Math.random() * operations.length)];
    
    let a, b, answer;
    
    switch(op) {
      case '+':
        a = Math.floor(Math.random() * difficultyLevel * 10);
        b = Math.floor(Math.random() * difficultyLevel * 5);
        answer = a + b;
        break;
      case '-':
        a = Math.floor(Math.random() * difficultyLevel * 10) + 5;
        b = Math.floor(Math.random() * a); // Make sure b is smaller than a
        answer = a - b;
        break;
      case '*':
        a = Math.floor(Math.random() * difficultyLevel) + 1;
        b = Math.floor(Math.random() * difficultyLevel) + 1;
        answer = a * b;
        break;
      case '÷':
        b = Math.floor(Math.random() * difficultyLevel) + 1;
        answer = Math.floor(Math.random() * difficultyLevel) + 1;
        a = b * answer; // Ensures a clean division
        break;
      default:
        a = 0;
        b = 0;
        answer = 0;
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
    resetScore();
    setTimeLeft(90);
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
      trackProgress('mixed', true, { operation: problem.op });
    } else {
      setFeedback({
        type: 'error',
        message: `Incorrect. The answer was ${problem.answer}`,
        explanation: `${problem.a} ${problem.op} ${problem.b} = ${problem.answer}`
      });
      trackProgress('mixed', false, { operation: problem.op });
    }
    
    setUserAnswer('');
    setTimeout(() => {
      setProblem(generateProblem());
      setFeedback(null);
    }, 1500);
  };

  // Function to display the operator symbol properly
  const getOperatorSymbol = (op) => {
    switch(op) {
      case '+': return '+';
      case '-': return '−';
      case '*': return '×';
      case '÷': return '÷';
      default: return op;
    }
  };

  return (
    <GameLayout
      title="Mixed Operations Challenge"
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
              {problem.a} {getOperatorSymbol(problem.op)} {problem.b} = ?
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