// src/components/categories/CategoryNav.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const categories = [
  { id: 'all', name: 'All' },
  { id: 'defi', name: 'DeFi' },
  { id: 'nft', name: 'NFT' },
  { id: 'metaverse', name: 'Metaverse' },
  { id: 'gamefi', name: 'GameFi' },
  { id: 'layer1', name: 'Layer-1' },
  { id: 'layer2', name: 'Layer-2' }
];

const CategoryNav = () => {
  const location = useLocation();
  const currentCategory = location.pathname.split('/')[2] || 'all';

  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex space-x-8 overflow-x-auto">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className={`py-4 px-3 inline-flex items-center border-b-2 text-sm font-medium whitespace-nowrap
                ${currentCategory === category.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default CategoryNav;