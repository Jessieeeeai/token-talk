// src/components/common/Rating.jsx
import React from 'react';

function Rating({ value, onChange, readOnly = false }) {
  const stars = [1, 2, 3, 4, 5];

  const handleClick = (rating) => {
    if (!readOnly && onChange) {
      onChange(rating);
    }
  };

  return (
    <div className="flex">
      {stars.map((star) => (
        <button
          key={star}
          type={readOnly ? 'button' : 'button'}
          onClick={() => handleClick(star)}
          className={`${readOnly ? 'cursor-default' : 'cursor-pointer'} p-1`}
          disabled={readOnly}
        >
          <svg
            className={`w-5 h-5 ${
              star <= value ? 'text-yellow-400' : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  );
}

export default Rating;