import React from 'react';
import { ListItem, ListItemText } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const CategoryListItem = ({ category }) => {
  return (
    <ListItem button component={RouterLink} to={`/forums/category/${category._id}`}>
      <ListItemText primary={category.name} secondary={category.description} />
    </ListItem>
  );
};

export default CategoryListItem;
