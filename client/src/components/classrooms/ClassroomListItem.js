import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Card, CardContent, Typography, Button, CardActions } from '@mui/material';

const ClassroomListItem = ({ classroom }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {classroom.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {classroom.description}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Teacher: {classroom.teacher?.name || 'Unknown'}
        </Typography>
        {classroom.lesson?.title && (
          <Typography variant="body2" color="textSecondary">
            Associated Lesson: {classroom.lesson.title}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="contained"
          color="primary"
          component={RouterLink}
          to={`/classrooms/${classroom._id}`}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default ClassroomListItem;
