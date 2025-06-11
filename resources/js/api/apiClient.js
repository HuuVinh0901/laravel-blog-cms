import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
const apiClient = axios.create({
  baseURL: apiUrl,
  headers: { 'Content-Type': 'application/json' },
});
//Auth
export const registerUser = (userData) => apiClient.post('/register', userData);
export const loginUser = (credentials) => apiClient.post('/login', credentials);
//Category
export const getCategories = () => apiClient.get('/categories');

//Post
export const getPosts = (page = 1) =>
  apiClient.get('/posts', {
    params: { page },
  });
  export const getPostsByCategory = (categoryId, page = 1) =>
    apiClient.get(`/posts/categories/${categoryId}`, {
      params: { page },
    });
export const getPostById = (id) => apiClient.get(`/posts/${id}`);
export const getPostByUser = (userId) => apiClient.get(`/posts/users/${userId}`);
//User
export const getUserById = (id) => apiClient.get(`/users/${id}`);
