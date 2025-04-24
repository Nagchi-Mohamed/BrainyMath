import React from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, Chip, IconButton } from '@mui/material';
import PromoteIcon from '@mui/icons-material/ArrowUpward';
import RemoveIcon from '@mui/icons-material/Delete';
import api from '../../services/api';

const MemberListItem = ({ membership, currentUserRole }) => {
  const handlePromote = async () => {
    try {
      await api.post(`/groups/${membership.group}/members/${membership.user._id}/promote`);
      alert('Member promoted to admin successfully.');
    } catch (err) {
      alert('Failed to promote member.');
    }
  };

  const handleRemove = async () => {
    try {
      await api.delete(`/groups/${membership.group}/members/${membership.user._id}`);
      alert('Member removed successfully.');
    } catch (err) {
      alert('Failed to remove member.');
    }
  };

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>{membership.user.name[0]}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={membership.user.name}
        secondary={membership.role}
      />
      <Chip label={membership.role} size="small" sx={{ mr: 2 }} />
      {currentUserRole === 'admin' && membership.role !== 'admin' && (
        <>
          <IconButton onClick={handlePromote} color="primary">
            <PromoteIcon />
          </IconButton>
          <IconButton onClick={handleRemove} color="secondary">
            <RemoveIcon />
          </IconButton>
        </>
      )}
    </ListItem>
  );
};

export default MemberListItem;
