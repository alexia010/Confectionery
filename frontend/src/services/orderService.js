import { orderEndpoints } from './api/endpoints';
import { v4 as uuidv4 } from 'uuid';

class OrderService {
  /**
   * Creare comandă nouă
   * @param {Object} orderData - Datele comenzii
   * @returns {Promise} Răspunsul de la server cu detaliile comenzii
   */
 
  formatOrderData(formData, cartItems) {
    return {
      customerInfo: {
        firstName: formData.prenume,
        lastName: formData.nume,
        email: formData.email,
        phone: formData.telefon
      },
      shippingInfo: {
        address: formData.adresa,
        city: formData.oras,
        county: formData.judet,
        postalCode: formData.codPostal || '',
        deliveryDate: new Date(formData.dataLivrare),
        deliveryTimeSlot: formData.oraLivrare
      },
      paymentMethod: formData.metodaPlata,
      notes: formData.observatii,
      items: cartItems.map(item => ({
        productId: item.product._id,
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price
      })),
      shipping: 20,  // Taxa de livrare
      discount: 0
    };
  }

  /**
   * Plasează o comandă nouă
   * @param {Object} formData - Datele formularului
   * @param {Array} cartItems - Itemii din coș 
   * @returns {Promise} Răspunsul comenzii
   */
  async createOrder(formData, cartItems) {
    try {
      // Formatează datele pentru backend
      const orderData = this.formatOrderData(formData, cartItems);

      // Trimite comanda
      const response = await orderEndpoints.createOrder(orderData);
      
      return response.data;
    } catch (error) {
      console.error('Eroare la plasarea comenzii:', error);
      throw error;
    }
  }
  async getUserOrders() {
    try {
      const response = await orderEndpoints.getUserOrders();
      return response.data;
    } catch (error) {
      console.error('Eroare la preluarea comenzilor:', error);
      throw error;
    }
  }


  /**
   * Preluare detalii comandă după ID
   * @param {string} orderId - ID-ul comenzii
   * @returns {Promise} Detaliile comenzii
   */
  async getOrderById(orderId) {
    try {
      const response = await orderEndpoints.getOrderById(orderId);
      return response.data;
    } catch (error) {
      console.error(`Eroare la preluarea comenzii ${orderId}:`, error);
      throw error;
    }
  }

  /**
   * Preluare toate comenzile (pentru admin)
   * @param {Object} [params] - Parametri opționali pentru filtrare și paginare
   * @returns {Promise} Lista comenzilor
   */
  async getAllOrders(params = {}) {
    try {
      const response = await orderEndpoints.getAllOrders(params);
      return response.data;
    } catch (error) {
      console.error('Eroare la preluarea tuturor comenzilor:', error);
      throw error;
    }
  }

  /**
   * Actualizare status comandă (pentru admin)
   * @param {string} orderId - ID-ul comenzii
   * @param {Object} statusData - Datele pentru actualizarea statusului
   * @returns {Promise} Comanda actualizată
   */
  async updateOrderStatus(orderId, statusData) {
    try {
      const response = await orderEndpoints.updateOrderStatus(orderId, statusData);
      return response.data;
    } catch (error) {
      console.error(`Eroare la actualizarea statusului comenzii ${orderId}:`, error);
      throw error;
    }
  }

  /**
   * Verifică dacă utilizatorul are comenzi
   * @returns {Promise<boolean>} 
   */
  async hasOrders() {
    try {
      const orders = await this.getUserOrders();
      return orders.length > 0;
    } catch (error) {
      console.error('Eroare la verificarea comenzilor:', error);
      return false;
    }
  }
}


// async updateOrderStatus(orderId, updateData) {
//   try {
//     const response = await orderEndpoints.updateOrderStatus(orderId, updateData);
//     return response.data;
//   } catch (error) {
//     console.error(`Eroare la actualizarea comenzii ${orderId}:`, error);
//     throw error;
//   }
// }
 
export const orderService= new OrderService();

