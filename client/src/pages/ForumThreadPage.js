import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography,
  CircularProgress,
  Container,
  Pagination,
  Box,
} from '@mui/material';
import PostItem from '../components/forums/PostItem';
import CreatePostForm from '../components/forums/CreatePostForm';
import axios from 'axios';

const ForumThreadPage = () => {
  const { threadId } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [error, setError] = useState(null);
  const [posting, setPosting] = useState(false);

  const fetchPosts = async (pageNum) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/forums/threads/${threadId}/posts?page=${pageNum}`);
      setPosts(data.posts);
      setPages(data.pages);
      setPage(data.page);
    } catch (err) {
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [threadId, page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePostSubmit = async (content) => {
    try {
      setPosting(true);
      await axios.post(`/api/forums/threads/${threadId}/posts`, { content });
      fetchPosts(page);
    } catch (err) {
      setError('Failed to post');
    } finally {
      setPosting(false);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Thread Posts
      </Typography>
      <Box>
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </Box>
      <Pagination count={pages} page={page} onChange={handlePageChange} />
      <CreatePostForm onSubmit={handlePostSubmit} loading={posting} />
    </Container>
  );
};

export default ForumThreadPage;
