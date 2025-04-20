import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useLessons } from '../context/LessonsContext';

const LessonsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl};
`;

const Title = styled.h1`
  font-size: ${props => props.theme.typography.fontSizes.xxl};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.xl};
`;

const LessonCard = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  overflow: hidden;
  transition: transform ${props => props.theme.transitions.default};

  &:hover {
    transform: translateY(-4px);
  }
`;

const LessonImage = styled.div`
  height: 200px;
  background-color: ${props => props.theme.colors.primary};
  background-image: ${props => props.image ? `url(${props.image})` : 'none'};
  background-size: cover;
  background-position: center;
`;

const LessonContent = styled.div`
  padding: ${props => props.theme.spacing.lg};
`;

const LessonTitle = styled.h2`
  font-size: ${props => props.theme.typography.fontSizes.lg};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const LessonDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing.md};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const LessonMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSizes.sm};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const LessonLink = styled(Link)`
  display: inline-block;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border-radius: ${props => props.theme.borderRadius.md};
  text-decoration: none;
  transition: background-color ${props => props.theme.transitions.default};

  &:hover {
    background-color: ${props => props.theme.colors.info};
  }
`;

const LoadingMessage = styled.p`
  text-align: center;
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSizes.lg};
  grid-column: 1 / -1;
`;

const ErrorMessage = styled.p`
  text-align: center;
  color: ${props => props.theme.colors.error};
  font-size: ${props => props.theme.typography.fontSizes.lg};
  grid-column: 1 / -1;
`;

function Lessons() {
  const { lessons, loading, error } = useLessons();

  return (
    <LessonsContainer>
      <Title>Available Lessons</Title>
      <Grid>
        {loading ? (
          <LoadingMessage>Loading lessons...</LoadingMessage>
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : lessons.length > 0 ? (
          lessons.map(lesson => (
            <LessonCard key={lesson.id}>
              <LessonImage image={lesson.image} />
              <LessonContent>
                <LessonTitle>{lesson.title}</LessonTitle>
                <LessonDescription>{lesson.description}</LessonDescription>
                <LessonMeta>
                  <span>Level: {lesson.level}</span>
                  <span>Duration: {lesson.duration} min</span>
                </LessonMeta>
                <LessonLink to={`/lessons/${lesson.id}`}>
                  Start Lesson
                </LessonLink>
              </LessonContent>
            </LessonCard>
          ))
        ) : (
          <LoadingMessage>No lessons available yet.</LoadingMessage>
        )}
      </Grid>
    </LessonsContainer>
  );
}

export default Lessons; 