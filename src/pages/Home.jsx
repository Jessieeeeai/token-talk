// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import CryptoList from '../components/crypto/CryptoList';
import { api } from '../services/api';
import { ws } from '../services/ws';

function Home() {
  const [cryptos, setCryptos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cryptosRes, categoriesRes] = await Promise.all([
          api.get('/crypto/list'),
          api.get('/crypto/categories')
        ]);
        setCryptos(cryptosRes.data);
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    ws.subscribe('crypto:price-update', (data) => {
      setCryptos(prevCryptos => 
        prevCryptos.map(crypto => 
          crypto.id === data.cryptoId 
            ? { ...crypto, ...data.updates }
            : crypto
        )
      );
    });

    return () => {
      ws.unsubscribe('crypto:price-update');
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Trending Cryptocurrencies</h1>
      <CryptoList cryptos={cryptos} categories={categories} />
    </div>
  );
}

export default Home;