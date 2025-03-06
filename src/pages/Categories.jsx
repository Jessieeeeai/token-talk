// src/pages/Categories.jsx
import React from 'react';
import CategoryNav from '../components/categories/CategoryNav';
import CategoryCard from '../components/categories/CategoryCard';
import { useCategories } from '../context/CategoryContext';

const Categories = () => {
  const { categories } = useCategories();

  return (
    <div className="min-h-screen bg-gray-50">
      <CategoryNav />
      <div className="max-w-7xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Token Categories
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;