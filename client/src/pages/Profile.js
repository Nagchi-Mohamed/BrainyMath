import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

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

const Message = styled.div`
  color: #666;
  text-align: center;
  font-size: 1.1rem;
`;

function Profile() {
  const { user } = useAuth();

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
    </ProfileContainer>
  );
}

export default Profile; 