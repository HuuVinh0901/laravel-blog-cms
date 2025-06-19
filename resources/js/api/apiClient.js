import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
const apiClient = axios.create({
  baseURL: apiUrl,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

const refreshToken = () => apiClient.post('/auth/refresh');

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      console.log('Error:', error.response),
      error.response &&
      error.response.status === 400 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => apiClient(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const result=await refreshToken();
        console.log(result) 
        processQueue(null);
        return apiClient(originalRequest); 
      } catch (err) {
        processQueue(err);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
//Auth
export const getCurrentUser = () => apiClient.get('/auth/me');
export const registerUser = (userData) => apiClient.post('/register', userData);
export const loginUser = (credentials) => apiClient.post('/auth/login', credentials);
export const logoutUser = () => apiClient.post('/auth/logout');

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
export const createPost = (data) => apiClient.post('/posts', data);
//User
export const getUserById = (id) => apiClient.get(`/users/${id}`);

