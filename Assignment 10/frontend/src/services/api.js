import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000' // Adjust this URL if your backend runs elsewhere
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add auth token here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle error globally
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default api;