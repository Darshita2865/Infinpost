import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Search posts
export const searchPosts = async (query) => {
  try {
    // Mock data - Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, platform: 'Instagram', title: 'AI Internship Opportunity', description: 'Exciting AI internship program for final year students...' },
          { id: 2, platform: 'LinkedIn', title: 'Machine Learning Engineer Role', description: 'Looking for ML engineers with Python experience...' },
          { id: 3, platform: 'Facebook', title: 'Data Science Community', description: 'Join our data science community for networking...' },
        ]);
      }, 1000);
    });
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get trending searches
export const getTrendingSearches = async () => {
  try {
    const response = await api.get('/trending');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get user profile
export const getUserProfile = async () => {
  try {
    const response = await api.get('/profile');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update user profile
export const updateUserProfile = async (data) => {
  try {
    const response = await api.put('/profile', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default api;