// src/components/crypto/CryptoList.jsx
import React, { useState } from 'react';
import CryptoCard from './CryptoCard';

function CryptoList({ cryptos, categories }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('marketCap');

  const filteredCryptos = cryptos.filter(crypto => 
    selectedCategory === 'all' || crypto.categories.includes(selectedCategory)
  );

  const sortedCryptos = [...filteredCryptos].sort((a, b) => {
    switch (sortBy) {
      case 'marketCap':
        return b.marketCap - a.marketCap;
      case 'rating':
        return b.avgRating - a.avgRating;
      case 'reviews':
        return b.reviewCount - a.reviewCount;
      default:
        return 0;
    }
  });

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="marketCap">Market Cap</option>
          <option value="rating">Rating</option>
          <option value="reviews">Review Count</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedCryptos.map(crypto => (
          <CryptoCard key={crypto.id} crypto={crypto} />
        ))}
      </div>
    </div>
  );
}

export default CryptoList;