import React from 'react';
import styled from 'styled-components';

const GamesContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 2rem;
`;

const Message = styled.p`
  font-size: 1.2rem;
  color: #666;
  text-align: center;
  margin-top: 2rem;
`;

function Games() {
  return (
    <GamesContainer>
      <Title>Educational Games</Title>
      <Message>Coming soon! Interactive math games will be available here.</Message>
    </GamesContainer>
  );
}

export default Games; 