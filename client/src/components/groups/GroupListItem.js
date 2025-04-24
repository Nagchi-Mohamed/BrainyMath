import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const GroupListItem = ({ group }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {group.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {group.description}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Owned by: {group.owner.name}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Button
          variant="outlined"
          component={RouterLink}
          to={`/groups/${group._id}`}
        >
          View Details
        </Button>
      </Box>
    </Card>
  );
};

export default GroupListItem;
