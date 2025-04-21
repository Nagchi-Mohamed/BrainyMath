import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  List,
  CircularProgress,
  TextField,
  Button,
  Box,
} from '@mui/material';
import axios from 'axios';
import GroupListItem from '../components/groups/GroupListItem';

const GroupsPage = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [creating, setCreating] = useState(false);

  const fetchGroups = async (keyword = '') => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/groups?keyword=${keyword}`);
      setGroups(data);
    } catch (err) {
      setError('Failed to load groups');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchGroups(search);
  };

  const handleCreateGroup = async () => {
    if (!newGroupName.trim()) return;
    try {
      setCreating(true);
      await axios.post('/api/groups', {
        name: newGroupName,
        description: newGroupDescription,
      });
      setNewGroupName('');
      setNewGroupDescription('');
      fetchGroups();
    } catch (err) {
      setError('Failed to create group');
    } finally {
      setCreating(false);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Study Groups
      </Typography>
      <Box component="form" onSubmit={handleSearchSubmit} sx={{ mb: 2 }}>
        <TextField
          label="Search Groups"
          value={search}
          onChange={handleSearchChange}
          fullWidth
        />
      </Box>
      <List>
        {groups.map((group) => (
          <GroupListItem key={group._id} group={group} />
        ))}
      </List>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Create New Group</Typography>
        <TextField
          label="Group Name"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Description"
          value={newGroupDescription}
          onChange={(e) => setNewGroupDescription(e.target.value)}
          fullWidth
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleCreateGroup} disabled={creating}>
          Create Group
        </Button>
      </Box>
    </Container>
  );
};

export default GroupsPage;
