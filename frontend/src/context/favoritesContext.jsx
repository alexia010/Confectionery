import React, { createContext, useState, useEffect, useContext } from 'react';
import FavoriteService from '../services/favoriteService';
import { useAuthContext } from './authContext';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user } = useAuthContext();

  // Încarcă favoritele utilizatorului autentificat
  const fetchFavorites = async () => {
    if (!isAuthenticated) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await FavoriteService.getFavorites();
      // Transformă datele pentru a le aduce în formatul așteptat de componente
      console.log(data);
      const formattedFavorites = data.map(fav => ({
        id: fav.product._id,
        name: fav.product.name,
        price: fav.product.price,
        image: fav.product.images[0], // Presupunem că prima imagine este cea principală
        category: fav.product.category,
      }));
      setFavorites(formattedFavorites);
    } catch (error) {
      console.error('Eroare la încărcarea favoritelor:', error);
    } finally {
      setLoading(false);
    }
  };

  // Adaugă un produs la favorite
  const addToFavorites = async (productId) => {
    if (!isAuthenticated) {
      // Redirecționează la login sau arată un mesaj
      return;
    }

    try {
      await FavoriteService.addToFavorites(productId);
      // Reîncarcă favoritele pentru a actualiza lista
      fetchFavorites();
    } catch (error) {
      console.error('Eroare la adăugarea favoritului:', error);
    }
  };

  // Elimină un produs din favorite
  const removeFromFavorites = async (productId) => {
    try {
      await FavoriteService.removeFromFavorites(productId);
      // Actualizează starea locală pentru a reflecta schimbarea
      setFavorites(favorites.filter(item => item.id !== productId));
    } catch (error) {
      console.error('Eroare la eliminarea favoritului:', error);
    }
  };

  // Verifică dacă un produs este favorit
  const isFavorite = (productId) => {
    return favorites.some(item => item.id === productId);
  };

  // Încarcă favoritele când utilizatorul se autentifică
  useEffect(() => {
    fetchFavorites();
  }, [isAuthenticated, user]);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        loading,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        fetchFavorites
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);