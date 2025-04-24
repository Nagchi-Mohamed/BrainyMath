import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const ProfileContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 2rem;
`;

const ProfileCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProfileField = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.div`
  font-weight: bold;
  color: #666;
  margin-bottom: 0.5rem;
`;

const Value = styled.div`
  color: #333;
  font-size: 1.1rem;
`;

function Profile() {
  const { user } = useAuth();

  const [progressData, setProgressData] = useState([]);
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [errorProgress, setErrorProgress] = useState(null);

  useEffect(() => {
    const fetchProgress = async () => {
      setLoadingProgress(true);
      setErrorProgress(null);
      try {
        const { data } = await api.get('/progress/me');
        setProgressData(data);
      } catch (error) {
        setErrorProgress('Failed to load progress data. Please try again later.');
      } finally {
        setLoadingProgress(false);
      }
    };

    fetchProgress();
  }, []);

  if (!user) {
    return (
      <ProfileContainer>
        <Title>Profile</Title>
        <ProfileCard>
          <Message>Please log in to view your profile.</Message>
        </ProfileCard>
      </ProfileContainer>
    );
  }

  return (
    <ProfileContainer>
      <Title>Profile</Title>
      <ProfileCard>
        <ProfileField>
          <Label>Username</Label>
          <Value>{user.username}</Value>
        </ProfileField>
        <ProfileField>
          <Label>Email</Label>
          <Value>{user.email}</Value>
        </ProfileField>
        <ProfileField>
          <Label>Role</Label>
          <Value>{user.role}</Value>
        </ProfileField>
      </ProfileCard>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>My Progress</Typography>
        {loadingProgress ? (
          <Loader />
        ) : errorProgress ? (
          <Message severity="error">{errorProgress}</Message>
        ) : progressData && progressData.length > 0 ? (
          <List>
            {progressData.map((item) => (
              <ListItem key={item.itemId}>
                <ListItemText
                  primary={`${item.itemType} ID: ${item.itemId}`}
                  secondary={`Status: ${item.status} ${item.score !== undefined ? `(Score: ${item.score}/${item.possibleScore})` : ''} - Completed: ${new Date(item.completedAt || item.updatedAt).toLocaleDateString()}`}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No progress recorded yet.</Typography>
        )}
      </Box>
    </ProfileContainer>
  );
}

export default Profile;