import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const ProfileContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const ProfileHeader = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: ${props => props.theme.shadows.md};
  padding: 2rem;
  margin-bottom: 2rem;
  position: relative;
`;

const CoverPhoto = styled.div`
  height: 200px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.secondary} 100%);
  border-radius: ${props => props.theme.borderRadius.md} ${props => props.theme.borderRadius.md} 0 0;
  margin: -2rem -2rem 2rem -2rem;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ProfileAvatar = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
  margin-top: -75px;
  border: 5px solid white;
  box-shadow: ${props => props.theme.shadows.md};
`;

const ProfileName = styled.h1`
  margin: 1rem 0 0.5rem 0;
  color: ${props => props.theme.colors.secondary};
`;

const ProfileBio = styled.p`
  color: ${props => props.theme.colors.textLight};
  max-width: 600px;
  margin-bottom: 1rem;
`;

const ProfileStats = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
`;

const StatLabel = styled.div`
  color: ${props => props.theme.colors.textLight};
  font-size: 0.9rem;
`;

const ProfileActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const ActionButton = styled.button`
  background-color: ${props => props.primary ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.primary ? props.theme.colors.white : props.theme.colors.primary};
  border: 1px solid ${props => props.theme.colors.primary};
  padding: 0.5rem 1.5rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-weight: 500;
  transition: all ${props => props.theme.transitions.default};

  &:hover {
    background-color: ${props => props.primary ? props.theme.colors.secondary : props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
  }
`;

const ProfileContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SidebarCard = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: ${props => props.theme.shadows.md};
  padding: 1.5rem;
`;

const SidebarTitle = styled.h3`
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.secondary};
`;

const SidebarList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SidebarItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: ${props => props.theme.borderRadius.sm};
  cursor: pointer;
  transition: background-color ${props => props.theme.transitions.default};

  &:hover {
    background-color: ${props => props.theme.colors.background};
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const CreatePost = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: ${props => props.theme.shadows.md};
  padding: 1.5rem;
`;

const PostInput = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: ${props => props.theme.borderRadius.md};
  resize: none;
  margin-bottom: 1rem;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const PostActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PostButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-weight: 500;
  transition: background-color ${props => props.theme.transitions.default};

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }
`;

const PostCard = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: ${props => props.theme.shadows.md};
  padding: 1.5rem;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const PostAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
`;

const PostInfo = styled.div`
  flex: 1;
`;

const PostAuthor = styled.div`
  font-weight: 600;
  color: ${props => props.theme.colors.secondary};
`;

const PostTime = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textLight};
`;

const PostContent = styled.div`
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const PostImage = styled.img`
  width: 100%;
  border-radius: ${props => props.theme.borderRadius.md};
  margin-bottom: 1rem;
`;

const PostFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid #e0e0e0;
`;

const PostAction = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.textLight};
  transition: color ${props => props.theme.transitions.default};

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const DocumentCard = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: ${props => props.theme.shadows.md};
  padding: 1.5rem;
  margin-bottom: 1rem;
`;

const DocumentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const DocumentIcon = styled.div`
  font-size: 2rem;
  color: ${props => props.theme.colors.primary};
`;

const DocumentInfo = styled.div`
  flex: 1;
`;

const DocumentTitle = styled.div`
  font-weight: 600;
  color: ${props => props.theme.colors.secondary};
  margin-bottom: 0.25rem;
`;

const DocumentMeta = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textLight};
`;

const DocumentActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const DocumentButton = styled.button`
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  padding: 0.5rem 1rem;
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: 0.9rem;
  transition: all ${props => props.theme.transitions.default};

  &:hover {
    background-color: ${props => props.theme.colors.primary};
    color: white;
  }
