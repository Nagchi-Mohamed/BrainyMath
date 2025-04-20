import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl};
`;

const Hero = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xxl};
`;

const Title = styled.h1`
  font-size: ${props => props.theme.typography.fontSizes.xxl};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Subtitle = styled.p`
  font-size: ${props => props.theme.typography.fontSizes.lg};
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const Button = styled(Link)`
  display: inline-block;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: ${props => props.theme.typography.fontWeights.medium};
  transition: background-color ${props => props.theme.transitions.default};

  &:hover {
    background-color: ${props => props.theme.colors.info};
    text-decoration: none;
  }
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.xl};
  margin-top: ${props => props.theme.spacing.xxl};
`;

const Feature = styled.div`
  padding: ${props => props.theme.spacing.lg};
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.sm};
`;

const FeatureTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSizes.lg};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const FeatureText = styled.p`
  color: ${props => props.theme.colors.textSecondary};
`;

function Home() {
  const { user } = useAuth();

  return (
    <HomeContainer>
      <Hero>
        <Title>Welcome to BrainyMath</Title>
        <Subtitle>
          Your interactive platform for learning mathematics
        </Subtitle>
        {!user ? (
          <Button to="/login">Get Started</Button>
        ) : (
          <Button to="/dashboard">Go to Dashboard</Button>
        )}
      </Hero>

      <Features>
        <Feature>
          <FeatureTitle>Interactive Lessons</FeatureTitle>
          <FeatureText>
            Learn mathematics through engaging and interactive lessons designed for all skill levels.
          </FeatureText>
        </Feature>
        <Feature>
          <FeatureTitle>Practice Problems</FeatureTitle>
          <FeatureText>
            Reinforce your learning with carefully crafted practice problems and immediate feedback.
          </FeatureText>
        </Feature>
        <Feature>
          <FeatureTitle>Progress Tracking</FeatureTitle>
          <FeatureText>
            Monitor your progress and track your achievements as you learn.
          </FeatureText>
        </Feature>
      </Features>
    </HomeContainer>
  );
}

export default Home; 