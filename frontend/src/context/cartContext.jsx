

// import React, { createContext, useState, useEffect, useContext } from 'react';
// import CartService from '../services/cartService';
// import { useAuthContext } from './authContext';

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { isAuthenticated, user } = useAuthContext();
  
//   // Încarcă coșul utilizatorului (autentificat sau anonim)
//   const fetchCart = async () => {
//     try {
//       setLoading(true);
//       const data = await CartService.getCartItems();
      
//       setCartItems(data);
//     } catch (error) {
//       console.error('Eroare la încărcarea coșului:', error);
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   // Adaugă un produs în coș
//   const addToCart = async (productId, quantity = 1) => {
//     try {
//       await CartService.addToCart(productId, quantity);
//       // Reîncarcă coșul pentru a actualiza lista
//       fetchCart();
//       return true;
//     } catch (error) {
//       console.error('Eroare la adăugarea în coș:', error);
//       return false;
//     }
//   };
  
//   // Actualizează cantitatea unui produs din coș
//   const updateCartItemQuantity = async (productId, quantity) => {
//     try {
//       await CartService.updateCartItemQuantity(productId, quantity);
//       // Actualizează starea locală
//       setCartItems(prevItems => 
//         prevItems.map(item =>
//           item.product._id === productId
//             ? { ...item, quantity }
//             : item
//         )
//       );
//     } catch (error) {
//       console.error('Eroare la actualizarea cantității:', error);
//     }
//   };
  
//   // Elimină un produs din coș
//   const removeFromCart = async (productId) => {
//     try {
//       await CartService.removeFromCart(productId);
//       // Actualizează starea locală
//       setCartItems(prevItems => 
//         prevItems.filter(item => item.product._id !== productId)
//       );
//     } catch (error) {
//       console.error('Eroare la eliminarea din coș:', error);
//     }
//   };
  
//   // Combină coșul anonim cu cel al utilizatorului autentificat
//   const mergeCart = async () => {
//     if (!isAuthenticated) return;
    
//     try {
//       // Obține guestId din cookie
//       const guestId = CartService.getGuestId();
      
//       if (guestId) {
//         await CartService.mergeCart(guestId);
//         // Reîncarcă coșul după combinare
//         fetchCart();
//       }
//     } catch (error) {
//       console.error('Eroare la combinarea coșurilor:', error);
//     }
//   };
  
//   // Golește coșul
//   const clearCart = async () => {
//     try {
//       await CartService.clearCart();
//       setCartItems([]);
//     } catch (error) {
//       console.error('Eroare la golirea coșului:', error);
//     }
//   };
  
//   // Calculează totalul coșului
//   const cartTotal = () => {
//     return cartItems.reduce((total, item) => {
//       return total + (item.product.price * item.quantity);
//     }, 0);
//   };
  
//   // Obține numărul de produse din coș
//   const cartItemsCount = () => {
//     return cartItems.reduce((count, item) => count + item.quantity, 0);
//   };
  
//   // Încarcă coșul când se încarcă pagina
//   useEffect(() => {
//     fetchCart();
//   }, []);
  
//   // Monitorizăm schimbările de autentificare
//   useEffect(() => {
//     // Dacă utilizatorul s-a autentificat, combinăm coșurile
//     if (isAuthenticated) {
//       mergeCart();
//     } else {
//       // Dacă utilizatorul s-a deconectat, reîncărcăm coșul pentru a avea coșul de guest
//       fetchCart();
//     }
//   }, [isAuthenticated]);
  
//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         loading,
//         addToCart,
//         updateCartItemQuantity,
//         removeFromCart,
//         clearCart,
//         cartTotal,
//         cartItemsCount,
//         fetchCart
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);


import React, { createContext, useState, useEffect, useContext } from 'react';
import CartService from '../services/cartService';
import { useAuthContext } from './authContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuthContext();
  
  // Încarcă coșul utilizatorului (autentificat sau anonim)
  const fetchCart = async () => {
    try {
      setLoading(true);
      const data = await CartService.getCartItems();
      
      setCartItems(data);
    } catch (error) {
      console.error('Eroare la încărcarea coșului:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Adaugă un produs în coș
  const addToCart = async (productId, quantity = 1) => {
    try {
      await CartService.addToCart(productId, quantity);
      // Reîncarcă coșul pentru a actualiza lista
      fetchCart();
      return true;
    } catch (error) {
      console.error('Eroare la adăugarea în coș:', error);
      return false;
    }
  };
  
  // Actualizează cantitatea unui produs din coș
  const updateCartItemQuantity = async (productId, quantity) => {
    try {
      await CartService.updateCartItemQuantity(productId, quantity);
      // Actualizează starea locală
      setCartItems(prevItems => 
        prevItems.map(item =>
          item.product._id === productId
            ? { ...item, quantity }
            : item
        )
      );
    } catch (error) {
      console.error('Eroare la actualizarea cantității:', error);
    }
  };
  
  // Elimină un produs din coș
  const removeFromCart = async (productId) => {
    try {
      await CartService.removeFromCart(productId);
      // Actualizează starea locală
      setCartItems(prevItems => 
        prevItems.filter(item => item.product._id !== productId)
      );
    } catch (error) {
      console.error('Eroare la eliminarea din coș:', error);
    }
  };
  
  // Golește coșul
  const clearCart = async () => {
    try {
      await CartService.clearCart();
      setCartItems([]);
    } catch (error) {
      console.error('Eroare la golirea coșului:', error);
    }
  };
  
  // Calculează totalul coșului
  const cartTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };
  
  // Obține numărul de produse din coș
  const cartItemsCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };
  
  // Încarcă coșul când se încarcă pagina
  useEffect(() => {
    fetchCart();
  }, []);
  
  // Reîncarcă coșul când starea de autentificare se schimbă
  useEffect(() => {
    fetchCart();
  }, [isAuthenticated]);
  
  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        addToCart,
        updateCartItemQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        cartItemsCount,
        fetchCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);