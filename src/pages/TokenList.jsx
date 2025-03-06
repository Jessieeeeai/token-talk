// src/pages/TokenList.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CategoryNav from '../components/categories/CategoryNav';
import TokenTable from '../components/tokens/TokenTable';
import Filter from '../components/common/Filter';
import { useCategories } from '../context/CategoryContext';

const TokenList = () => {
  const { categoryId } = useParams();
  const { getTokensByCategory } = useCategories();
  const [filter, setFilter] = useState('all');

  const tokens = getTokensByCategory(categoryId);
  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'gainers', label: 'Top Gainers' },
    { value: 'losers', label: 'Top Losers' }
  ];

  const filteredTokens = tokens.filter((token) => {
    if (filter === 'gainers') return token.change24h > 0;
    if (filter === 'losers') return token.change24h < 0;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <CategoryNav />
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            {categoryId.charAt(0).toUpperCase() + categoryId.slice(1)} Tokens
          </h1>
          <Filter
            options={filterOptions}
            value={filter}
            onChange={setFilter}
          />
        </div>
        <div className="bg-white shadow-md rounded-lg">
          <TokenTable tokens={filteredTokens} />
        </div>
      </div>
    </div>
  );
};

export default TokenList;