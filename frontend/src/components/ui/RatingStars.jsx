import React from 'react';

const RatingStars = ({ rating = 0, showValue = true, size = 'text-2xl' }) => {
  // Ensure rating is a number between 0-5
  const normalizedRating = Math.min(Math.max(0, Number(rating) || 0), 5);
  
  const fullStars = Math.floor(normalizedRating);
  const hasHalfStar = normalizedRating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return (
    <div className={`flex items-center gap-0.5 flex-wrap ${size}`}>
      {/* Stele pline */}
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`} className="text-[#F5A9B8]">★</span>
      ))}
      
      {/* Stea pe jumătate - folosim un SVG special pentru jumătate de stea */}
      {hasHalfStar && (
        <span key="half" className="text-[#F5A9B8]" style={{ position: 'relative' }}>
          <span className="absolute text-[#F5A9B8]" style={{ clipPath: 'inset(0 50% 0 0)' }}>★</span>
          <span className="text-gray-300">☆</span>
        </span>
      )}
      
      {/* Stele goale */}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} className="text-gray-300">☆</span>
      ))}
      
      {showValue && normalizedRating > 0 && (
        <span className="ml-2 text-sm font-medium text-gray-700">
          ({normalizedRating.toFixed(1)})
        </span>
      )}
    </div>
  );
};

export default RatingStars;