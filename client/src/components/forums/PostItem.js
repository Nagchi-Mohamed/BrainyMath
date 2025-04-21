import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const PostItem = ({ post }) => {
  return (
    <Card variant="outlined" sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {post.user.username} - {new Date(post.createdAt).toLocaleString()}
        </Typography>
        <Typography variant="body1">{post.content}</Typography>
      </CardContent>
    </Card>
  );
};

export default PostItem;
