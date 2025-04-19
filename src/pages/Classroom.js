import React, { useState } from 'react';
import styled from 'styled-components';

const ClassroomContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 1rem;
  height: calc(100vh - 64px);
  padding: 1rem;
  background-color: ${props => props.theme.colors.background};
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 1rem;
  box-shadow: ${props => props.theme.shadows.md};
`;

const VideoContainer = styled.div`
  position: relative;
  aspect-ratio: 16/9;
  background-color: #1a1a1a;
  border-radius: ${props => props.theme.borderRadius.sm};
  overflow: hidden;
`;

const VideoPlaceholder = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 1.2rem;
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: ${props => props.theme.shadows.md};
`;

const ControlButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: ${props => props.theme.borderRadius.full};
  background-color: ${props => props.active ? props.theme.colors.primary : '#f0f0f0'};
  color: ${props => props.active ? 'white' : props.theme.colors.text};
  transition: all ${props => props.theme.transitions.default};

  &:hover {
    background-color: ${props => props.active ? props.theme.colors.secondary : '#e0e0e0'};
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ChatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: ${props => props.theme.shadows.md};
  overflow: hidden;
`;

const ChatHeader = styled.div`
  padding: 1rem;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  font-weight: 500;
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
`;

const Message = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const MessageAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.8rem;
`;

const MessageContent = styled.div`
  flex: 1;
`;

const MessageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
`;

const MessageAuthor = styled.span`
  font-weight: 500;
  color: ${props => props.theme.colors.secondary};
`;

const MessageTime = styled.span`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textLight};
`;

const MessageText = styled.p`
  margin: 0;
  color: ${props => props.theme.colors.text};
`;

const ChatInput = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  border-top: 1px solid #e0e0e0;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #e0e0e0;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const SendButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border-radius: ${props => props.theme.borderRadius.full};
  transition: background-color ${props => props.theme.transitions.default};

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }
`;

const ResourcesContainer = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: ${props => props.theme.shadows.md};
  overflow: hidden;
`;

const ResourcesHeader = styled.div`
  padding: 1rem;
  background-color: ${props => props.theme.colors.background};
  border-bottom: 1px solid #e0e0e0;
  font-weight: 500;
`;

const ResourcesList = styled.div`
  padding: 1rem;
`;

const ResourceItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: ${props => props.theme.borderRadius.sm};
  transition: background-color ${props => props.theme.transitions.default};

  &:hover {
    background-color: ${props => props.theme.colors.background};
  }
`;

const ResourceIcon = styled.div`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.primary};
`;

const ResourceName = styled.span`
  flex: 1;
  font-size: 0.9rem;
`;

const Classroom = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [message, setMessage] = useState('');

  // Mock data for participants
  const participants = [
    { id: 1, name: 'John Doe', initials: 'JD' },
    { id: 2, name: 'Alice Smith', initials: 'AS' },
    { id: 3, name: 'Robert Johnson', initials: 'RJ' },
    { id: 4, name: 'Maria Kim', initials: 'MK' }
  ];

  // Mock data for chat messages
  const messages = [
    {
      id: 1,
      author: 'John Doe',
      initials: 'JD',
      time: '10:30 AM',
      text: 'Good morning everyone!'
    },
    {
      id: 2,
      author: 'Alice Smith',
      initials: 'AS',
      time: '10:31 AM',
      text: 'Morning! Ready for today\'s lesson?'
    }
  ];

  // Mock data for resources
  const resources = [
    { id: 1, name: 'Lesson Slides', icon: '📊' },
    { id: 2, name: 'Homework Assignment', icon: '📝' },
    { id: 3, name: 'Practice Problems', icon: '📚' }
  ];

  return (
    <ClassroomContainer>
      <MainContent>
        <VideoGrid>
          {participants.map(participant => (
            <VideoContainer key={participant.id}>
              <VideoPlaceholder>{participant.initials}</VideoPlaceholder>
            </VideoContainer>
          ))}
        </VideoGrid>

        <Controls>
          <ControlButton
            active={!isMuted}
            onClick={() => setIsMuted(!isMuted)}
          >
            🎤 {isMuted ? 'Unmute' : 'Mute'}
          </ControlButton>
          <ControlButton
            active={!isVideoOff}
            onClick={() => setIsVideoOff(!isVideoOff)}
          >
            📹 {isVideoOff ? 'Start Video' : 'Stop Video'}
          </ControlButton>
          <ControlButton
            active={isScreenSharing}
            onClick={() => setIsScreenSharing(!isScreenSharing)}
          >
            🖥️ {isScreenSharing ? 'Stop Sharing' : 'Share Screen'}
          </ControlButton>
        </Controls>
      </MainContent>

      <Sidebar>
        <ChatContainer>
          <ChatHeader>Chat</ChatHeader>
          <ChatMessages>
            {messages.map(msg => (
              <Message key={msg.id}>
                <MessageAvatar>{msg.initials}</MessageAvatar>
                <MessageContent>
                  <MessageHeader>
                    <MessageAuthor>{msg.author}</MessageAuthor>
                    <MessageTime>{msg.time}</MessageTime>
                  </MessageHeader>
                  <MessageText>{msg.text}</MessageText>
                </MessageContent>
              </Message>
            ))}
          </ChatMessages>
          <ChatInput>
            <Input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <SendButton>Send</SendButton>
          </ChatInput>
        </ChatContainer>

        <ResourcesContainer>
          <ResourcesHeader>Resources</ResourcesHeader>
          <ResourcesList>
            {resources.map(resource => (
              <ResourceItem key={resource.id}>
                <ResourceIcon>{resource.icon}</ResourceIcon>
                <ResourceName>{resource.name}</ResourceName>
              </ResourceItem>
            ))}
          </ResourcesList>
        </ResourcesContainer>
      </Sidebar>
    </ClassroomContainer>
  );
};

export default Classroom; 