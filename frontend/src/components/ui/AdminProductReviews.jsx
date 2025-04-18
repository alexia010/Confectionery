
import React from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';
import RatingStars from '../ui/RatingStars';

const ProductReviews = ({ product, deleteReview }) => {
  const reviews = product.reviews || [];

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const averageRating = calculateAverageRating(reviews);

  const handleDeleteReview = (productId, reviewId) => {
    if (!window.confirm('Ești sigur că vrei să ștergi această recenzie?')) {
      return;
    }
    console.log(productId,reviewId);
    deleteReview(productId, reviewId);
  };

  return (
    <div className="py-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <h3 className="text-sm font-medium text-gray-700">Reviews</h3>
          <div className="ml-2">
            <RatingStars rating={averageRating} size="text-sm" />
          </div>
          <span className="ml-2 text-sm font-medium text-gray-600">
            ({reviews.length} {reviews.length === 1 ? 'recenzie' : 'recenzii'})
          </span>
        </div>
      </div>
      
      <div className="space-y-3">
        {reviews.length > 0 ? (
          reviews.map(review => (
            <div
              key={review._id}
              className="bg-white p-3 rounded border border-gray-100 shadow-sm flex justify-between"
            >
              <div>
                <div className="flex items-center">
                  <div className="text-black font-medium text-sm">
                    {review.user?.name || 'Utilizator'}
                  </div>
                  <div className="ml-2">
                    <RatingStars rating={review.rating} showValue={false} size="text-xs" />
                  </div>
                  <div className="ml-2 text-xs text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString('ro-RO')}
                  </div>
                </div>
                <div className="mt-1 text-sm text-gray-700">{review.comment}</div>
              </div>
              <Button
                variant="link"
                onClick={() => handleDeleteReview(product._id, review._id)}
                className="!text-red-500 !hover:text-red-700"
                title="Șterge recenzia"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center py-2 bg-gray-50 rounded">
            Nu există recenzii pentru acest produs.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductReviews;