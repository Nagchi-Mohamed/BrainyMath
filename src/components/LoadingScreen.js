import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #4A90E2;
  animation: ${fadeIn} 0.5s ease-in;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  animation: ${pulse} 2s infinite ease-in-out;
`;

const Logo = styled.img`
  height: 60px;
  width: auto;
`;

const LogoText = styled.h1`
  color: white;
  font-size: 2rem;
  font-weight: 700;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: ${spin} 1s ease-in-out infinite;
  margin-bottom: 1.5rem;
`;

const LoadingText = styled.p`
  color: white;
  font-size: 1.2rem;
  font-weight: 500;
`;

const LoadingScreen = () => {
  return (
    <LoadingContainer>
      <LogoContainer>
        <Logo src="/images/Logo.svg" alt="BrainyMath" />
        <LogoText>BrainyMath</LogoText>
      </LogoContainer>
      <Spinner />
      <LoadingText>Loading your learning experience...</LoadingText>
    </LoadingContainer>
  );
};

export default LoadingScreen; 