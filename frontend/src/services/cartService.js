
import { cartEndpoints } from './api/endpoints';
import { SERVER_IP } from '../config/constants.js'

class CartService {
  /**
   * Obține toate produsele din coș
   */
  async getCartItems() {
    try {
      const response = await cartEndpoints.getCartItems();
      const items = response.data;
      console.log('Produse brute din coș:', items);
  
      const baseUrl = SERVER_IP;
  
      // Verifică dacă items este un array și nu este gol
      if (!Array.isArray(items)) {
        console.error('Datele primite nu sunt un array:', items);
        return [];
      }
  
      const updatedItems = items.map(item => {
        // Verifică structura item-ului și existența produsului
        if (!item || !item.product) {
          console.error('Item invalid în coș:', item);
          return item;
        }
  
        // Copie item pentru a evita modificarea directă
        const updatedItem = { ...item };
        
        // Procesează imaginile produsului
        if (updatedItem.product.images && Array.isArray(updatedItem.product.images)) {
          updatedItem.product.images = updatedItem.product.images.map(img => {
            if (typeof img === 'string') {
              if (img.startsWith('http')) {
                return img;
              }
              if (img.startsWith('/')) {
                return `${baseUrl}${img}`;
              }
              return `${baseUrl}/uploads/${img}`;
            }
            return img;
          });
        }
  
        return updatedItem;
      });
  
      console.log('Produse cu imagini procesate:', updatedItems);
      return updatedItems;
    } catch (error) {
      console.error('Eroare la obținerea produselor din coș:', {
        message: error.message,
        stack: error.stack,
        response: error.response
          ? {
              status: error.response.status,
              data: error.response.data,
            }
          : 'Niciun răspuns de la server',
      });
      throw error;
    }
  }
  
  /**
   * Adaugă un produs în coș
   * @param {string} productId - ID-ul produsului
   * @param {number} quantity - Cantitatea (implicit 1)
   */
  async addToCart(productId, quantity = 1) {
    try {
      const response = await cartEndpoints.addToCart(productId, quantity);
      return response.data;
    } catch (error) {
      console.error('Eroare la adăugarea în coș:', error);
      throw error;
    }
  }

  /**
   * Actualizează cantitatea unui produs din coș
   * @param {string} productId - ID-ul produsului
   * @param {number} quantity - Noua cantitate
   */
  async updateCartItemQuantity(productId, quantity) {
    try {
      const response = await cartEndpoints.updateCartItemQuantity(productId, quantity);
      return response.data;
    } catch (error) {
      console.error('Eroare la actualizarea cantității:', error);
      throw error;
    }
  }

  /**
   * Elimină un produs din coș
   * @param {string} productId - ID-ul produsului
   */
  async removeFromCart(productId) {
    try {
      const response = await cartEndpoints.removeFromCart(productId);
      return response.data;
    } catch (error) {
      console.error('Eroare la eliminarea din coș:', error);
      throw error;
    }
  }

  /**
   * Golește coșul
   */
  async clearCart() {
    try {
      const response = await cartEndpoints.clearCart();
      return response.data;
    } catch (error) {
      console.error('Eroare la golirea coșului:', error);
      throw error;
    }
  }

  /**
   * Obține ID-ul utilizatorului anonim din cookie
   * Notă: Acest ID este gestionat automat de backend prin middleware-ul initGuestId
   */
  getGuestId() {
    return document.cookie
      .split('; ')
      .find(row => row.startsWith('guest_id='))
      ?.split('=')[1];
  }
}

export default new CartService();