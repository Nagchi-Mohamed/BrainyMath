import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const CategoryListItem = ({ category }) => {
  return (
    <ListItem disablePadding>
      <Card sx={{ width: '100%' }}>
        <CardContent>
          <Typography
            component={RouterLink}
            to={`/forums/categories/${category._id}`}
            variant="h6"
            sx={{ textDecoration: 'none', color: 'inherit' }}
          >
            {category.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {category.description}
          </Typography>
        </CardContent>
      </Card>
    </ListItem>
  );
};

export default CategoryListItem;
