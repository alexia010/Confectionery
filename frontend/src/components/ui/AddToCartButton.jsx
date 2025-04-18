
import React, { useState } from 'react';
import { Button } from './Button';
import { useCart } from '../../context/cartContext';
import Notification from './Notification';  // Importă componentul Notification

const AddToCartButton = ({
  product,
  quantity = 1,
  children = 'Adaugă în coș',
  variant = 'primary',
  className = '',
  ...props
}) => {
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  const handleAddToCart = async () => {
    if (!product || !product._id) {
      setNotification({
        show: true,
        message: 'Nu se poate adăuga produsul în coș',
        type: 'error',  // Setează tipul notificării la eroare
      });

      setTimeout(() => {
        setNotification({ show: false, message: '', type: 'success' });
      }, 3000);
      return;
    }

    try {
      setLoading(true);
      const success = await addToCart(product._id, quantity);
      
      setNotification({
        show: true,
        message: `${product.name} a fost adăugat în coș!`,
        type: 'success',  // Setează tipul notificării la succes
      });

      setTimeout(() => {
        setNotification({ show: false, message: '', type: 'success' });
      }, 3000);
    } catch (error) {
      console.error('Eroare la adăugarea în coș:', error);

      setNotification({
        show: true,
        message: `${product.name} nu a putut fi adăugat în coș!`,
        type: 'error',  // Setează tipul notificării la eroare
      });

      setTimeout(() => {
        setNotification({ show: false, message: '', type: 'success' });
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={handleAddToCart}
        variant={variant}
        className={`justify-center ${className}`}
        disabled={loading}
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
        </svg>
        {loading ? 'Se adaugă...' : children}
      </Button>

      <Notification 
        show={notification.show} 
        message={notification.message} 
        type={notification.type} 
      />
    </>
  );
};

export default AddToCartButton;
