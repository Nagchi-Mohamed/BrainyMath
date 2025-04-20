import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const groupsService = {
  // Get all groups
  getAllGroups: async () => {
    try {
      const response = await axios.get(`${API_URL}/groups`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get user's groups
  getUserGroups: async () => {
    try {
      const response = await axios.get(`${API_URL}/groups/user`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create a new group
  createGroup: async (groupData) => {
    try {
      const response = await axios.post(`${API_URL}/groups`, groupData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Join a group
  joinGroup: async (groupId) => {
    try {
      const response = await axios.post(`${API_URL}/groups/${groupId}/join`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Leave a group
  leaveGroup: async (groupId) => {
    try {
      const response = await axios.post(`${API_URL}/groups/${groupId}/leave`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get group details
  getGroupDetails: async (groupId) => {
    try {
      const response = await axios.get(`${API_URL}/groups/${groupId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update group details
  updateGroup: async (groupId, groupData) => {
    try {
      const response = await axios.put(`${API_URL}/groups/${groupId}`, groupData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete a group
  deleteGroup: async (groupId) => {
    try {
      const response = await axios.delete(`${API_URL}/groups/${groupId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}; 