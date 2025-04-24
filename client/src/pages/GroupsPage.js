import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Loader from '../components/Loader';
import Message from '../components/Message';
import GroupListItem from '../components/groups/GroupListItem';

const GroupsPage = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await api.get('/groups');
        setGroups(data);
      } catch (err) {
        setError('Failed to load groups.');
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Study Groups
      </Typography>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message severity="error">{error}</Message>
      ) : (
        <Grid container spacing={4}>
          {groups.map((group) => (
            <Grid item key={group._id} xs={12} sm={6} md={4}>
              <GroupListItem group={group} />
            </Grid>
          ))}
        </Grid>
      )}

      {isAuthenticated && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/groups/create')}
          >
            Create New Group
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default GroupsPage;
