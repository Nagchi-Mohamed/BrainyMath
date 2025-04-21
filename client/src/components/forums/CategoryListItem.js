import React from 'react';
import { ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const CategoryListItem = ({ category }) => {
  return (
    <ListItem button component={Link} to={`/forums/categories/${category._id}`}>
      <ListItemText primary={category.name} secondary={category.description} />
    </ListItem>
  );
};

export default CategoryListItem;
