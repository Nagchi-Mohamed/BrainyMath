import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';

const HeroSection = styled.section`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.secondary} 100%);
  color: white;
  padding: 6rem 0;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('/images/math-pattern.svg');
    background-size: cover;
    opacity: 0.1;
    z-index: 0;
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
  z-index: 1;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  animation: fadeIn 0.8s ease-out;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  animation: fadeIn 1s ease-out;
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  animation: fadeIn 1.2s ease-out;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
  }
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 0.75rem 2rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-weight: 500;
  transition: all 0.3s ease;
  text-align: center;
  
  &.primary {
    background-color: white;
    color: ${props => props.theme.colors.primary};
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }
  }
  
  &.secondary {
    background-color: transparent;
    color: white;
    border: 2px solid white;
    
    &:hover {
      background-color: white;
      color: ${props => props.theme.colors.primary};
      transform: translateY(-3px);
    }
  }
`;

const FeaturesSection = styled.section`
  padding: 5rem 0;
  background-color: ${props => props.theme.colors.background};
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: ${props => props.theme.colors.text};
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 3px;
    background-color: ${props => props.theme.colors.primary};
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const FeatureCard = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 2rem;
  box-shadow: ${props => props.theme.shadows.sm};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.primary};
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text};
`;

const FeatureDescription = styled.p`
  color: ${props => props.theme.colors.textLight};
  line-height: 1.6;
`;

const TestimonialsSection = styled.section`
  padding: 5rem 0;
  background-color: ${props => props.theme.colors.white};
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const TestimonialCard = styled.div`
  background-color: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 2rem;
  box-shadow: ${props => props.theme.shadows.sm};
  position: relative;
  
  &:before {
    content: '"';
    position: absolute;
    top: 1rem;
    left: 1rem;
    font-size: 4rem;
    color: ${props => props.theme.colors.primary};
    opacity: 0.2;
    font-family: serif;
  }
`;

const TestimonialText = styled.p`
  color: ${props => props.theme.colors.text};
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-style: italic;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const AuthorAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.span`
  font-weight: 600;
  color: ${props => props.theme.colors.text};
`;

const AuthorRole = styled.span`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textLight};
`;

const CtaSection = styled.section`
  padding: 5rem 0;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.secondary} 100%);
  color: white;
  text-align: center;
`;

const CtaTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
`;

const CtaText = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.9;
`;

const CtaButton = styled(Link)`
  display: inline-block;
  padding: 1rem 2.5rem;
  background-color: white;
  color: ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.full};
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const Home = () => {
  const { t } = useTranslation();
  
  return (
    <>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Master Mathematics with BrainyMath</HeroTitle>
          <HeroSubtitle>
            Interactive lessons, engaging games, and collaborative learning to make mathematics accessible and enjoyable for everyone.
          </HeroSubtitle>
          <HeroButtons>
            <Button to="/lessons" className="primary">Start Learning</Button>
            <Button to="/games" className="secondary">Play Games</Button>
          </HeroButtons>
        </HeroContent>
      </HeroSection>
      
      <FeaturesSection>
        <div className="container">
          <SectionTitle>Why Choose BrainyMath?</SectionTitle>
          <FeaturesGrid>
            <FeatureCard className="slide-up">
              <FeatureIcon>📚</FeatureIcon>
              <FeatureTitle>Comprehensive Lessons</FeatureTitle>
              <FeatureDescription>
                From basic arithmetic to advanced calculus, our structured lessons cover all mathematical concepts with clear explanations and examples.
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard className="slide-up" style={{ animationDelay: '0.2s' }}>
              <FeatureIcon>🎮</FeatureIcon>
              <FeatureTitle>Interactive Games</FeatureTitle>
              <FeatureDescription>
                Learn through play with our collection of math games designed to reinforce concepts and make learning fun and engaging.
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard className="slide-up" style={{ animationDelay: '0.4s' }}>
              <FeatureIcon>👥</FeatureIcon>
              <FeatureTitle>Collaborative Learning</FeatureTitle>
              <FeatureDescription>
                Join study groups, participate in forums, and connect with peers to enhance your learning experience through collaboration.
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard className="slide-up" style={{ animationDelay: '0.6s' }}>
              <FeatureIcon>📊</FeatureIcon>
              <FeatureTitle>Progress Tracking</FeatureTitle>
              <FeatureDescription>
                Monitor your progress with detailed analytics and personalized recommendations to help you achieve your learning goals.
              </FeatureDescription>
            </FeatureCard>
          </FeaturesGrid>
        </div>
      </FeaturesSection>
      
      <TestimonialsSection>
        <div className="container">
          <SectionTitle>What Our Users Say</SectionTitle>
          <TestimonialsGrid>
            <TestimonialCard className="slide-in-left">
              <TestimonialText>
                BrainyMath has completely transformed how I approach mathematics. The interactive lessons and games make learning fun and effective.
              </TestimonialText>
              <TestimonialAuthor>
                <AuthorAvatar>JD</AuthorAvatar>
                <AuthorInfo>
                  <AuthorName>John Doe</AuthorName>
                  <AuthorRole>Student</AuthorRole>
                </AuthorInfo>
              </TestimonialAuthor>
            </TestimonialCard>
            
            <TestimonialCard className="slide-in-left" style={{ animationDelay: '0.2s' }}>
              <TestimonialText>
                As a teacher, I've seen remarkable improvement in my students' understanding of math concepts since they started using BrainyMath.
              </TestimonialText>
              <TestimonialAuthor>
                <AuthorAvatar>AS</AuthorAvatar>
                <AuthorInfo>
                  <AuthorName>Alice Smith</AuthorName>
                  <AuthorRole>Mathematics Teacher</AuthorRole>
                </AuthorInfo>
              </TestimonialAuthor>
            </TestimonialCard>
            
            <TestimonialCard className="slide-in-left" style={{ animationDelay: '0.4s' }}>
              <TestimonialText>
                The collaborative features have helped me connect with other learners and get help when I'm stuck. It's like having a math tutor available 24/7.
              </TestimonialText>
              <TestimonialAuthor>
                <AuthorAvatar>RJ</AuthorAvatar>
                <AuthorInfo>
                  <AuthorName>Robert Johnson</AuthorName>
                  <AuthorRole>College Student</AuthorRole>
                </AuthorInfo>
              </TestimonialAuthor>
            </TestimonialCard>
          </TestimonialsGrid>
        </div>
      </TestimonialsSection>
      
      <CtaSection>
        <div className="container">
          <CtaTitle>Ready to Transform Your Math Learning?</CtaTitle>
          <CtaText>
            Join thousands of learners who have improved their mathematical skills with BrainyMath. Start your journey today!
          </CtaText>
          <CtaButton to="/lessons">Get Started Now</CtaButton>
        </div>
      </CtaSection>
    </>
  );
};

export default Home; 