// services/api/endpoints.js

import apiClient from './index';

// Endpoint-uri pentru autentificare și utilizatori
export const userEndpoints = {
  getCurrentUser: () => apiClient.get('/auth/check-auth'),
  login: (credentials) => apiClient.post('/auth/login', credentials),
  register: (userData) => apiClient.post('/auth/signup', userData),
  logout: () => apiClient.post('/auth/logout'),

  //ADAUGAT
  updateCurrentProfile: (userData) => apiClient.post('/auth/me', userData),
  deleteAccount: () => apiClient.delete('/auth/me'),
  
  // Funcții admin
  getAllUsers: () => apiClient.get('/auth'),
  // updateUserRole: (roleData) => apiClient.post('/auth/role', roleData),
  // updatePassword: (passwordData) => apiClient.post('/auth/password', passwordData),
  deleteUser: (userId) => apiClient.delete(`/auth/${userId}`),
  updateUserProfile: (userId, userData) =>  apiClient.patch(`/auth/${userId}`, userData),
  addUser: (userData) =>apiClient.post(`/auth/addUser`,userData)

};

// Endpoint-uri pentru produse
export const productEndpoints = {
  createProduct: (data) => apiClient.post('/product', data),
  getProductById: (id) => apiClient.get(`/product/${id}`),
  updateProduct: (id, data) => apiClient.patch(`/product/${id}`, data),
  deleteProduct: (id) => apiClient.delete(`/product/${id}`),
 // getAllProducts: () => apiClient.get('/product'),

  getAllProducts: (includeHidden = false) => apiClient.get(`/product?includeHidden=${includeHidden}`),
 
  getProductsMinimal: () => apiClient.get('/product/minimal'),
  getProductEnums: () => apiClient.get('/product/enums'),
  addReview: (id,reviewData) => apiClient.post(`/product/${id}/reviews`, reviewData),
  toggleVisibility: (id, visible) => apiClient.patch(`/product/${id}/visibility`, { visible }),
  deleteReview: (productId, reviewId) => apiClient.delete(`/product/${productId}/reviews/${reviewId}`),
};


// Endpoint-uri pentru favorite
export const favoriteEndpoints = {
  getFavorites: () => apiClient.get('/favorites'),
  addToFavorites: (productId) => apiClient.post(`/favorites/${productId}`),
  removeFromFavorites: (productId) => apiClient.delete(`/favorites/${productId}`),
  checkIsFavorite: (productId) => apiClient.get(`/favorites/check/${productId}`)
};


export const cartEndpoints = {
  getCartItems: () => apiClient.get('/cart'),
  addToCart: (productId, quantity) => apiClient.post('/cart/add', { productId, quantity }),
  updateCartItemQuantity: (productId, quantity) => apiClient.put('/cart/update', { productId, quantity }),
  removeFromCart: (productId) => apiClient.delete(`/cart/remove?productId=${productId}`),
  clearCart: () => apiClient.delete('/cart/clear')
};

export const homepageEndpoints = {
  // Obține datele complete pentru homepage
  getHomepageData: () => apiClient.get('/homepage'),
  
  // Obține produsele formatate pentru ProductCard
  getFormattedProducts: () => apiClient.get('/homepage/products'),
  
  // Obține recenziile formatate pentru TestimonialCard
  getFormattedReviews: () => apiClient.get('/homepage/reviews'),
  
  // Administrare produse pe homepage
  addProductToHomepage: (productId) => apiClient.post('/homepage/add-product', { productId }),
  deleteProductFromHomepage: (productId) => apiClient.delete('/homepage/delete-product', { data: { productId } }),
  updateProductsOrder: (produseOrdinea) => apiClient.patch('/homepage/update-product', { produseOrdinea }),
  
  // Administrare recenzii pe homepage
  addReviewToHomepage: (reviewId) => apiClient.post('/homepage/add-review', { reviewId }),
  deleteReviewFromHomepage: (reviewId) => apiClient.delete('/homepage/delete-review', { data: { reviewId } }),
  updateReviewsOrder: (reviewuriOrdinea) => apiClient.patch('/homepage/update-review', { reviewuriOrdinea })
};

export const orderEndpoints = {
  // Creare comandă nouă
  createOrder: (orderData) => apiClient.post('/orders', orderData),
  
  // Preluare comenzi pentru utilizatorul curent
  getUserOrders: () => apiClient.get('/orders/user/orders'),
  
  // Preluare comandă după ID
  getOrderById: (orderId) => apiClient.get(`/orders/${orderId}`),
  
  // Preluare toate comenzile (doar pentru admin)
  getAllOrders: (params) => apiClient.get('/orders', { params }),
  
  // Actualizare status comandă (doar pentru admin)
  updateOrderStatus: (orderId, statusData) => apiClient.patch(`/orders/${orderId}/status`, statusData),

  updateOrder: (orderId, orderData) => apiClient.patch(`/orders/${orderId}`, orderData)
};


export const dashboardEndpoints = {
  // Obține statisticile principale
  getStats: () => apiClient.get('/dashboard/stats'),
  
  // Obține datele de vânzări pentru perioada specificată
  getSalesData: (period = 'month') => apiClient.get('/dashboard/sales', { params: { period } }),
  
  // Obține distribuția vânzărilor pe categorii
  getSalesDistribution: () => apiClient.get('/dashboard/distribution'),
  
  // Obține ultimele comenzi
  getRecentOrders: (limit = 5) => apiClient.get('/dashboard/orders/recent', { params: { limit } }),
  
  // Obține produsele cele mai vândute
  // getTopProducts: (limit = 5) => apiClient.get('/dashboard/products/top', { params: { limit } })
};