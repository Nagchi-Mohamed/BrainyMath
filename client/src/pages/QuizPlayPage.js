import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Loader from '../components/Loader';
import Message from '../components/Message';
import QuestionDisplay from '../components/games/QuestionDisplay';

const QuizPlayPage = () => {
  const { quizId } = useParams();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [score, setScore] = useState(null);
  const [possibleScore, setPossibleScore] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await api.get(`/quizzes/${quizId}/questions`);
        setQuestions(data);
      } catch (err) {
        setError('Failed to load quiz questions.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [quizId]);

  const handleAnswerSelect = (optionIndex) => {
    setUserAnswers({ ...userAnswers, [currentQuestionIndex]: optionIndex });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleFinishQuiz();
    }
  };

  const handleFinishQuiz = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const { data } = await api.post(`/quizzes/${quizId}/submit`, { answers: userAnswers });
      setScore(data.score);
      setPossibleScore(data.possibleScore);
      setIsFinished(true);

      // Record progress after successful quiz submission
      try {
        await api.post('/progress', {
          itemId: quizId,
          itemType: 'Quiz',
          status: 'Completed',
          score: data.score,
          possibleScore: data.possibleScore,
        });
      } catch (progressError) {
        console.error('Failed to record progress:', progressError);
      }
    } catch (err) {
      setSubmitError('Failed to submit quiz. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <Loader />;
  if (error) return <Message severity="error">{error}</Message>;

  return (
    <Container>
      {isFinished ? (
        <Typography variant="h4" component="h1" gutterBottom>
          You scored {score} out of {possibleScore}!
        </Typography>
      ) : (
        <>
          <QuestionDisplay
            question={questions[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            selectedAnswer={userAnswers[currentQuestionIndex]}
            onAnswerSelect={handleAnswerSelect}
          />
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNextQuestion}
              disabled={isSubmitting}
            >
              {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </Button>
          </Box>
          {isSubmitting && <Loader />}
          {submitError && <Message severity="error">{submitError}</Message>}
        </>
      )}
    </Container>
  );
};

export default QuizPlayPage;