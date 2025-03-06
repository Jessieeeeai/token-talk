// src/pages/CryptoDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import { ws } from '../services/ws';
import Rating from '../components/common/Rating';
import ReviewCard from '../components/reviews/ReviewCard';
import ReviewForm from '../components/reviews/ReviewForm';
import { useAuth } from '../context/AuthContext';

function CryptoDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [crypto, setCrypto] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cryptoRes, reviewsRes] = await Promise.all([
          api.get(`/crypto/${id}`),
          api.get(`/reviews/${id}`)
        ]);
        setCrypto(cryptoRes.data);
        setReviews(reviewsRes.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    ws.subscribe('crypto:price-update', (data) => {
      if (data.cryptoId === id) {
        setCrypto(prev => ({ ...prev, ...data.updates }));
      }
    });

    return () => {
      ws.unsubscribe('crypto:price-update');
    };
  }, [id]);

  const handleReviewSubmit = async (reviewData) => {
    try {
      const response = await api.post('/reviews', {
        cryptoId: id,
        ...reviewData
      });
      setReviews([response.data, ...reviews]);
      setShowReviewForm(false);
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
  };

  const handleReviewUpdate = (updatedReview) => {
    setReviews(prevReviews =>
      prevReviews.map(review =>
        review.id === updatedReview.id ? updatedReview : review
      )
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!crypto) {
    return <div>Cryptocurrency not found</div>;
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">{crypto.name}</h1>
            <p className="text-gray-500">{crypto.symbol}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">${crypto.price.toLocaleString()}</p>
            <p className={`text-lg ${crypto.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {crypto.priceChange24h > 0 ? '+' : ''}{crypto.priceChange24h.toFixed(2)}%
            </p>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center space-x-4">
            <Rating value={crypto.avgRating} readOnly />
            <span className="text-gray-600">({crypto.reviewCount} reviews)</span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {crypto.categories.map(category => (
            <span
              key={category}
              className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full"
            >
              {category}
            </span>
          ))}
        </div>

        <p className="mt-6 text-gray-700">{crypto.description}</p>
      </div>

      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Reviews</h2>
          {user && !showReviewForm && (
            <button
              onClick={() => setShowReviewForm(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Write a Review
            </button>
          )}
        </div>

        {showReviewForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <ReviewForm onSubmit={handleReviewSubmit} />
          </div>
        )}

        <div className="space-y-4">
          {reviews.map(review => (
            <ReviewCard
              key={review.id}
              review={review}
              onUpdateReview={handleReviewUpdate}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CryptoDetail;