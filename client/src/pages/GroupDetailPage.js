import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Loader from '../components/Loader';
import Message from '../components/Message';
import MemberListItem from '../components/groups/MemberListItem';

const GroupDetailPage = () => {
  const { groupId } = useParams();
  const { user } = useAuth();

  const [group, setGroup] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const groupResponse = await api.get(`/groups/${groupId}`);
        const membersResponse = await api.get(`/groups/${groupId}/members`);

        setGroup(groupResponse.data);
        setMembers(membersResponse.data);

        const currentUserMembership = membersResponse.data.find(
          (member) => member.user._id === user._id
        );
        setUserRole(currentUserMembership ? currentUserMembership.role : 'none');
      } catch (err) {
        setError('Failed to load group details.');
      } finally {
        setLoading(false);
      }
    };

    fetchGroupDetails();
  }, [groupId, user._id]);

  const handleJoinGroup = async () => {
    try {
      await api.post(`/groups/${groupId}/join`);
      setUserRole('member');
      setMembers([...members, { user, role: 'member' }]);
    } catch (err) {
      setError('Failed to join group.');
    }
  };

  const handleLeaveGroup = async () => {
    try {
      await api.delete(`/groups/${groupId}/leave`);
      setUserRole('none');
      setMembers(members.filter((member) => member.user._id !== user._id));
    } catch (err) {
      setError('Failed to leave group.');
    }
  };

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message severity="error">{error}</Message>
      ) : (
        <>
          <Typography variant="h4" component="h1" gutterBottom>
            {group.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {group.description}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Owned by: {group.owner.name}
          </Typography>

          {userRole === 'none' && (
            <Button variant="contained" color="primary" onClick={handleJoinGroup}>
              Join Group
            </Button>
          )}

          {userRole === 'member' && (
            <Button variant="outlined" color="secondary" onClick={handleLeaveGroup}>
              Leave Group
            </Button>
          )}

          <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
            Members
          </Typography>
          <List>
            {members.map((member) => (
              <MemberListItem
                key={member.user._id}
                membership={member}
                currentUserRole={userRole}
              />
            ))}
          </List>
        </>
      )}
    </Container>
  );
};

export default GroupDetailPage;