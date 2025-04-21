import React from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';

const UserTable = ({ users, onEdit, onDelete }) => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
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
      <DataGrid rows={users} columns={columns} pageSize={5} checkboxSelection />
    </Box>
  );
};

UserTable.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default UserTable;