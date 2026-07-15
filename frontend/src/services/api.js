import axios from 'axios';


const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

console.log('🔗 API URL:', API_URL); 

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


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


export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const loginUser = async (credentials) => {
  try {
    const formData = new FormData();
    formData.append('username', credentials.email);
    formData.append('password', credentials.password);
    
    const response = await api.post('/auth/login', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateProfile = async (data) => {
  try {
    const response = await api.put('/profile', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};


export const searchPosts = async (query, platform = null) => {
  try {
    const params = { q: query };
    if (platform) params.platform = platform;
    console.log('🔍 Searching for:', query);
    const response = await api.get('/search/', { params });
    console.log('✅ Search response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Search error:', error);
    throw error.response?.data || { error: 'Failed to fetch results' };
  }
};

export const getTrendingSearches = async () => {
  try {
    const response = await api.get('/search/trending');
    return response.data;
  } catch (error) {
    console.error('Trending error:', error);
    return [];
  }
};

export default api;
