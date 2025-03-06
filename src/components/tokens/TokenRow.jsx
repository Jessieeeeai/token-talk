// src/components/tokens/TokenRow.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const formatNumber = (num) => {
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  return `$${num.toFixed(2)}`;
};

const TokenRow = ({ token }) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {token.rank}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Link to={`/token/${token.id}`} className="flex items-center">
          <img
            src={`/assets/icons/${token.symbol.toLowerCase()}.png`}
            alt={token.symbol}
            className="w-8 h-8 rounded-full"
          />
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{token.name}</div>
            <div className="text-sm text-gray-500">{token.symbol}</div>
          </div>
        </Link>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {formatNumber(token.price)}
      </td>
      <td className={`px-6 py-4 whitespace-nowrap text-sm ${
        token.change24h >= 0 ? 'text-green-600' : 'text-red-600'
      }`}>
        {token.change24h > 0 ? '+' : ''}{token.change24h.toFixed(2)}%
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {formatNumber(token.marketCap)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {formatNumber(token.volume)}
      </td>
    </tr>
  );
};

export default TokenRow;