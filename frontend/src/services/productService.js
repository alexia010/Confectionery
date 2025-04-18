
import { productEndpoints } from './api/endpoints';
import {SERVER_IP} from '../config/constants'

class ProductService {

  async createProduct(productData, images) {
    try {
      console.log('Imagini primite în createProduct:', images);

      const formData = new FormData();
      
      for (const key in productData) {
        if (key !== 'images') {
          if (Array.isArray(productData[key])) {
            formData.append(key, JSON.stringify(productData[key]));
          } else {
            formData.append(key, productData[key]);
          }
        }
      }
      
      if (images && Array.isArray(images) && images.length > 0) {
        images.forEach((image, index) => {
          console.log(`Adăugare imagine ${index}:`, image.name);
          formData.append('images', image); // Folosim 'images' pentru multer
        });
      }
      
      // Debugging FormData
      for (let [key, value] of formData.entries()) {
        console.log(`FormData - ${key}:`, value);
      }

      const response = await productEndpoints.createProduct(formData);
      console.log('Răspuns backend:', response.data);
      return response.data;
    } catch (error) {
      console.error('Eroare detaliată la crearea produsului:', {
        message: error.message,
        stack: error.stack,
        response: error.response
          ? {
              status: error.response.status,
              data: error.response.data,
            }
          : 'Nicio răspuns de la server',
      });
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const response = await productEndpoints.getProductById(id);
      console.log('Raw response from backend (single product):', response.data);
      
      const baseUrl = SERVER_IP;
      
      // Procesează imaginile pentru produsul individual
      if (response.data && response.data.images && Array.isArray(response.data.images)) {
        response.data.images = response.data.images.map(img => {
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
        
        // Setează imaginea principală ca prima imagine din array
        if (response.data.images.length > 0) {
          response.data.image = response.data.images[0];
        }
      }

      
      
      console.log('Processed product image:', response.data.image);
      return response.data;
    } catch (error) {
      console.error('Eroare la obținerea produsului:', error);
      throw error;
    }
  }

  async updateProduct(id, productData, newImages) {
    try {
      const formData = new FormData();
      
      // Adăugăm toate câmpurile non-imagine
      for (const key in productData) {
        if (key !== 'images') {
          if (Array.isArray(productData[key])) {
            formData.append(key, JSON.stringify(productData[key]));
          } else {
            formData.append(key, productData[key]);
          }
        }
      }
      
      // Adăugăm lista de imagini existente pe care dorim să le păstrăm
      if (productData.images && productData.images.length > 0) {
        formData.append('existingImages', JSON.stringify(productData.images));
      }
      
      // Adăugăm imaginile noi (dacă există)
      if (newImages && newImages.length > 0) {
        newImages.forEach((image) => {
          formData.append('images', image);
        });
      }
      
      // Log pentru debug
      console.log('FormData trimis la server:');
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${typeof value === 'object' ? 'File/Object' : value}`);
      }
      
      const response = await productEndpoints.updateProduct(id, formData);
      return response.data;
    } catch (error) {
      console.error('Eroare la actualizarea produsului:', error);
      
      // Log detaliat pentru erori
      if (error.response) {
        console.error('Răspuns server eroare:', {
          status: error.response.status,
          data: error.response.data
        });
      }
      throw error;
    }
  }
  /**
   * Șterge un produs după ID
   */
  async deleteProduct(id) {
    try {
      const response = await productEndpoints.deleteProduct(id);
      return response.data;
    } catch (error) {
      console.error('Eroare la ștergerea produsului:', error);
      throw error;
    }
  }

  async getAllProducts(includeHidden = false) {
    try {
      const response = await productEndpoints.getAllProducts(includeHidden);
      console.log('Raw response from backend:', response.data);
  
      const baseUrl = SERVER_IP;
  
      if (response.data && Array.isArray(response.data)) {
        response.data = response.data.map(product => {
          if (product.images && Array.isArray(product.images)) {
            product.images = product.images.map(img => {
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
            if (product.images.length > 0) {
              product.image = product.images[0];
            }
          }
          console.log('Processed product image:', product.image);
          return product;
        });
      }
      return response.data;
    } catch (error) {
      console.error('Eroare la obținerea produselor:', error);
      throw error;
    }
  }

  async getProductsMinimal() {
    try {
      const response = await productEndpoints.getProductsMinimal();
      console.log('Raw response from backend (minimal):', response.data);
  
      const baseUrl = SERVER_IP;
  
      if (response.data && Array.isArray(response.data)) {
        return response.data.map(product => {
          // Procesăm câmpul image
          let processedImage = '/placeholder.png'; // Valoare implicită
  
          if (product.image && typeof product.image === 'string') {
            if (product.image.startsWith('http')) {
              processedImage = product.image; // URL absolut, îl păstrăm
            } else if (product.image.startsWith('/')) {
              processedImage = `${baseUrl}${product.image}`; // Adăugăm baseUrl pentru URL-uri relative care încep cu /
            } else {
              processedImage = `${baseUrl}/uploads/${product.image}`; // Adăugăm baseUrl și calea uploads
            }
          }
  
          console.log('Processed product image in getProductsMinimal:', processedImage);
  
          return {
            _id: product._id,
            name: product.name,
            description: product.description,
            price: product.price,
            image: processedImage,
            category: product.category || 'Fără categorie',
            characteristics: product.characteristics || [],
            rating: 0,
          };
        });
      }
      return [];
    } catch (error) {
      console.error('Eroare la obținerea produselor minime:', error);
      throw error;
    }
  }
  
  async getProductEnums() {
    try {
      const response = await productEndpoints.getProductEnums();
      return response;
    } catch (error) {
      console.error('Eroare la obținerea enum-urilor:', error);
      throw error;
    }
  }

  async addReview(productId, reviewData) {
    try {
     
      const response = await productEndpoints.addReview(productId, reviewData);
      return response.data;
    } catch (error) {
      console.error('Eroare la adăugarea recenziei:', error);
      throw error;
    }
  }

  async toggleVisibility(id, visible) {
  try {
    const response = await productEndpoints.toggleVisibility(id, visible);
    return response.data;
  } catch (error) {
    console.error('Eroare la actualizarea vizibilității produsului:', error);
    throw error;
  }
  
  }

  async deleteReview(productId, reviewId) {
    try {
      console.log('pr id: %d, rev id:%d',productId,reviewId);
      const response = await productEndpoints.deleteReview(productId,reviewId);
      return response.data;
    } catch (error) {
      console.error(`Error deleting review ${reviewId} for product ${productId}:`, error);
      throw error;
    }
  }
}

export const productService = new ProductService();

