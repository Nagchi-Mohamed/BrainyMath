import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors (token expired)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getCurrentUser: () => api.get('/auth/me'),
};

// Lessons API
export const lessonsAPI = {
  getAll: () => api.get('/lessons'),
  getById: (id) => api.get(`/lessons/${id}`),
  create: (lessonData) => api.post('/lessons', lessonData),
  update: (id, lessonData) => api.put(`/lessons/${id}`, lessonData),
  delete: (id) => api.delete(`/lessons/${id}`),
  trackProgress: (id, score) => api.post(`/lessons/${id}/progress`, { score }),
  getProgress: (id) => api.get(`/lessons/${id}/progress`),
};

// Groups API
export const groupsAPI = {
  getAll: () => api.get('/groups'),
  getById: (id) => api.get(`/groups/${id}`),
  create: (groupData) => api.post('/groups', groupData),
  update: (id, groupData) => api.put(`/groups/${id}`, groupData),
  delete: (id) => api.delete(`/groups/${id}`),
  join: (id) => api.post(`/groups/${id}/join`),
  leave: (id) => api.post(`/groups/${id}/leave`),
};

// Forum API
export const forumAPI = {
  getCategories: () => api.get('/forum/categories'),
  getTopics: (categoryId) => api.get(`/forum/categories/${categoryId}/topics`),
  getTopic: (topicId) => api.get(`/forum/topics/${topicId}`),
  createTopic: (categoryId, topicData) => api.post(`/forum/categories/${categoryId}/topics`, topicData),
  createPost: (topicId, postData) => api.post(`/forum/topics/${topicId}/posts`, postData),
};

export default api; 