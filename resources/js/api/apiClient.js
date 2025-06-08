import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
const apiClient = axios.create({
  baseURL: apiUrl,
  headers: { 'Content-Type': 'application/json' },
});

export const registerUser = (userData) => apiClient.post('/register', userData);

export const loginUser = (credentials) => apiClient.post('/login', credentials);