`;

const Profile = () => {
  const { username } = useParams();
  const [newPost, setNewPost] = useState('');
  
  // Mock user data
  const user = {
    name: 'John Doe',
    bio: 'Mathematics enthusiast and educator. Passionate about making math accessible to everyone.',
    avatar: 'JD',
    posts: 42,
    followers: 128,
    following: 56,
    documents: [
      {
        id: 1,
        title: 'Calculus Notes',
        type: 'pdf',
        size: '2.4 MB',
        date: '2023-05-15',
        icon: '📄'
      },
      {
        id: 2,
        title: 'Algebra Formula Sheet',
        type: 'doc',
        size: '1.8 MB',
        date: '2023-04-22',
        icon: '📝'
      }
    ],
    recentPosts: [
      {
        id: 1,
        author: 'John Doe',
        avatar: 'JD',
        time: '2 hours ago',
        content: 'Just finished creating a new lesson on quadratic equations. Check it out!',
        likes: 24,
        comments: 5
      },
      {
        id: 2,
        author: 'John Doe',
        avatar: 'JD',
        time: 'Yesterday',
        content: 'Great session with the Algebra study group today. We covered polynomial functions and their applications.',
        likes: 18,
        comments: 3
      }
    ]
  };

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      // In a real app, this would send the post to the server
      console.log('Posting:', newPost);
      setNewPost('');
    }
  };

  return (
    <ProfileContainer>
      <ProfileHeader>
        <CoverPhoto />
        <ProfileInfo>
          <ProfileAvatar>{user.avatar}</ProfileAvatar>
          <ProfileName>{user.name}</ProfileName>
          <ProfileBio>{user.bio}</ProfileBio>
          <ProfileStats>
            <StatItem>
              <StatNumber>{user.posts}</StatNumber>
              <StatLabel>Posts</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>{user.followers}</StatNumber>
              <StatLabel>Followers</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>{user.following}</StatNumber>
              <StatLabel>Following</StatLabel>
            </StatItem>
          </ProfileStats>
          <ProfileActions>
            <ActionButton primary>Message</ActionButton>
            <ActionButton>Follow</ActionButton>
          </ProfileActions>
        </ProfileInfo>
      </ProfileHeader>

      <ProfileContent>
        <Sidebar>
          <SidebarCard>
            <SidebarTitle>About</SidebarTitle>
            <p>Mathematics teacher with 5 years of experience. Specializing in algebra and calculus.</p>
          </SidebarCard>

          <SidebarCard>
            <SidebarTitle>Groups</SidebarTitle>
            <SidebarList>
              <SidebarItem>📚 Algebra Study Group</SidebarItem>
              <SidebarItem>🧮 Calculus Enthusiasts</SidebarItem>
              <SidebarItem>📊 Statistics Club</SidebarItem>
            </SidebarList>
          </SidebarCard>

          <SidebarCard>
            <SidebarTitle>Documents</SidebarTitle>
            {user.documents.map(doc => (
              <DocumentCard key={doc.id}>
                <DocumentHeader>
                  <DocumentIcon>{doc.icon}</DocumentIcon>
                  <DocumentInfo>
                    <DocumentTitle>{doc.title}</DocumentTitle>
                    <DocumentMeta>{doc.size} • {doc.date}</DocumentMeta>
                  </DocumentInfo>
                  <DocumentActions>
                    <DocumentButton>View</DocumentButton>
                    <DocumentButton>Download</DocumentButton>
                  </DocumentActions>
                </DocumentHeader>
              </DocumentCard>
            ))}
          </SidebarCard>
        </Sidebar>

        <MainContent>
          <CreatePost>
            <PostInput 
              placeholder="What's on your mind?" 
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            />
            <PostActions>
              <div>
                <ActionButton>📷 Photo</ActionButton>
                <ActionButton>📄 Document</ActionButton>
              </div>
              <PostButton onClick={handlePostSubmit}>Post</PostButton>
            </PostActions>
          </CreatePost>

          {user.recentPosts.map(post => (
            <PostCard key={post.id}>
              <PostHeader>
                <PostAvatar>{post.avatar}</PostAvatar>
                <PostInfo>
                  <PostAuthor>{post.author}</PostAuthor>
                  <PostTime>{post.time}</PostTime>
                </PostInfo>
              </PostHeader>
              <PostContent>{post.content}</PostContent>
              <PostFooter>
                <PostAction>👍 Like ({post.likes})</PostAction>
                <PostAction>💬 Comment ({post.comments})</PostAction>
                <PostAction>🔄 Share</PostAction>
              </PostFooter>
            </PostCard>
          ))}
        </MainContent>
      </ProfileContent>
    </ProfileContainer>
  );
};

export default Profile; 