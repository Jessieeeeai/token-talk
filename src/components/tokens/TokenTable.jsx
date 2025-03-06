// src/components/tokens/TokenTable.jsx
import React, { useState } from 'react';
import TokenRow from './TokenRow';
import Table from '../common/Table';

const TokenTable = ({ tokens }) => {
  const [sortField, setSortField] = useState('rank');
  const [sortDirection, setSortDirection] = useState('asc');

  const columns = [
    { id: 'rank', label: '#', sortable: true },
    { id: 'name', label: 'Name', sortable: true },
    { id: 'price', label: 'Price', sortable: true },
    { id: 'change24h', label: '24h %', sortable: true },
    { id: 'marketCap', label: 'Market Cap', sortable: true },
    { id: 'volume', label: 'Volume(24h)', sortable: true }
  ];

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedTokens = [...tokens].sort((a, b) => {
    const multiplier = sortDirection === 'asc' ? 1 : -1;
    return a[sortField] > b[sortField] ? multiplier : -multiplier;
  });

  return (
    <Table 
      columns={columns}
      sortField={sortField}
      sortDirection={sortDirection}
      onSort={handleSort}
    >
      {sortedTokens.map((token) => (
        <TokenRow key={token.id} token={token} />
      ))}
    </Table>
  );
};

export default TokenTable;