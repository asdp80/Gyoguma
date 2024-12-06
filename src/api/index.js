// src/api/index.js
import axiosInstance from './axiosInstance';

export const API = {
  product: {
    getAll: (page) =>
      axiosInstance.get('/products', { params: { page } }),

    getById: (productId) =>
      axiosInstance.get(`/products/${productId}`),

    create: (data) =>
      axiosInstance.post('/products', data),

    update: (productId, data) =>
      axiosInstance.patch(`/products/${productId}`, data),

    delete: (productId) =>
      axiosInstance.delete(`/products/${productId}`),

    getByMember: (memberId) =>
      axiosInstance.get(`/products/${memberId}`),

    search: (keyword) =>
      axiosInstance.get('/products/search', { params: { keyword } })
  },

  auth: {
    signup: (data) =>
      axiosInstance.post('/members/signup', data),

    login: (data) =>
      axiosInstance.post('/login', data)
  },

  member: {
    update: (memberId, data) =>
      axiosInstance.patch(`/members/${memberId}`, data),

    delete: (memberId) =>
      axiosInstance.delete(`/members/${memberId}`)
  },

  review: {
    create: (memberId, data) =>
      axiosInstance.post(`/reviews/${memberId}`, data)
  }
};