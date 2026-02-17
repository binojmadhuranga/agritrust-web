import axios from 'axios';

const API_BASE_URL = 'https://localhost:7012/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Add this to handle self-signed certificates in development
  httpsAgent: {
    rejectUnauthorized: false,
  } as any,
});

// Request interceptor to add token to headers
axiosInstance.interceptors.request.use(
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

// Response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiry');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
