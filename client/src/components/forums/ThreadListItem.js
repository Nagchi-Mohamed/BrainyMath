import React from 'react';
import { ListItem, ListItemText, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const ThreadListItem = ({ thread }) => {
  return (
    <ListItem button component={Link} to={`/forums/threads/${thread._id}`}>
      <ListItemText
        primary={thread.title}
        secondary={
          <>
            <Typography component="span" variant="body2" color="textPrimary">
              {thread.user.name}
            </Typography>
            {' — '}
            {thread.content.length > 100 ? thread.content.substring(0, 100) + '...' : thread.content}
          </>
        }
      />
    </ListItem>
  );
};

export default ThreadListItem;
