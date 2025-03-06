// src/components/categories/CategoryCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  return (
    <Link 
      to={`/category/${category.id}`}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
    >
      <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
      <p className="text-gray-500 mt-2">{category.description}</p>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-sm text-gray-600">
          {category.tokenCount} Tokens
        </span>
        <span className="text-blue-600 text-sm">View Rankings →</span>
      </div>
    </Link>
  );
};

export default CategoryCard;