import { homepageEndpoints } from './api/endpoints';
import { SERVER_IP } from '../config/constants';

class HomepageService {
  constructor() {
    this.baseUrl = SERVER_IP;
  }

  // Procesează calea imaginilor pentru a include SERVER_IP când este necesar
  processImageUrl(img) {
    if (typeof img === 'string') {
      if (img.startsWith('http')) {
        return img;
      }
      if (img.startsWith('/')) {
        return `${this.baseUrl}${img}`;
      }
      return `${this.baseUrl}/uploads/${img}`;
    }
    return img;
  }

  // Procesează toate imaginile dintr-un produs
  processProductImages(product) {
    if (!product) return product;

    const processedProduct = {...product};
    
    // Procesează imaginea principală (pentru ProductCard)
    if (processedProduct.image) {
      processedProduct.image = this.processImageUrl(processedProduct.image);
    }
    
    // Procesează array-ul de imagini (pentru pagina de detalii produs)
    if (processedProduct.images && Array.isArray(processedProduct.images)) {
      processedProduct.images = processedProduct.images.map(img => this.processImageUrl(img));
    }
    
    return processedProduct;
  }

  // Procesează toate produsele dintr-un array
  processProductsList(products) {
    if (!products || !Array.isArray(products)) return [];
    return products.map(product => this.processProductImages(product));
  }

  // Obține toate datele pentru pagina de start
  async getHomepageData() {
    try {
      const response = await homepageEndpoints.getHomepageData();
      
      // Procesează imaginile produselor din response
      if (response.data && response.data.homepage && response.data.homepage.produse) {
        response.data.homepage.produse = this.processProductsList(response.data.homepage.produse);
      }
      
      return response.data;
    } catch (error) {
      console.error('Error fetching homepage data:', error);
      throw error;
    }
  }

  // Obține produsele formatate pentru ProductCard
  async getProductsForDisplay() {
    try {
      const response = await homepageEndpoints.getFormattedProducts();
      if (response.data && response.data.success) {
        // Procesează URL-urile imaginilor pentru toate produsele
        const processedProducts = this.processProductsList(response.data.products);
        return processedProducts;
      }
      return [];
    } catch (error) {
      console.error('Error fetching products for display:', error);
      throw error;
    }
  }

  // Obține recenziile formatate pentru TestimonialCard
  async getReviewsForDisplay() {
    try {
      const response = await homepageEndpoints.getFormattedReviews();
      if (response.data && response.data.success) {
        return response.data.reviews;
      }
      return [];
    } catch (error) {
      console.error('Error fetching reviews for display:', error);
      throw error;
    }
  }

  // Administrare produse pe homepage
  async addProductToHomepage(productId) {
    try {
      const response = await homepageEndpoints.addProductToHomepage(productId);
      return response.data;
    } catch (error) {
      console.error('Error adding product to homepage:', error);
      throw error;
    }
  }

  async removeProductFromHomepage(productId) {
    try {
      const response = await homepageEndpoints.deleteProductFromHomepage(productId);
      return response.data;
    } catch (error) {
      console.error('Error removing product from homepage:', error);
      throw error;
    }
  }

  async updateProductsOrder(productIds) {
    try {
      const response = await homepageEndpoints.updateProductsOrder(productIds);
      return response.data;
    } catch (error) {
      console.error('Error updating products order on homepage:', error);
      throw error;
    }
  }

  // Administrare recenzii pe homepage
  async addReviewToHomepage(reviewId) {
    try {
      const response = await homepageEndpoints.addReviewToHomepage(reviewId);
      return response.data;
    } catch (error) {
      console.error('Error adding review to homepage:', error);
      throw error;
    }
  }

  async removeReviewFromHomepage(reviewId) {
    try {
      const response = await homepageEndpoints.deleteReviewFromHomepage(reviewId);
      return response.data;
    } catch (error) {
      console.error('Error removing review from homepage:', error);
      throw error;
    }
  }

  async updateReviewsOrder(reviewIds) {
    try {
      const response = await homepageEndpoints.updateReviewsOrder(reviewIds);
      return response.data;
    } catch (error) {
      console.error('Error updating reviews order on homepage:', error);
      throw error;
    }
  }
}

export default new HomepageService();