import api from './api';

export const lessonService = {
  // Get all lessons
  getLessons: async () => {
    const response = await api.get('/lessons');
    return response.data;
  },

  // Get lesson by ID
  getLessonById: async (id) => {
    const response = await api.get(`/lessons/${id}`);
    return response.data;
  },

  // Create a new lesson
  createLesson: async (lessonData) => {
    const response = await api.post('/lessons', lessonData);
    return response.data;
  },

  // Update a lesson
  updateLesson: async (id, lessonData) => {
    const response = await api.put(`/lessons/${id}`, lessonData);
    return response.data;
  },

  // Delete a lesson
  deleteLesson: async (id) => {
    const response = await api.delete(`/lessons/${id}`);
    return response.data;
  },

  // Submit answer for a lesson
  submitAnswer: async (lessonId, answer) => {
    const response = await api.post(`/lessons/${lessonId}/submit`, { answer });
    return response.data;
  },

  // Get lesson progress
  getProgress: async (lessonId) => {
    const response = await api.get(`/lessons/${lessonId}/progress`);
    return response.data;
  }
}; 