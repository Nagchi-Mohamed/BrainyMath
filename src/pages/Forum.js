import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from '../hooks/useTranslation';
import { forumService } from '../services/forumService';
import { toast } from 'react-toastify';
import { FaSearch, FaPlus, FaEye, FaComment, FaUser, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ForumContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageTitle = styled.h1`
  color: ${props => props.theme.colors.text};
  margin-bottom: 2rem;
  text-align: center;
`;

const SearchBar = styled.div`
  display: flex;
  margin-bottom: 2rem;
  position: relative;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.textLight};
`;

const CreateTopicButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-left: 1rem;
  
  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
  }
`;

const CategoriesSection = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const CategoryCard = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 1.5rem;
  box-shadow: ${props => props.theme.shadows.sm};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

const CategoryTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
`;

const CategoryDescription = styled.p`
  color: ${props => props.theme.colors.textLight};
  font-size: 0.9rem;
`;

const CategoryStats = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.textLight};
  font-size: 0.9rem;
`;

const TopicsSection = styled.section`
  margin-bottom: 3rem;
`;

const TopicsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.md};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.sm};
`;

const TableHeader = styled.thead`
  background-color: ${props => props.theme.colors.background};
`;

const TableRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.colors.border};
  }
  
  &:hover {
    background-color: ${props => props.theme.colors.hoverBg};
  }
`;

const TableHeaderCell = styled.th`
  padding: 1rem;
  text-align: left;
  color: ${props => props.theme.colors.text};
  font-weight: 600;
`;

const TableCell = styled.td`
  padding: 1rem;
  color: ${props => props.theme.colors.text};
`;

const TopicLink = styled(Link)`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const TopicMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.textLight};
  font-size: 0.9rem;
`;

const TopicStats = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: ${props => props.theme.colors.textLight};
  font-size: 0.9rem;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
`;

const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.error};
  text-align: center;
  padding: 2rem;
  background-color: ${props => props.theme.colors.errorLight};
  border-radius: ${props => props.theme.borderRadius.md};
  margin: 2rem 0;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  gap: 1rem;
`;

const PageButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  background: ${props => props.disabled ? props.theme.colors.background : props.theme.colors.white};
  color: ${props => props.disabled ? props.theme.colors.textLight : props.theme.colors.text};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  
  &:hover:not(:disabled) {
    background: ${props => props.theme.colors.background};
  }
`;

const PageInfo = styled.span`
  color: ${props => props.theme.colors.textLight};
`;

const Forum = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [categoriesData, topicsData] = await Promise.all([
        forumService.getCategories(),
        forumService.getTopics({
          page: currentPage,
          limit: itemsPerPage,
          search: searchQuery
        })
      ]);
      
      setCategories(categoriesData);
      setTopics(topicsData.topics);
      setTotalPages(Math.ceil(topicsData.total / itemsPerPage));
    } catch (err) {
      setError(err.message);
      toast.error(t('errors.forumLoad'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchData();
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleCreateTopic = () => {
    navigate('/forum/create');
  };

  if (loading) {
    return <LoadingSpinner>{t('common.loading')}</LoadingSpinner>;
  }

  if (error) {
    return <ErrorMessage>{t('errors.general')}</ErrorMessage>;
  }

  return (
    <ForumContainer>
      <PageTitle>{t('forum.title')}</PageTitle>
      
      <SearchBar>
        <SearchIcon />
        <SearchInput
          type="text"
          placeholder={t('forum.searchTopics')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
        />
        <CreateTopicButton onClick={handleCreateTopic}>
          <FaPlus /> {t('forum.createTopic')}
        </CreateTopicButton>
      </SearchBar>
      
      <CategoriesSection>
        <SectionTitle>{t('forum.categories.title')}</SectionTitle>
        <CategoriesGrid>
          {categories.map(category => (
            <CategoryCard 
              key={category.id} 
              onClick={() => handleCategoryClick(category.id)}
            >
              <CategoryTitle>{category.name}</CategoryTitle>
              <CategoryDescription>{category.description}</CategoryDescription>
              <CategoryStats>
                <span>{category.topicsCount} {t('forum.topics')}</span>
                <span>{category.postsCount} {t('forum.posts')}</span>
              </CategoryStats>
            </CategoryCard>
          ))}
        </CategoriesGrid>
      </CategoriesSection>
      
      <TopicsSection>
        <SectionTitle>{t('forum.topics.title')}</SectionTitle>
        <TopicsTable>
          <TableHeader>
            <tr>
              <TableHeaderCell>{t('forum.topic')}</TableHeaderCell>
              <TableHeaderCell>{t('forum.author')}</TableHeaderCell>
              <TableHeaderCell>{t('forum.replies')}</TableHeaderCell>
              <TableHeaderCell>{t('forum.views')}</TableHeaderCell>
            </tr>
          </TableHeader>
          <tbody>
            {topics.map(topic => (
              <TableRow key={topic.id}>
                <TableCell>
                  <TopicLink to={`/forum/topics/${topic.id}`}>
                    {topic.title}
                  </TopicLink>
                  <TopicMeta>
                    {topic.category}
                  </TopicMeta>
                </TableCell>
                <TableCell>
                  <TopicMeta>
                    <FaUser />
                    {topic.author}
                  </TopicMeta>
                </TableCell>
                <TableCell>
                  <TopicStats>
                    <StatItem>
                      <FaComment />
                      {topic.replies}
                    </StatItem>
                  </TopicStats>
                </TableCell>
                <TableCell>
                  <TopicStats>
                    <StatItem>
                      <FaEye />
                      {topic.views}
                    </StatItem>
                  </TopicStats>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </TopicsTable>

        <PaginationContainer>
          <PageButton
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FaChevronLeft />
          </PageButton>
          <PageInfo>
            {t('common.page')} {currentPage} {t('common.of')} {totalPages}
          </PageInfo>
          <PageButton
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <FaChevronRight />
          </PageButton>
        </PaginationContainer>
      </TopicsSection>
    </ForumContainer>
  );
};

export default Forum; 