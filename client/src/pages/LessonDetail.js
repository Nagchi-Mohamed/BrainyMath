import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLessons } from '../context/LessonsContext';
import { toast } from 'react-toastify';

const LessonDetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl};
`;

const Header = styled.div`
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const Title = styled.h1`
  font-size: ${props => props.theme.typography.fontSizes.xxl};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Meta = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSizes.sm};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Image = styled.div`
  width: 100%;
  height: 400px;
  background-color: ${props => props.theme.colors.primary};
  background-image: ${props => props.image ? `url(${props.image})` : 'none'};
  background-size: cover;
  background-position: center;
  border-radius: ${props => props.theme.borderRadius.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${props => props.theme.spacing.xl};
`;

const MainContent = styled.div`
  background-color: ${props => props.theme.colors.surface};
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.sm};
`;

const Description = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSizes.md};
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const Card = styled.div`
  background-color: ${props => props.theme.colors.surface};
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.sm};
`;

const CardTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSizes.lg};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Button = styled.button`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.fontSizes.md};
  cursor: pointer;
  transition: background-color ${props => props.theme.transitions.default};

  &:hover {
    background-color: ${props => props.theme.colors.info};
  }

  &:disabled {
    background-color: ${props => props.theme.colors.textSecondary};
    cursor: not-allowed;
  }
`;

const LoadingMessage = styled.p`
  text-align: center;
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSizes.lg};
`;

const ErrorMessage = styled.p`
  text-align: center;
  color: ${props => props.theme.colors.error};
  font-size: ${props => props.theme.typography.fontSizes.lg};
`;

function LessonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchLesson } = useLessons();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLesson = async () => {
      if (!id) {
        setError('No lesson ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await fetchLesson(id);
        if (!data) {
          setError('Lesson not found');
          return;
        }
        setLesson(data);
      } catch (err) {
        setError(err.message || 'Failed to load lesson');
        toast.error('Failed to load lesson');
      } finally {
        setLoading(false);
      }
    };

    loadLesson();
  }, [id, fetchLesson]);

  const handleStartLesson = () => {
    // TODO: Implement lesson start logic
    toast.success('Starting lesson...');
    navigate(`/lessons/${id}/practice`);
  };

  if (loading) {
    return <LoadingMessage>Loading lesson...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (!lesson) {
    return <ErrorMessage>Lesson not found</ErrorMessage>;
  }

  return (
    <LessonDetailContainer>
      <Header>
        <Title>{lesson.title}</Title>
        <Meta>
          <span>Level: {lesson.level}</span>
          <span>Duration: {lesson.duration} min</span>
          <span>Last Updated: {new Date(lesson.updatedAt).toLocaleDateString()}</span>
        </Meta>
      </Header>

      <Image image={lesson.image} />

      <Content>
        <MainContent>
          <Description>{lesson.description}</Description>
          {/* TODO: Add lesson content sections */}
        </MainContent>

        <Sidebar>
          <Card>
            <CardTitle>Lesson Progress</CardTitle>
            {/* TODO: Add progress tracking */}
          </Card>

          <Card>
            <CardTitle>Resources</CardTitle>
            {/* TODO: Add downloadable resources */}
          </Card>

          <Button onClick={handleStartLesson}>
            Start Lesson
          </Button>
        </Sidebar>
      </Content>
    </LessonDetailContainer>
  );
}

export default LessonDetail; 