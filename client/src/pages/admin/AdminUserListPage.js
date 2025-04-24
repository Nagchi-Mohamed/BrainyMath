import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Typography, Button, Snackbar, Alert } from '@mui/material';
import api from '../../services/api';
import Message from '../../components/Message';

const AdminUserListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await api.get('/api/users');
        setUsers(data);
      } catch (err) {
        setError('Failed to load users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.delete(`/api/users/${id}`);
        setUsers(users.filter((user) => user._id !== id));
        setSnackbarMessage('User deleted successfully!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      } catch (err) {
        setError('Failed to delete user.');
        setSnackbarMessage('Failed to delete user.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 200 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'isAdmin', headerName: 'Admin', width: 100, renderCell: (params) => (params.value ? 'Yes' : 'No') },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleDelete(params.row._id)}
          disabled={params.row._id === users.find((u) => u.isAdmin && u.email === 'admin@example.com')?._id}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Manage Users
      </Typography>
      {error && <Message severity="error">{error}</Message>}
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={users}
          columns={columns}
          getRowId={(row) => row._id}
          loading={loading} // Pass loading state directly to DataGrid
        />
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AdminUserListPage;
