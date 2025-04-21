import React from 'react';
import { ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const MemberListItem = ({ member, onRemove }) => {
  return (
    <ListItem
      secondaryAction={
        onRemove && (
          <IconButton edge="end" aria-label="remove" onClick={() => onRemove(member.user._id)}>
            <DeleteIcon />
          </IconButton>
        )
      }
    >
      <ListItemText primary={member.user.username} secondary={member.role} />
    </ListItem>
  );
};

export default MemberListItem;
