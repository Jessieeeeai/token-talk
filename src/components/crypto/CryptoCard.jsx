// src/components/crypto/CryptoCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '../common/Rating';

function CryptoCard({ crypto }) {
  const {
    id,
    name,
    symbol,
    price,
    priceChange24h,
    avgRating,
    reviewCount,
    categories,
  } = crypto;

  return (
    <Link to={`/crypto/${id}`} className="block">
      <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold">{name}</h3>
            <p className="text-gray-500">{symbol}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold">${price.toLocaleString()}</p>
            <p className={`text-sm ${priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {priceChange24h > 0 ? '+' : ''}{priceChange24h.toFixed(2)}%
            </p>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex items-center space-x-2">
            <Rating value={avgRating} readOnly />
            <span className="text-gray-600">({reviewCount} reviews)</span>
          </div>
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          {categories.map((category) => (
            <span 
              key={category} 
              className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
            >
              {category}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default CryptoCard;