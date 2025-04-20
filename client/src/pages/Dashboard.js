import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { useLessons } from '../context/LessonsContext';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl};
`;

const WelcomeSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.xxl};
`;

const Title = styled.h1`
  font-size: ${props => props.theme.typography.fontSizes.xxl};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Subtitle = styled.p`
  font-size: ${props => props.theme.typography.fontSizes.lg};
  color: ${props => props.theme.colors.textSecondary};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.xl};
`;

const Card = styled.div`
  padding: ${props => props.theme.spacing.lg};
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.sm};
`;

const CardTitle = styled.h2`
  font-size: ${props => props.theme.typography.fontSizes.lg};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const CardContent = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const CardLink = styled(Link)`
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
`;

function Dashboard() {
  const { user } = useAuth();
  const { lessons, loading } = useLessons();

  return (
    <DashboardContainer>
      <WelcomeSection>
        <Title>Welcome, {user?.name || 'Student'}!</Title>
        <Subtitle>Here's your learning dashboard</Subtitle>
      </WelcomeSection>

      <Grid>
        <Card>
          <CardTitle>Recent Lessons</CardTitle>
          <CardContent>
            {loading ? (
              <LoadingMessage>Loading lessons...</LoadingMessage>
            ) : lessons.length > 0 ? (
              <ul>
                {lessons.slice(0, 3).map(lesson => (
                  <li key={lesson.id}>{lesson.title}</li>
                ))}
              </ul>
            ) : (
              <p>No lessons available yet.</p>
            )}
          </CardContent>
          <CardLink to="/lessons">View All Lessons</CardLink>
        </Card>

        <Card>
          <CardTitle>Practice Games</CardTitle>
          <CardContent>
            <p>Challenge yourself with interactive math games and quizzes.</p>
          </CardContent>
          <CardLink to="/games">Play Games</CardLink>
        </Card>

        <Card>
          <CardTitle>Study Groups</CardTitle>
          <CardContent>
            <p>Join study groups and collaborate with other students.</p>
          </CardContent>
          <CardLink to="/groups">View Groups</CardLink>
        </Card>

        <Card>
          <CardTitle>Forum</CardTitle>
          <CardContent>
            <p>Ask questions and participate in discussions with the community.</p>
          </CardContent>
          <CardLink to="/forum">Visit Forum</CardLink>
        </Card>
      </Grid>
    </DashboardContainer>
  );
}

export default Dashboard; 