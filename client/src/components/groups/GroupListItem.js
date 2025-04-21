import React from 'react';
import { ListItem, ListItemText, ListItemButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const GroupListItem = ({ group }) => {
  return (
    <ListItem disablePadding>
      <ListItemButton component={RouterLink} to={`/groups/${group._id}`}>
        <ListItemText primary={group.name} secondary={group.description} />
      </ListItemButton>
    </ListItem>
  );
};

export default GroupListItem;
