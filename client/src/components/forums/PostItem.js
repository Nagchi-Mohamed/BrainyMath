import React from 'react';
import { Avatar, Box, Typography, Paper } from '@mui/material';

const PostItem = ({ post }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Avatar sx={{ mr: 2 }}>{post.user.name[0]}</Avatar>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            {post.user.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
            {new Date(post.createdAt).toLocaleString()}
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
          {post.content}
        </Typography>
      </Paper>
    </Box>
  );
};

export default PostItem;
