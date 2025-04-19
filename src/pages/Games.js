import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const GamesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageTitle = styled.h1`
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
`;

const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const GameCard = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
`;

const GameImage = styled.div`
  height: 150px;
  background-color: #4a6bff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
`;

const GameContent = styled.div`
  padding: 1.5rem;
`;

const GameTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
`;

const GameDescription = styled.p`
  color: #7f8c8d;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const GameMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #ecf0f1;
`;

const GameDifficulty = styled.span`
  background-color: ${props => {
    switch(props.level) {
      case 'Easy': return '#e8f5e9';
      case 'Medium': return '#fff3e0';
      case 'Hard': return '#ffebee';
      default: return '#e0f7fa';
    }
  }};
  color: ${props => {
    switch(props.level) {
      case 'Easy': return '#43a047';
      case 'Medium': return '#f57c00';
      case 'Hard': return '#e53935';
      default: return '#00acc1';
    }
  }};
  padding: 0.25rem 0.5rem;
  border-radius: 20px;
  font-size: 0.8rem;
`;

const PlayButton = styled(Link)`
  display: inline-block;
  background-color: #4a6bff;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3a5bef;
  }
`;

const Games = () => {
  const games = [
    {
      id: 1,
      title: 'Math Quiz',
      description: 'Test your knowledge with a variety of math problems.',
      difficulty: 'Easy',
      icon: '❓',
      path: '/games/quiz'
    },
    {
      id: 2,
      title: 'Number Ninja',
      description: 'Slice through numbers to solve equations quickly.',
      difficulty: 'Medium',
      icon: '🥷',
      path: '/games/ninja'
    },
    {
      id: 3,
      title: 'Math Memory',
      description: 'Match math problems with their solutions.',
      difficulty: 'Easy',
      icon: '🧠',
      path: '/games/memory'
    },
    {
      id: 4,
      title: 'Equation Solver',
      description: 'Race against time to solve complex equations.',
      difficulty: 'Hard',
      icon: '⚡',
      path: '/games/equation'
    },
    {
      id: 5,
      title: 'Math Puzzle',
      description: 'Arrange numbers to complete mathematical patterns.',
      difficulty: 'Medium',
      icon: '🧩',
      path: '/games/puzzle'
    },
    {
      id: 6,
      title: 'Math Battle',
      description: 'Compete with friends in a math showdown.',
      difficulty: 'Hard',
      icon: '⚔️',
      path: '/games/battle'
    }
  ];

  return (
    <GamesContainer>
      <PageTitle>Math Games</PageTitle>
      <GamesGrid>
        {games.map(game => (
          <GameCard key={game.id}>
            <GameImage>{game.icon}</GameImage>
            <GameContent>
              <GameTitle>{game.title}</GameTitle>
              <GameDescription>{game.description}</GameDescription>
              <GameMeta>
                <GameDifficulty level={game.difficulty}>{game.difficulty}</GameDifficulty>
                <PlayButton to={game.path}>Play Now</PlayButton>
              </GameMeta>
            </GameContent>
          </GameCard>
        ))}
      </GamesGrid>
    </GamesContainer>
  );
};

export default Games; 