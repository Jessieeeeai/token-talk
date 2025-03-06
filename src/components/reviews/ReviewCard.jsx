// src/components/reviews/ReviewCard.jsx
import React, { useState } from 'react';
import Rating from '../common/Rating';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';

function ReviewCard({ review, onUpdateReview }) {
  const { user } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const [comment, setComment] = useState('');

  const handleLike = async () => {
    if (!user) return;
    const response = await api.post(`/reviews/${review.id}/like`);
    onUpdateReview(response.data);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!user || !comment.trim()) return;
    
    const response = await api.post(`/reviews/${review.id}/comment`, {
      content: comment
    });
    onUpdateReview(response.data);
    setComment('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <img
            src={review.user.avatar}
            alt={review.user.username}
            className="w-10 h-10 rounded-full"
          />
          <div className="ml-3">
            <p className="font-semibold">{review.user.username}</p>
            <Rating value={review.rating} readOnly />
          </div>
        </div>
        <span className="text-gray-500 text-sm">
          {new Date(review.createdAt).toLocaleDateString()}
        </span>
      </div>

      <p className={`mt-3 ${isExpanded ? '' : 'line-clamp-3'}`}>
        {review.content}
      </p>
      {review.content.length > 200 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-indigo-600 text-sm mt-1"
        >
          {isExpanded ? 'Show less' : 'Read more'}
        </button>
      )}

      <div className="mt-4 flex items-center space-x-4">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-1 ${
            review.liked ? 'text-indigo-600' : 'text-gray-500'
          }`}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
          </svg>
          <span>{review.likes}</span>
        </button>
      </div>

      {review.comments.length > 0 && (
        <div className="mt-4 space-y-2">
          {review.comments.map(comment => (
            <div key={comment.id} className="bg-gray-50 p-3 rounded">
              <div className="flex items-center">
                <img
                  src={comment.user.avatar}
                  alt={comment.user.username}
                  className="w-6 h-6 rounded-full"
                />
                <span className="ml-2 font-semibold text-sm">
                  {comment.user.username}
                </span>
              </div>
              <p className="mt-1 text-sm">{comment.content}</p>
            </div>
          ))}
        </div>
      )}

      {user && (
        <form onSubmit={handleComment} className="mt-4">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full px-3 py-2 border rounded-lg"
          />
        </form>
      )}
    </div>
  );
}

export default ReviewCard;