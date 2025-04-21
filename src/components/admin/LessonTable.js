import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

const LessonTable = ({ lessons, onEdit, onDelete }) => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'description', headerName: 'Description', width: 300 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <Box>
          <button onClick={() => onEdit(params.row.id)}>Edit</button>
          <button onClick={() => onDelete(params.row.id)}>Delete</button>
        </Box>
      ),
    },
  ];

  return (
    <Box style={{ height: 400, width: '100%' }}>
      <DataGrid rows={lessons} columns={columns} pageSize={5} checkboxSelection />
    </Box>
  );
};

LessonTable.propTypes = {
  lessons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default LessonTable;