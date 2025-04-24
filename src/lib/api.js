import axios from 'axios';

// API base URL, fallback to localhost if not defined
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to attach auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API functions for game operations
export const getGameHistory = async (filter = 'all', timeRange = 'week') => {
  try {
    const response = await api.get('/games/history', {
      params: { filter, timeRange }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching game history:', error);
    throw error;
  }
};

export const saveGame = async (gameData) => {
  try {
    const response = await api.post('/games', gameData);
    return response.data;
  } catch (error) {
    console.error('Error saving game:', error);
    throw error;
  }
};

export const getGameById = async (gameId) => {
  try {
    const response = await api.get(`/games/${gameId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching game ${gameId}:`, error);
    throw error;
  }
};

export default api; 