// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 로그인 성공시 토큰 저장
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data?.result?.token) {
      localStorage.setItem('token', response.data.result.token);
    }
    return response;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;