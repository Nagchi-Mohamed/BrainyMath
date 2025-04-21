import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  List,
  Typography,
  CircularProgress,
  Container,
  Pagination,
  Button,
} from '@mui/material';
import ThreadListItem from '../components/forums/ThreadListItem';
import axios from 'axios';

const ForumCategoryPage = () => {
  const { categoryId } = useParams();
  const [threads, setThreads] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryAndThreads = async () => {
      try {
        const categoryRes = await axios.get('/api/forums/categories');
        const foundCategory = categoryRes.data.find((c) => c._id === categoryId);
        setCategory(foundCategory);

        const { data } = await axios.get(
          `/api/forums/categories/${categoryId}/threads?page=${page}`
        );
        setThreads(data.threads);
        setPages(data.pages);
      } catch (err) {
        setError('Failed to load threads');
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryAndThreads();
  }, [categoryId, page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!category) return <Typography>Category not found</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {category.name}
      </Typography>
      <Button
        variant="contained"
        component={RouterLink}
        to={`/forums/category/${categoryId}/new-thread`}
        sx={{ marginBottom: 2 }}
      >
        Create New Thread
      </Button>
      <List>
        {threads.map((thread) => (
          <ThreadListItem key={thread._id} thread={thread} />
        ))}
      </List>
      <Pagination count={pages} page={page} onChange={handlePageChange} />
    </Container>
  );
};

export default ForumCategoryPage;
