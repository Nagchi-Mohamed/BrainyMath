import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 124px);
  padding: 2rem;
  text-align: center;
  background-color: ${props => props.theme.colors.background};
`;

const NotFoundTitle = styled.h1`
  font-size: 6rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
  animation: fadeIn 0.5s ease-out;
`;

const NotFoundSubtitle = styled.h2`
  font-size: 2rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 2rem;
  animation: fadeIn 0.7s ease-out;
`;

const NotFoundText = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.textLight};
  margin-bottom: 2rem;
  max-width: 600px;
  animation: fadeIn 0.9s ease-out;
`;

const HomeButton = styled(Link)`
  display: inline-block;
  padding: 0.75rem 2rem;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border-radius: ${props => props.theme.borderRadius.full};
  font-weight: 500;
  transition: all 0.3s ease;
  animation: fadeIn 1.1s ease-out;

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <NotFoundContainer>
      <NotFoundTitle>404</NotFoundTitle>
      <NotFoundSubtitle>Page Not Found</NotFoundSubtitle>
      <NotFoundText>
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </NotFoundText>
      <HomeButton to="/">Return to Home</HomeButton>
    </NotFoundContainer>
  );
};

export default NotFound; 