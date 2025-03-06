// src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import ReviewCard from '../components/reviews/ReviewCard';

function Profile() {
  const { user, logout } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        const response = await api.get(`/users/${user.id}/reviews`);
        setReviews(response.data);
      } catch (error) {
        console.error('Failed to fetch user reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserReviews();
    }
  }, [user]);

  const handleReviewUpdate = (updatedReview) => {
    setReviews(prevReviews =>
      prevReviews.map(review =>
        review.id === updatedReview.id ? updatedReview : review
      )
    );
  };

  if (!user) {
    return (
      <div className="text-center">
        <p className="text-xl">Please login to view your profile</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-start space-x-4">
          <img 
            src={user.avatar || '/default-avatar.png'} 
            alt={user.username}
            className="w-20 h-20 rounded-full"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{user.username}</h1>
            <p className="text-gray-600">{user.email}</p>
            <p className="mt-2">Member since {new Date(user.createdAt).toLocaleDateString()}</p>
            <div className="mt-4">
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Your Reviews</h2>
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-600"></div>
          </div>
        ) : reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map(review => (
              <ReviewCard
                key={review.id}
                review={review}
                onUpdateReview={handleReviewUpdate}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">You haven't written any reviews yet.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;