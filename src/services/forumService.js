import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const forumService = {
  // Get all categories
  getCategories: async () => {
    try {
      const response = await axios.get(`${API_URL}/forum/categories`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get topics by category
  getTopicsByCategory: async (categoryId) => {
    try {
      const response = await axios.get(`${API_URL}/forum/categories/${categoryId}/topics`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get all topics
  getAllTopics: async () => {
    try {
      const response = await axios.get(`${API_URL}/forum/topics`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get topic details
  getTopicDetails: async (topicId) => {
    try {
      const response = await axios.get(`${API_URL}/forum/topics/${topicId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create a new topic
  createTopic: async (topicData) => {
    try {
      const response = await axios.post(`${API_URL}/forum/topics`, topicData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get posts for a topic
  getTopicPosts: async (topicId) => {
    try {
      const response = await axios.get(`${API_URL}/forum/topics/${topicId}/posts`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create a new post
  createPost: async (topicId, postData) => {
    try {
      const response = await axios.post(`${API_URL}/forum/topics/${topicId}/posts`, postData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update a post
  updatePost: async (topicId, postId, postData) => {
    try {
      const response = await axios.put(`${API_URL}/forum/topics/${topicId}/posts/${postId}`, postData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete a post
  deletePost: async (topicId, postId) => {
    try {
      const response = await axios.delete(`${API_URL}/forum/topics/${topicId}/posts/${postId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Search topics
  searchTopics: async (query) => {
    try {
      const response = await axios.get(`${API_URL}/forum/topics/search?q=${query}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}; 