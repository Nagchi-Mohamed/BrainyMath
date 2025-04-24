import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

const QuizListItem = ({ quiz }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {quiz.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {quiz.description}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Chip label={quiz.category} size="small" />
          <Chip label={quiz.difficulty} size="small" color="primary" />
        </Box>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Button
          variant="outlined"
          component={RouterLink}
          to={`/games/quiz/${quiz._id}`}
        >
          Play Quiz
        </Button>
      </Box>
    </Card>
  );
};

export default QuizListItem;