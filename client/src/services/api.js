import axios from 'axios';

export const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api' });

api.interceptors.request.use((config) => {
  const storedUser = localStorage.getItem('civicbridge_user') || localStorage.getItem('auth_user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  if (user?.id || user?._id) config.headers['x-demo-user'] = user.id || user._id;
  const token = localStorage.getItem('auth_token');
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});
