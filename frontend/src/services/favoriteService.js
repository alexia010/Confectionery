// src/services/FavoriteService.js
import { favoriteEndpoints } from './api/endpoints';
import { SERVER_IP } from '../config/constants';

class FavoriteService {
  /**
   * Obține toate produsele favorite ale utilizatorului autentificat
   */

  async getFavorites() {
    try {

  
      const response = await favoriteEndpoints.getFavorites();
      
      if (response.data && Array.isArray(response.data)) {
        response.data = response.data.map(favorite => {
          if (favorite.product && favorite.product.images && Array.isArray(favorite.product.images)) {
            favorite.product.images = favorite.product.images.map(img => {
              if (typeof img === 'string') {
                if (img.startsWith('http')) {
                  return img;
                }
                if (img.startsWith('/')) {
                  return `${SERVER_IP}${img}`;
                }
                return `${SERVER_IP}/uploads/${img}`;
              }
              return img;
            });
  
            if (favorite.product.images.length > 0) {
              favorite.product.image = favorite.product.images[0];
            }
          }
  
          console.log('Processed favorite image:', favorite.product?.image);
          return favorite;
        });
      }
  
      return response.data;
    } catch (error) {
      console.error('Eroare la obținerea favoritelor:', error);
      throw error;
    }
  }

  /**
   * Adaugă un produs la favorite
   * @param {string} productId - ID-ul produsului
   */
  async addToFavorites(productId) {
    try {
      const response = await favoriteEndpoints.addToFavorites(productId);
      return response.data;
    } catch (error) {
      console.error('Eroare la adăugarea în favorite:', error);
      throw error;
    }
  }

  /**
   * Elimină un produs din favorite
   * @param {string} productId - ID-ul produsului
   */
  async removeFromFavorites(productId) {
    try {
      const response = await favoriteEndpoints.removeFromFavorites(productId);
      return response.data;
    } catch (error) {
      console.error('Eroare la eliminarea din favorite:', error);
      throw error;
    }
  }

  /**
   * Verifică dacă un produs este în lista de favorite
   * @param {string} productId - ID-ul produsului
   */
  async checkIsFavorite(productId) {
    try {
      const response = await favoriteEndpoints.checkIsFavorite(productId);
      return response.data.isFavorite;
    } catch (error) {
      console.error('Eroare la verificarea favoritului:', error);
      return false; // Presupunem că nu este favorit în caz de eroare
    }
  }
}

export default new FavoriteService();