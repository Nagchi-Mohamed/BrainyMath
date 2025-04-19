import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ForumContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageTitle = styled.h1`
  color: ${props => props.theme.colors.secondary};
  margin-bottom: 2rem;
  font-size: 2.5rem;
`;

const SearchBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #e0e0e0;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const CreateButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-weight: 500;
  transition: background-color ${props => props.theme.transitions.default};

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const CategoryCard = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: ${props => props.theme.shadows.md};
  padding: 1.5rem;
  transition: transform ${props => props.theme.transitions.default};

  &:hover {
    transform: translateY(-5px);
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const CategoryIcon = styled.div`
  font-size: 2rem;
  color: ${props => props.theme.colors.primary};
`;

const CategoryTitle = styled.h3`
  color: ${props => props.theme.colors.secondary};
  margin: 0;
`;

const CategoryDescription = styled.p`
  color: ${props => props.theme.colors.textLight};
  margin-bottom: 1rem;
`;

const CategoryStats = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textLight};
`;

const TopicsList = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: ${props => props.theme.shadows.md};
  overflow: hidden;
`;

const TopicHeader = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr;
  padding: 1rem;
  background-color: ${props => props.theme.colors.background};
  border-bottom: 1px solid #e0e0e0;
  font-weight: 500;
  color: ${props => props.theme.colors.textLight};
`;

const TopicItem = styled(Link)`
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr;
  padding: 1rem;
  text-decoration: none;
  color: inherit;
  border-bottom: 1px solid #e0e0e0;
  transition: background-color ${props => props.theme.transitions.default};

  &:hover {
    background-color: ${props => props.theme.colors.background};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const TopicTitle = styled.div`
  color: ${props => props.theme.colors.secondary};
  font-weight: 500;
`;

const TopicMeta = styled.div`
  color: ${props => props.theme.colors.textLight};
  font-size: 0.9rem;
`;

const TopicAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const AuthorAvatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.8rem;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const PageButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.sm};
  background-color: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.colors.primary};
  transition: all ${props => props.theme.transitions.default};

  &:hover {
    background-color: ${props => props.theme.colors.primary};
    color: white;
  }
`;

const Forum = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data for categories
  const categories = [
    {
      id: 1,
      title: 'General Discussion',
      description: 'Discuss any mathematics-related topics',
      icon: '💭',
      topics: 156,
      posts: 892
    },
    {
      id: 2,
      title: 'Homework Help',
      description: 'Get help with your math homework',
      icon: '📚',
      topics: 243,
      posts: 1245
    },
    {
      id: 3,
      title: 'Study Groups',
      description: 'Find or create study groups',
      icon: '👥',
      topics: 89,
      posts: 456
    },
    {
      id: 4,
      title: 'Resource Sharing',
      description: 'Share and discuss learning materials',
      icon: '📖',
      topics: 112,
      posts: 678
    }
  ];

  // Mock data for topics
  const topics = [
    {
      id: 1,
      title: 'Understanding Quadratic Equations',
      author: 'JD',
      authorName: 'John Doe',
      replies: 23,
      views: 156,
      lastActivity: '2 hours ago'
    },
    {
      id: 2,
      title: 'Calculus Study Group - Weekly Meeting',
      author: 'AS',
      authorName: 'Alice Smith',
      replies: 15,
      views: 89,
      lastActivity: '5 hours ago'
    },
    {
      id: 3,
      title: 'Need help with derivatives',
      author: 'RJ',
      authorName: 'Robert Johnson',
      replies: 8,
      views: 45,
      lastActivity: '1 day ago'
    },
    {
      id: 4,
      title: 'Sharing my notes on Linear Algebra',
      author: 'MK',
      authorName: 'Maria Kim',
      replies: 12,
      views: 234,
      lastActivity: '2 days ago'
    }
  ];

  return (
    <ForumContainer>
      <PageTitle>Forum</PageTitle>
      
      <SearchBar>
        <SearchInput
          type="text"
          placeholder="Search topics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <CreateButton>Create New Topic</CreateButton>
      </SearchBar>

      <CategoriesGrid>
        {categories.map(category => (
          <CategoryCard key={category.id}>
            <CategoryHeader>
              <CategoryIcon>{category.icon}</CategoryIcon>
              <CategoryTitle>{category.title}</CategoryTitle>
            </CategoryHeader>
            <CategoryDescription>{category.description}</CategoryDescription>
            <CategoryStats>
              <span>{category.topics} topics</span>
              <span>•</span>
              <span>{category.posts} posts</span>
            </CategoryStats>
          </CategoryCard>
        ))}
      </CategoriesGrid>

      <TopicsList>
        <TopicHeader>
          <div>Topic</div>
          <div>Author</div>
          <div>Replies</div>
          <div>Views</div>
        </TopicHeader>
        {topics.map(topic => (
          <TopicItem key={topic.id} to={`/forum/topic/${topic.id}`}>
            <TopicTitle>{topic.title}</TopicTitle>
            <TopicAuthor>
              <AuthorAvatar>{topic.author}</AuthorAvatar>
              <TopicMeta>{topic.authorName}</TopicMeta>
            </TopicAuthor>
            <TopicMeta>{topic.replies}</TopicMeta>
            <TopicMeta>{topic.views}</TopicMeta>
          </TopicItem>
        ))}
      </TopicsList>

      <Pagination>
        <PageButton onClick={() => setCurrentPage(1)} active={currentPage === 1}>1</PageButton>
        <PageButton onClick={() => setCurrentPage(2)} active={currentPage === 2}>2</PageButton>
        <PageButton onClick={() => setCurrentPage(3)} active={currentPage === 3}>3</PageButton>
      </Pagination>
    </ForumContainer>
  );
};

export default Forum; 