import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import api from '../services/api';

const LessonsContext = createContext();

export const useLessons = () => useContext(LessonsContext);

export const LessonsProvider = ({ children }) => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    let isMounted = true;
    const loadLessons = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await api.get('/lessons', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (isMounted) {
          setLessons(response.data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.response?.data?.message || 'Failed to fetch lessons');
          console.error('Error fetching lessons:', err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadLessons();

    return () => {
      isMounted = false;
    };
  }, [token]);

  const getLessonById = async (id) => {
    if (!id || id === 'undefined') {
      console.error('Invalid lesson ID');
      return null;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Check if lesson is already in state
      const existingLesson = lessons.find(lesson => lesson.id === id);
      if (existingLesson) {
        return existingLesson;
      }
      
      const response = await api.get(`/lessons/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (!response.data) {
        throw new Error('Lesson not found');
      }
      
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch lesson';
      setError(errorMessage);
      console.error('Error fetching lesson:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Get lesson progress
  const getLessonProgress = async (lessonId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/lessons/${lessonId}/progress`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch lesson progress');
      }
      
      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Error fetching lesson progress:', err);
      return { completed: false, score: null };
    }
  };

  // Update lesson progress
  const updateLessonProgress = async (lessonId, score) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/lessons/${lessonId}/progress`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ score })
      });
      
      if (!response.ok) {
        throw new Error('Failed to update lesson progress');
      }
      
      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Error updating lesson progress:', err);
      throw err;
    }
  };

  // Create a new lesson (admin only)
  const createLesson = async (lessonData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/lessons', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(lessonData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to create lesson');
      }
      
      const data = await response.json();
      setLessons(prev => [...prev, data]);
      return data;
    } catch (err) {
      console.error('Error creating lesson:', err);
      throw err;
    }
  };

  // Update a lesson (admin only)
  const updateLesson = async (lessonId, lessonData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/lessons/${lessonId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(lessonData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update lesson');
      }
      
      const data = await response.json();
      setLessons(prev => prev.map(lesson => 
        lesson.id === lessonId ? data : lesson
      ));
      return data;
    } catch (err) {
      console.error('Error updating lesson:', err);
      throw err;
    }
  };

  // Delete a lesson (admin only)
  const deleteLesson = async (lessonId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/lessons/${lessonId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete lesson');
      }
      
      setLessons(prev => prev.filter(lesson => lesson.id !== lessonId));
    } catch (err) {
      console.error('Error deleting lesson:', err);
      throw err;
    }
  };

  const value = {
    lessons,
    loading,
    error,
    fetchLessons: () => {},
    getLessonById,
    getLessonProgress,
    updateLessonProgress,
    createLesson,
    updateLesson,
    deleteLesson
  };

  return (
    <LessonsContext.Provider value={value}>
      {children}
    </LessonsContext.Provider>
  );
}; 