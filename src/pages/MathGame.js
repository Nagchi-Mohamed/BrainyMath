import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const ProblemCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  width: 100%;
  text-align: center;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1.2rem;
  border: 2px solid #3498db;
  border-radius: 5px;
  margin: 1rem 0;
  width: 200px;
`;

const Button = styled.button`
  background-color: #2ecc71;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1.1rem;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px;

  &:hover {
    background-color: #27ae60;
  }
`;

const Score = styled.div`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const MathGame = () => {
  const [score, setScore] = useState(0);
  const [problem, setProblem] = useState({});
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  const generateProblem = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operators = ['+', '-', '*'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    
    let correctAnswer;
    switch(operator) {
      case '+':
        correctAnswer = num1 + num2;
        break;
      case '-':
        correctAnswer = num1 - num2;
        break;
      case '*':
        correctAnswer = num1 * num2;
        break;
      default:
        correctAnswer = num1 + num2;
    }

    setProblem({
      num1,
      num2,
      operator,
      correctAnswer
    });
    setAnswer('');
    setFeedback('');
  };

  useEffect(() => {
    generateProblem();
  }, []);

  const checkAnswer = () => {
    const userAnswer = parseInt(answer);
    if (userAnswer === problem.correctAnswer) {
      setScore(score + 1);
      setFeedback('Correct! Well done! 🎉');
    } else {
      setFeedback(`Sorry, the correct answer was ${problem.correctAnswer}`);
    }
    setTimeout(generateProblem, 2000);
  };

  return (
    <GameContainer>
      <Score>Score: {score}</Score>
      <ProblemCard>
        <h2>Solve the problem:</h2>
        <h3>{problem.num1} {problem.operator} {problem.num2} = ?</h3>
        <Input
          type="number"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Enter your answer"
        />
        <Button onClick={checkAnswer}>Submit</Button>
        {feedback && <p>{feedback}</p>}
      </ProblemCard>
      <Button onClick={generateProblem}>New Problem</Button>
    </GameContainer>
  );
};

export default MathGame; 