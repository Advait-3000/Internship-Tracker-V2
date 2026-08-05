import React, { useState } from 'react';
import { Star } from 'lucide-react';

const MentorReviewForm = ({ studentName }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState('');

  return (
    <div className="space-y-5">
      <div>
         <label className="flex items-center justify-between text-sm font-semibold text-gray-900 mb-2">
           <span>Overall Rating</span>
           <span className="text-xs text-gray-500 font-normal">{rating > 0 ? `${rating} Stars` : 'Select stars'}</span>
         </label>
         <div className="flex gap-1.5 p-3 bg-white rounded-xl border border-gray-100 shadow-sm inline-flex">
            {[1, 2, 3, 4, 5].map(star => (
              <button 
                key={star} 
                className={`transition-colors cursor-pointer ${
                  (hoverRating || rating) >= star ? 'text-amber-400' : 'text-gray-200'
                } hover:text-amber-400`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              >
                <Star className={`w-7 h-7 ${(hoverRating || rating) >= star ? 'fill-current' : ''}`} />
              </button>
            ))}
         </div>
      </div>
      <div>
         <label className="block text-sm font-semibold text-gray-900 mb-2">Performance Review</label>
         <textarea 
           className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm resize-none"
           rows="3"
           value={review}
           onChange={(e) => setReview(e.target.value)}
           placeholder={`Describe ${studentName}'s performance this week...`}
         ></textarea>
      </div>
      <button 
        className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 transition-all active:scale-95 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={rating === 0 || review.trim() === ''}
      >
         Submit Evaluation
      </button>
    </div>
  );
};

export default MentorReviewForm;
