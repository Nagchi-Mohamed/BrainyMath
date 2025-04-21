import React from 'react';
import { ListItem, ListItemText } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const ThreadListItem = ({ thread }) => {
  return (
    <ListItem button component={RouterLink} to={`/forums/thread/${thread._id}`}>
      <ListItemText
        primary={thread.title}
        secondary={`Started by ${thread.user.username} on ${new Date(thread.createdAt).toLocaleDateString()}`}
      />
    </ListItem>
  );
};

export default ThreadListItem;
