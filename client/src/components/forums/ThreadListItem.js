import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

const ThreadListItem = ({ thread }) => {
  return (
    <ListItem disablePadding>
      <Box sx={{ width: '100%', p: 2, borderBottom: '1px solid #ddd' }}>
        <Typography
          component={RouterLink}
          to={`/forums/threads/${thread._id}`}
          variant="h6"
          sx={{ textDecoration: 'none', color: 'inherit' }}
        >
          {thread.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          By {thread.user.name} - {new Date(thread.lastReply).toLocaleString()}
        </Typography>
        <Chip label={`${thread.postsCount} Posts`} size="small" sx={{ mt: 1 }} />
      </Box>
    </ListItem>
  );
};

export default ThreadListItem;
