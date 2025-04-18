
import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFavorites } from '../../context/favoritesContext';
import { useAuthContext } from '../../context/authContext';
import Notification from './Notification';

const ActionButton = ({ product }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { isAuthenticated } = useAuthContext();
  const [isFav, setIsFav] = useState(false);
  const [checking, setChecking] = useState(true);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  // Check if the product is already favorited on component mount
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (isAuthenticated && product && product._id) {
        const favStatus = await isFavorite(product._id);
        setIsFav(favStatus);
      }
      setChecking(false);
    };

    checkFavoriteStatus();
  }, [isAuthenticated, product, isFavorite]);

  const handleToggleFavorite = async () => {

    if (!isAuthenticated) {
      setNotification({
        show: true,
        message: 'Trebuie să fii autentificat pentru a adăuga produse la favorite',
        type: 'error',
      });
      setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 3000);
      return;
    }

    if (!product || !product._id) {
      setNotification({
        show: true,
        message: 'Nu se poate adăuga la favorite',
        type: 'error',
      });
      setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 3000);
      return;
    }

    try {
      if (isFav) {
        await removeFromFavorites(product._id);
        setIsFav(false);
        setNotification({
          show: true,
          message: 'Produs eliminat din favorite',
          type: 'success',
        });
      } else {
        await addToFavorites(product._id);
        setIsFav(true);
        setNotification({
          show: true,
          message: 'Produs adăugat la favorite',
          type: 'success',
        });
      }
      setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 3000);
    } catch (error) {
      console.error('Eroare la actualizarea favoritelor:', error);
      setNotification({
        show: true,
        message: 'A apărut o eroare. Încearcă din nou.',
        type: 'error',
      });
      setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 3000);
    }
  };

  return (
    <>
      <motion.button
        key="favorite"
        onClick={handleToggleFavorite}
        disabled={checking}
        aria-label={isFav ? 'Elimină de la favorite' : 'Adaugă la favorite'}
        style={{ border: 'none', outline: 'none' }}
        className={`p-2.5 rounded-full ${
          isFav ? 'bg-[#8B5E3B] text-white' : 'text-[#8B5E3B] bg-transparent'
        } hover:bg-[#F3D9CA] transition-all duration-300`}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
      >
        <Heart
          className="h-5 w-5"
          fill={isFav ? '#8B5E3B' : 'none'}
          stroke={isFav ? 'white' : '#8B5E3B'}
        />
      </motion.button>
      <Notification show={notification.show} message={notification.message} type={notification.type} />
    </>
  );
};

export default ActionButton;