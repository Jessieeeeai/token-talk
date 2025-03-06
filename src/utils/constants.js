// src/utils/constants.js
// TODO: Replace with your actual API and WebSocket URLs
export const API_BASE_URL = 'http://localhost:3001/api';
export const WS_BASE_URL = 'ws://localhost:3001';

export const CRYPTO_CATEGORIES = [
  'DeFi',
  'NFT',
  'Layer 1',
  'Layer 2',
  'GameFi',
  'Metaverse',
  'Privacy',
  'Exchange',
  'Stablecoin',
  'DAO',
];

export const RATING_CRITERIA = {
  TECHNOLOGY: 'Technology & Innovation',
  TEAM: 'Team & Vision',
  COMMUNITY: 'Community & Support',
  TOKENOMICS: 'Tokenomics',
  UTILITY: 'Real-world Utility',
};

export const REVIEW_TAGS = [
  'Technical Analysis',
  'Fundamental Analysis',
  'Long-term Hold',
  'Short-term Trade',
  'High Risk',
  'Low Risk',
  'Beginner Friendly',
  'Expert Level',
  'Good Documentation',
  'Active Development',
  'Strong Community',
  'Innovative Technology',
];

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  AUTH_REQUIRED: 'Please login to perform this action.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  REVIEW_FAILED: 'Failed to submit review. Please try again.',
};

export const WEBSOCKET_EVENTS = {
  PRICE_UPDATE: 'crypto:price-update',
  NEW_REVIEW: 'review:new',
  NEW_COMMENT: 'review:comment',
  USER_NOTIFICATION: 'user:notification',
};