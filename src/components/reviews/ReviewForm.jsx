// src/components/reviews/ReviewForm.jsx
import React, { useState } from 'react';
import Rating from '../common/Rating';

function ReviewForm({ onSubmit, initialData = null }) {
  const [rating, setRating] = useState(initialData?.rating || 0);
  const [content, setContent] = useState(initialData?.content || '');
  const [tags, setTags] = useState(initialData?.tags || []);
  const [tagInput, setTagInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ rating, content, tags });
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-gray-700 mb-2">Rating</label>
        <Rating
          value={rating}
          onChange={setRating}
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Review</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg resize-none h-32"
          placeholder="Share your thoughts about this cryptocurrency..."
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Tags</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map(tag => (
            <span
              key={tag}
              className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-sm flex items-center"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-2 text-indigo-600 hover:text-indigo-800"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-l-lg"
            placeholder="Add tags..."
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="px-4 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700"
          >
            Add
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        {initialData ? 'Update Review' : 'Submit Review'}
      </button>
    </form>
  );
}

export default ReviewForm;