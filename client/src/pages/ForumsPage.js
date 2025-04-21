import React, { useEffect, useState } from 'react';
import { List, Typography, CircularProgress, Container } from '@mui/material';
import CategoryListItem from '../components/forums/CategoryListItem';
import axios from 'axios';

const ForumsPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('/api/forums/categories');
        setCategories(data);
      } catch (err) {
        setError('Failed to load categories');
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Forum Categories
      </Typography>
      <List>
        {categories.map((category) => (
          <CategoryListItem key={category._id} category={category} />
        ))}
      </List>
    </Container>
  );
};

export default ForumsPage;
