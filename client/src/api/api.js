import axios from 'axios';

const API_URL = 'http://localhost:5001';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

// Add request interceptor to add auth token to all requests
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

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Only redirect if we're not already on the login page
      if (!window.location.pathname.includes('/login')) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const login = (credentials) => api.post('/api/auth/login', credentials);
export const register = (userData) => api.post('/api/auth/register', userData);
export const logout = () => api.post('/api/auth/logout');
export const getCurrentUser = () => api.get('/api/auth/me');

// Admin API calls
export const getAdminInfo = () => api.get('/api/auth/me');
export const updateAdminProfile = (data) => api.put('/api/auth/profile', data);

// Rider API calls
export const getAllRiders = () => api.get('/api/riders');
export const getRiderById = (id) => api.get(`/api/riders/${id}`);
export const updateRider = (id, data) => api.put(`/api/riders/${id}`, data);
export const createRider = (data) => api.post('/api/riders', data);
export const deleteRider = (id) => api.delete(`/api/riders/${id}`);

// Order API calls
export const createOrder = (orderData) => api.post('/api/orders', orderData);
export const getAllOrders = () => api.get('/api/orders');
export const getRiderOrders = (riderId) => api.get(`/api/orders/rider/${riderId}`);

export default api; 