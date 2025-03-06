// src/context/CategoryContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCategories, getTokensByCategory } from '../services/categoryService';

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [tokens, setTokens] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    };
    fetchCategories();
  }, []);

  const fetchTokensForCategory = async (categoryId) => {
    if (!tokens[categoryId]) {
      const categoryTokens = await getTokensByCategory(categoryId);
      setTokens(prev => ({ ...prev, [categoryId]: categoryTokens }));
    }
    return tokens[categoryId] || [];
  };

  return (
    <CategoryContext.Provider value={{
      categories,
      getTokensByCategory: fetchTokensForCategory
    }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategories must be used within a CategoryProvider');
  }
  return context;
};