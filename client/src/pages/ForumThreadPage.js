import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Loader from '../components/Loader';
import Message from '../components/Message';
import PostItem from '../components/forums/PostItem';
import CreatePostForm from '../components/forums/CreatePostForm';

const ForumThreadPage = () => {
  const { threadId } = useParams();
  const { isAuthenticated } = useAuth();

  const [posts, setPosts] = useState([]);
  const [threadTitle, setThreadTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await api.get(`/forums/threads/${threadId}/posts?page=${page}`);
        setPosts(data.posts);
        setTotalPages(data.totalPages);
        setThreadTitle(data.threadTitle || ''); // Assuming backend sends threadTitle
      } catch (err) {
        setError('Failed to load posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [threadId, page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const refreshPosts = () => {
    setPage(1); // Reset to first page and trigger fetch
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        {threadTitle || 'Thread Posts'}
      </Typography>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message severity="error">{error}</Message>
      ) : (
        <>
          <List>
            {posts.map((post) => (
              <PostItem key={post._id} post={post} />
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
        <Box sx={{ mt: 4 }}>
          <CreatePostForm threadId={threadId} onPostCreated={refreshPosts} />
        </Box>
      )}
    </Container>
  );
};

export default ForumThreadPage;
