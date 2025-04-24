import React from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, Button } from '@mui/material';

const ClassroomMemberListItem = ({ member, classroomTeacherId }) => {
  const isTeacher = member.user._id === classroomTeacherId;

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>{member.user.name.charAt(0)}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={member.user.name}
        secondary={isTeacher ? 'Teacher' : 'Member'}
      />
      {isTeacher && (
        <Button variant="outlined" color="secondary" disabled>
          Remove
        </Button>
      )}
    </ListItem>
  );
};

export default ClassroomMemberListItem;
