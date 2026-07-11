/**
 * Centralized API service — all axios calls go through here.
 * Automatically attaches auth token and handles common errors.
 */

import axios from 'axios';

const api = axios.create({
  // In production (Render): VITE_API_URL = https://ai-resume-backend.onrender.com
  // In local dev: falls back to '/api' which Vite proxies to http://localhost:5000
  baseURL: import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api`
    : '/api',
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

// ── Request Interceptor: attach JWT ────────────────────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response Interceptor: handle 401 globally ──────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
