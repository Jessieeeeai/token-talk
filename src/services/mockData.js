// src/services/mockData.js
export const mockCategories = [
  {
    id: 'defi',
    name: 'DeFi',
    description: 'Decentralized Finance Tokens',
    tokenCount: 150
  },
  {
    id: 'nft',
    name: 'NFT',
    description: 'Non-Fungible Token Projects',
    tokenCount: 120
  },
  {
    id: 'metaverse',
    name: 'Metaverse',
    description: 'Virtual World and Gaming Tokens',
    tokenCount: 80
  },
  {
    id: 'gamefi',
    name: 'GameFi',
    description: 'Gaming and Finance Projects',
    tokenCount: 100
  },
  {
    id: 'layer1',
    name: 'Layer-1',
    description: 'Base Layer Blockchain Platforms',
    tokenCount: 50
  },
  {
    id: 'layer2',
    name: 'Layer-2',
    description: 'Scaling Solution Tokens',
    tokenCount: 40
  }
];

export const mockTokens = {
  defi: [
    {
      id: 'uniswap',
      symbol: 'UNI',
      name: 'Uniswap',
      price: 5.23,
      change24h: 2.5,
      marketCap: 3900000000,
      volume: 150000000,
      rank: 1
    },
    // Add more tokens...
  ],
  // Add more categories...
};