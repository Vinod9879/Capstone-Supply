import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const userService = {
  // Get all users (Admin only)
  getAllUsers: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get user by ID
  getUserById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new user (Admin only)
  createUser: async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update user (Admin only)
  updateUser: async (id, userData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/users/${id}`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete user (Admin only)
  deleteUser: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/users/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update user profile (User only)
  updateProfile: async (userData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/users/profile`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default userService;
