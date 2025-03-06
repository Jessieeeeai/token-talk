// src/services/categoryService.js
import { mockCategories, mockTokens } from './mockData';

export const getCategories = async () => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCategories);
    }, 500);
  });
};

export const getTokensByCategory = async (categoryId) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockTokens[categoryId] || []);
    }, 500);
  });
};