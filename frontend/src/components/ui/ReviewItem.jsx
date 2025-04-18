import React from 'react';
import RatingStars from './RatingStars';

const ReviewItem = ({ review }) => {
  const {
    user: { name = 'Anonymous' } = {},
    date = '',
    rating = 0,
    comment = ''
  } = review || {};

  return (
    <div className="bg-white py-3 px-3 sm:px-4 border-b border-gray-100 last:border-b-0">
      <div className="flex flex-wrap justify-between items-start mb-1">
        <div className="font-semibold text-gray-800 text-sm sm:text-base">{name}</div>
        <div className="text-xs text-gray-500">{date}</div>
      </div>

      <div className="my-1.5">
        <RatingStars 
          rating={rating} 
          size="text-lg sm:text-xl" 
          showValue={false} 
        />
      </div>

      <p className="text-gray-700 text-sm mt-1.5 break-words">{comment}</p>
    </div>
  );
};

export default ReviewItem;