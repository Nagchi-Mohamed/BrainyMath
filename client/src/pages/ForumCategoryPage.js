import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ThreadListItem from '../components/forums/ThreadListItem';

const ForumCategoryPage = () => {
  const { categoryId } = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [threads, setThreads] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchThreads = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await api.get(`/forums/categories/${categoryId}/threads?page=${page}`);
        setThreads(data.threads);
        setTotalPages(data.totalPages);
        setCategoryTitle(data.categoryName || ''); // Assuming backend sends categoryName
      } catch (err) {
        setError('Failed to load threads.');
      } finally {
        setLoading(false);
      }
    };

    fetchThreads();
  }, [categoryId, page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        {categoryTitle || 'Forum Threads'}
      </Typography>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message severity="error">{error}</Message>
      ) : (
        <>
          <List>
            {threads.map((thread) => (
              <ThreadListItem key={thread._id} thread={thread} />
            ))}
          </List>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </>
      )}

      {isAuthenticated && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to={`/forums/categories/${categoryId}/new-thread`}
          >
            Create New Thread
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default ForumCategoryPage;
