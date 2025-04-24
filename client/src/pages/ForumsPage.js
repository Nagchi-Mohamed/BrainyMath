import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Loader from '../components/Loader';
import Message from '../components/Message';
import CategoryListItem from '../components/forums/CategoryListItem';

const ForumsPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await api.get('/forums/categories');
        setCategories(data);
      } catch (err) {
        setError('Failed to load forum categories.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Discussion Forums
      </Typography>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message severity="error">{error}</Message>
      ) : (
        <List>
          {categories.map((category) => (
            <CategoryListItem key={category._id} category={category} />
          ))}
        </List>
      )}

      {/* Optional Admin Feature */}
      {/** Assuming user.isAdmin is available in context **/}
      {false && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button variant="contained" color="primary" onClick={() => navigate('/forums/create-category')}>
            Create New Category
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default ForumsPage;
