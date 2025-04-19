import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const GroupsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageTitle = styled.h1`
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  border-bottom: 1px solid #ecf0f1;
`;

const Tab = styled.button`
  padding: 1rem 2rem;
  background: none;
  border: none;
  border-bottom: 3px solid ${props => props.active ? '#4a6bff' : 'transparent'};
  color: ${props => props.active ? '#4a6bff' : '#7f8c8d'};
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    color: #4a6bff;
  }
`;

const GroupsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const GroupCard = styled.div`
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

const GroupHeader = styled.div`
  padding: 1.5rem;
  background-color: #4a6bff;
  color: white;
`;

const GroupTitle = styled.h3`
  margin: 0 0 0.5rem 0;
`;

const GroupMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.9rem;
  opacity: 0.9;
`;

const GroupContent = styled.div`
  padding: 1.5rem;
`;

const GroupDescription = styled.p`
  color: #7f8c8d;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const GroupStats = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #ecf0f1;
  color: #7f8c8d;
  font-size: 0.9rem;
`;

const JoinButton = styled(Link)`
  display: inline-block;
  background-color: #4a6bff;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s;
  margin-top: 1rem;

  &:hover {
    background-color: #3a5bef;
  }
`;

const CreateGroupButton = styled.button`
  display: block;
  background-color: #2ecc71;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 5px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 2rem auto;

  &:hover {
    background-color: #27ae60;
  }
`;

const Groups = () => {
  const [activeTab, setActiveTab] = useState('myGroups');

  const myGroups = [
    {
      id: 1,
      title: 'Algebra Study Group',
      description: 'Weekly sessions to practice algebra concepts and solve problems together.',
      members: 8,
      level: 'Intermediate',
      nextSession: 'Tomorrow, 6:00 PM'
    },
    {
      id: 2,
      title: 'Math Competition Prep',
      description: 'Preparing for upcoming math competitions with practice problems and strategies.',
      members: 12,
      level: 'Advanced',
      nextSession: 'Friday, 4:00 PM'
    }
  ];

  const availableGroups = [
    {
      id: 3,
      title: 'Geometry Explorers',
      description: 'Learn geometry through interactive exercises and real-world applications.',
      members: 15,
      level: 'Intermediate',
      nextSession: 'Today, 7:00 PM'
    },
    {
      id: 4,
      title: 'Math for Beginners',
      description: 'A friendly group for those just starting their math learning journey.',
      members: 20,
      level: 'Beginner',
      nextSession: 'Wednesday, 5:00 PM'
    },
    {
      id: 5,
      title: 'Calculus Study Group',
      description: 'Advanced calculus concepts and problem-solving techniques.',
      members: 10,
      level: 'Advanced',
      nextSession: 'Thursday, 6:30 PM'
    }
  ];

  return (
    <GroupsContainer>
      <PageTitle>Study Groups</PageTitle>
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'myGroups'} 
          onClick={() => setActiveTab('myGroups')}
        >
          My Groups
        </Tab>
        <Tab 
          active={activeTab === 'availableGroups'} 
          onClick={() => setActiveTab('availableGroups')}
        >
          Available Groups
        </Tab>
      </TabsContainer>

      {activeTab === 'myGroups' && (
        <>
          <GroupsGrid>
            {myGroups.map(group => (
              <GroupCard key={group.id}>
                <GroupHeader>
                  <GroupTitle>{group.title}</GroupTitle>
                  <GroupMeta>
                    <span><i className="fas fa-users"></i> {group.members} members</span>
                    <span><i className="fas fa-signal"></i> {group.level}</span>
                  </GroupMeta>
                </GroupHeader>
                <GroupContent>
                  <GroupDescription>{group.description}</GroupDescription>
                  <GroupStats>
                    <span><i className="fas fa-calendar"></i> Next: {group.nextSession}</span>
                  </GroupStats>
                  <JoinButton to={`/groups/${group.id}`}>View Group</JoinButton>
                </GroupContent>
              </GroupCard>
            ))}
          </GroupsGrid>
          <CreateGroupButton>Create New Group</CreateGroupButton>
        </>
      )}

      {activeTab === 'availableGroups' && (
        <GroupsGrid>
          {availableGroups.map(group => (
            <GroupCard key={group.id}>
              <GroupHeader>
                <GroupTitle>{group.title}</GroupTitle>
                <GroupMeta>
                  <span><i className="fas fa-users"></i> {group.members} members</span>
                  <span><i className="fas fa-signal"></i> {group.level}</span>
                </GroupMeta>
              </GroupHeader>
              <GroupContent>
                <GroupDescription>{group.description}</GroupDescription>
                <GroupStats>
                  <span><i className="fas fa-calendar"></i> Next: {group.nextSession}</span>
                </GroupStats>
                <JoinButton to={`/groups/${group.id}`}>Join Group</JoinButton>
              </GroupContent>
            </GroupCard>
          ))}
        </GroupsGrid>
      )}
    </GroupsContainer>
  );
};

export default Groups; 