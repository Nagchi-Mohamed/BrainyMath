import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLessons } from '../context/LessonsContext';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../hooks/useTranslation';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { FaArrowLeft } from 'react-icons/fa';
import { lessonService } from '../services/lessonService';
import {
  Container,
  LessonHeader,
  LessonMeta,
  LessonContent,
  ContentSection,
  PracticeProblem,
  QuestionText,
  AnswerInput,
  SubmitButton,
  FeedbackMessage,
  TipBox
} from '../components/LessonDetail/styles';

// Styled components
const LessonContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 2rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const LessonTitle = styled.h1`
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: ${props => props.theme.colors.border};
  border-radius: 4px;
  margin-bottom: 2rem;
  
  .progress {
    height: 100%;
    background: ${props => props.theme.colors.primary};
    border-radius: 4px;
    transition: width 0.3s ease;
  }
`;

const ExampleBox = styled.div`
  background: ${props => props.theme.colors.background};
  border-left: 4px solid ${props => props.theme.colors.primary};
  padding: 1rem;
  margin: 1rem 0;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  font-size: 1.2rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${props => props.theme.colors.error};
`;

const RetryButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  margin-top: 1rem;
  
  &:hover {
    opacity: 0.9;
  }
`;

const LessonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { getLessonById, loading, error } = useLessons();
  const { token } = useAuth();
  const [lesson, setLesson] = useState(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [showTip, setShowTip] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lessonError, setLessonError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchLesson = async () => {
      if (!token) {
        toast.error('Please log in to view lessons');
        navigate('/login');
        return;
      }

      if (!id || id === 'undefined') {
        setLessonError('Invalid lesson ID');
        setIsLoading(false);
        navigate('/lessons');
        return;
      }

      try {
        setIsLoading(true);
        setLessonError(null);
        const lessonData = await getLessonById(id);
        
        if (!lessonData) {
          setLessonError('Lesson not found');
          setIsLoading(false);
          return;
        }
        
        setLesson(lessonData);
      } catch (error) {
        setLessonError(error.message || 'Failed to load lesson');
        toast.error(error.message || 'Failed to load lesson');
      } finally {
        setIsLoading(false);
      }
    };

    // Only fetch if we have a valid ID
    if (id && id !== 'undefined') {
      fetchLesson();
    } else {
      setIsLoading(false);
      setLessonError('Invalid lesson ID');
    }
  }, [id, token, getLessonById, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userAnswer.trim()) {
      toast.error('Please enter an answer');
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await lessonService.submitAnswer(id, userAnswer);
      setFeedback(result);
      setUserAnswer('');
      if (!result.isCorrect) {
        setShowTip(true);
      }
    } catch (err) {
      toast.error(err.message || 'Failed to submit answer');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || loading) {
    return <LoadingContainer>{t('common.loading')}</LoadingContainer>;
  }

  if (lessonError || error) {
    return (
      <ErrorContainer>
        <p>{lessonError || error}</p>
        <RetryButton onClick={() => navigate('/lessons')}>
          {t('common.backToLessons')}
        </RetryButton>
      </ErrorContainer>
    );
  }

  if (!lesson) {
    return (
      <ErrorContainer>
        <p>{t('errors.lessonNotFound')}</p>
        <RetryButton onClick={() => navigate('/lessons')}>
          {t('common.backToLessons')}
        </RetryButton>
      </ErrorContainer>
    );
  }

  const currentSectionData = lesson.sections?.[currentSection];

  return (
    <LessonContainer>
      <BackButton onClick={() => navigate('/lessons')}>
        <FaArrowLeft /> {t('common.back')}
      </BackButton>

      <LessonHeader>
        <LessonTitle>{lesson.title}</LessonTitle>
        <LessonMeta>
          <span>{t('lessons.difficulty.' + lesson.difficulty)}</span>
          <span>{lesson.duration} {t('common.minutes')}</span>
        </LessonMeta>
        <ProgressBar>
          <div 
            className="progress" 
            style={{ width: `${lesson.progress || 0}%` }}
          />
        </ProgressBar>
      </LessonHeader>

      <LessonContent>
        <ContentSection>
          <h2>{t('lessons.content')}</h2>
          <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
          
          {lesson.example && (
            <ExampleBox>
              <h3>{t('lessons.example')}</h3>
              <div dangerouslySetInnerHTML={{ __html: lesson.example }} />
            </ExampleBox>
          )}
        </ContentSection>

        {lesson.practice && (
          <PracticeProblem>
            <h3>{t('lessons.practice')}</h3>
            <div dangerouslySetInnerHTML={{ __html: lesson.practice }} />
            <form onSubmit={handleSubmit}>
              <AnswerInput
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder={t('lessons.enterAnswer')}
                disabled={isSubmitting}
              />
              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : t('common.submit')}
              </SubmitButton>
            </form>
            {feedback && (
              <FeedbackMessage isCorrect={feedback.isCorrect}>
                {feedback.message}
              </FeedbackMessage>
            )}
            {showTip && lesson.hint && (
              <TipBox>
                {lesson.hint}
              </TipBox>
            )}
          </PracticeProblem>
        )}
      </LessonContent>
    </LessonContainer>
  );
};

export default LessonDetail; 