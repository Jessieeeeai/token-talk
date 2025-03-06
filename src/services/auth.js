// src/services/auth.js
import { api } from './api';

export const auth = {
  async register(userData) {
    const response = await api.post('/auth/register', userData);
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    return user;
  },

  async login(credentials) {
    const response = await api.post('/auth/login', credentials);
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    return user;
  },

  async logout() {
    await api.post('/auth/logout');
    localStorage.removeItem('token');
  },

  async getProfile() {
    const response = await api.get('/auth/me');
    return response.data;
  },
};