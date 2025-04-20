import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const LessonsContext = createContext(null);

export const useLessons = () => {
  const context = useContext(LessonsContext);
  if (!context) {
    throw new Error('useLessons must be used within a LessonsProvider');
  }
  return context;
};

export const LessonsProvider = ({ children }) => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLessons = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/lessons');
      const data = await response.json();
      
      if (response.ok) {
        setLessons(data);
        setError(null);
      } else {
        setError(data.message || 'Failed to fetch lessons');
        toast.error(data.message || 'Failed to fetch lessons');
      }
    } catch (error) {
      setError('An error occurred while fetching lessons');
      toast.error('An error occurred while fetching lessons');
    } finally {
      setLoading(false);
    }
  };

  const fetchLesson = async (id) => {
    if (!id) {
      setError('No lesson ID provided');
      return null;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/lessons/${id}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          setError('Lesson not found');
          return null;
        }
        const data = await response.json();
        throw new Error(data.message || 'Failed to fetch lesson');
      }

      const data = await response.json();
      setError(null);
      return data;
    } catch (error) {
      const errorMessage = error.message || 'An error occurred while fetching the lesson';
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  const value = {
    lessons,
    loading,
    error,
    fetchLessons,
    fetchLesson
  };

  return (
    <LessonsContext.Provider value={value}>
      {children}
    </LessonsContext.Provider>
  );
}; 