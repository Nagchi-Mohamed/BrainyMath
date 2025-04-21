import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import UserTable from '../../components/admin/UserTable';

const AdminUserListPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get('/api/admin/users');
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (id) => {
    console.log(`Edit user with ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete user with ID: ${id}`);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Manage Users
      </Typography>
      <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
    </Box>
  );
};

export default AdminUserListPage;