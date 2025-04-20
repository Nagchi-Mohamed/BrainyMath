import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { useAuth } from '../context/AuthContext';

const DashboardContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const DashboardHeader = styled.div`
  margin-bottom: 2rem;
`;

const DashboardTitle = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
`;

const DashboardSubtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textLight};
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const DashboardCard = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
`;

const CardDescription = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 1.5rem;
`;

const CardButton = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary}dd;
  }
`;

const Dashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  
  return (
    <DashboardContainer>
      <DashboardHeader>
        <DashboardTitle>{t('dashboard.welcome', { name: user?.name || t('dashboard.student') })}</DashboardTitle>
        <DashboardSubtitle>{t('dashboard.subtitle')}</DashboardSubtitle>
      </DashboardHeader>
      
      <DashboardGrid>
        <DashboardCard>
          <CardTitle>{t('dashboard.continueLearning')}</CardTitle>
          <CardDescription>
            {t('dashboard.continueLearningDesc')}
          </CardDescription>
          <CardButton to="/lessons">{t('dashboard.goToLessons')}</CardButton>
        </DashboardCard>
        
        <DashboardCard>
          <CardTitle>{t('dashboard.playGames')}</CardTitle>
          <CardDescription>
            {t('dashboard.playGamesDesc')}
          </CardDescription>
          <CardButton to="/games">{t('dashboard.playGames')}</CardButton>
        </DashboardCard>
        
        <DashboardCard>
          <CardTitle>{t('groups.title')}</CardTitle>
          <CardDescription>
            {t('groups.description')}
          </CardDescription>
          <CardButton to="/groups">{t('groups.viewGroups')}</CardButton>
        </DashboardCard>
        
        <DashboardCard>
          <CardTitle>{t('forum.title')}</CardTitle>
          <CardDescription>
            {t('forum.description')}
          </CardDescription>
          <CardButton to="/forum">{t('forum.goToForum')}</CardButton>
        </DashboardCard>
      </DashboardGrid>
    </DashboardContainer>
  );
};

export default Dashboard; 