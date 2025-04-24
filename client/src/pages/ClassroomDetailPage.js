import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { Container, Typography, Button, List, Grid } from '@mui/material';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import ClassroomMemberListItem from '../../components/classrooms/ClassroomMemberListItem';

const ClassroomDetailPage = () => {
  const { classroomId } = useParams();
  const { user } = useAuth();
  const [classroom, setClassroom] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMember, setIsMember] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);

  useEffect(() => {
    const fetchClassroomDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data: classroomData } = await api.get(`/api/classrooms/${classroomId}`);
        const { data: membersData } = await api.get(`/api/classrooms/${classroomId}/members`);

        setClassroom(classroomData);
        setMembers(membersData);

        const currentUserMembership = membersData.find((member) => member.user._id === user._id);
        setIsMember(!!currentUserMembership);
        setIsTeacher(classroomData.createdBy === user._id);
      } catch (err) {
        setError('Failed to load classroom details.');
      } finally {
        setLoading(false);
      }
    };

    fetchClassroomDetails();
  }, [classroomId, user._id]);

  const handleJoinClassroom = async () => {
    try {
      await api.post(`/api/classrooms/${classroomId}/members`);
      setIsMember(true);
    } catch (err) {
      setError('Failed to join classroom.');
    }
  };

  const handleLeaveClassroom = async () => {
    try {
      await api.delete(`/api/classrooms/${classroomId}/members/me`);
      setIsMember(false);
    } catch (err) {
      setError('Failed to leave classroom.');
    }
  };

  return (
    <Container>
      {loading && <Loader />}
      {error && <Message severity="error">{error}</Message>}

      {classroom && (
        <>
          <Typography variant="h4" gutterBottom>
            {classroom.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {classroom.description}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Teacher: {classroom.teacher?.name || 'Unknown'}
          </Typography>
          {classroom.lesson?.title && (
            <Typography variant="body2" color="textSecondary">
              Associated Lesson: {classroom.lesson.title}
            </Typography>
          )}

          {isTeacher ? (
            <Button variant="contained" color="primary" disabled>
              You are the Teacher
            </Button>
          ) : isMember ? (
            <Button variant="outlined" color="secondary" onClick={handleLeaveClassroom}>
              Leave Classroom
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleJoinClassroom}>
              Join Classroom
            </Button>
          )}

          <Typography variant="h5" gutterBottom sx={{ marginTop: 4 }}>
            Members
          </Typography>
          <List>
            {members.map((member) => (
              <ClassroomMemberListItem
                key={member.user._id}
                member={member}
                classroomTeacherId={classroom.createdBy}
              />
            ))}
          </List>
        </>
      )}
    </Container>
  );
};

export default ClassroomDetailPage;
