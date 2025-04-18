

import React, { useState } from 'react';
import { Button } from './Button';
import Notification from './Notification';
import { useAuthContext } from '../../context/authContext';
import { productService } from '../../services/productService';

const ReviewForm = ({ product, onReviewAdded }) => {
  const { currentUser, isAuthenticated } = useAuthContext();
  const [review, setReview] = useState({
    rating: 0,
    text: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validare: recenzie goală
    if (!review.text.trim()) {
      setNotification({
        show: true,
        message: 'Vă rugăm să completați recenzia.',
        type: 'error',
      });
      setTimeout(() => {
        setNotification((prev) => ({ ...prev, show: false }));
      }, 3000);
      return;
    }

    // Validare: rating minim
    if (review.rating < 1) {
      setNotification({
        show: true,
        message: 'Vă rugăm să selectați cel puțin o stea pentru rating.',
        type: 'error',
      });
      setTimeout(() => {
        setNotification((prev) => ({ ...prev, show: false }));
      }, 3000);
      return;
    }

    // Validare: autentificare
    if (!isAuthenticated || !currentUser || !currentUser._id) {
      setNotification({
        show: true,
        message: 'Trebuie să fii logat pentru a lăsa o recenzie.',
        type: 'error',
      });
      setTimeout(() => {
        setNotification((prev) => ({ ...prev, show: false }));
      }, 3000);
      return;
    }

    // Validare: produs valid
    if (!product || !product._id) {
      setNotification({
        show: true,
        message: 'Produsul nu este valid.',
        type: 'error',
      });
      setTimeout(() => {
        setNotification((prev) => ({ ...prev, show: false }));
      }, 3000);
      return;
    }

    setIsSubmitting(true);

    try {
      const reviewData = {
        rating: review.rating,
        comment: review.text,
      };

      // Trimite recenzie la server
      const response = await productService.addReview(product._id, reviewData);
      console.log('API Response:', response);

      // Construiește obiectul recenzie local
      const newReview = {
        id: response?.data?._id || response?._id || Date.now().toString(),
        rating: review.rating,
        comment: review.text,
        user: {
          name: currentUser.name || 'Utilizator',
          _id: currentUser._id,
        },
        createdAt: new Date().toISOString(),
      };

      // Actualizează componenta părinte
      if (onReviewAdded) {
        onReviewAdded(newReview);
      }

      // Afișează notificare de succes
      setNotification({
        show: true,
        message: 'Recenzie trimisă cu succes!',
        type: 'success',
      });
      setTimeout(() => {
        setNotification((prev) => ({ ...prev, show: false }));
      }, 3000);

      // Resetează formularul
      setReview({
        rating: 0,
        text: '',
      });
    } catch (error) {
      console.error('Eroare la trimiterea recenziei:', error);
      setNotification({
        show: true,
        message: 'A apărut o eroare la trimiterea recenziei.',
        type: 'error',
      });
      setTimeout(() => {
        setNotification((prev) => ({ ...prev, show: false }));
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 p-4 md:p-6 rounded-lg">
      <Notification
        show={notification.show}
        message={notification.message}
        type={notification.type}
      />
      <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-3 md:mb-4 text-gray-900">
        Adaugă o recenzie
      </h3>
      <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rating
          </label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Button
                variant="link"
                key={star}
                type="button"
                onClick={() =>
                  setReview((prev) => ({
                    ...prev,
                    rating: star,
                  }))
                }
                className="text-xl md:text-2xl lg:text-3xl transition-colors duration-200 
                           focus:outline-none text-yellow-500 hover:text-yellow-400 p-0 mr-1 md:mr-2"
              >
                {review.rating >= star ? '★' : '☆'}
              </Button>
            ))}
          </div>
        </div>
        <div>
          <label
            htmlFor="review-text"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Recenzie
          </label>
          <textarea
            id="review-text"
            value={review.text}
            onChange={(e) =>
              setReview((prev) => ({
                ...prev,
                text: e.target.value,
              }))
            }
            className="w-full px-3 py-2 border text-black rounded-md"
            rows="3"
            placeholder="Scrie recenzia ta..."
            required
          ></textarea>
        </div>
        <Button
          type="submit"
          className="text-sm md:text-base py-1.5 px-3 md:py-2 md:px-4"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Se trimite...' : 'Trimite Recenzie'}
        </Button>
      </form>
    </div>
  );
};

export default ReviewForm