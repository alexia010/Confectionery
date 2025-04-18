
// services/api/index.js
import axios from 'axios';

// Creează o instanță Axios cu configurări implicite
const apiClient = axios.create({
  // baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // Important pentru trimiterea cookie-urilor cu cereri
});

// Interceptor pentru cereri - adaugă token-ul de autentificare
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      delete config.headers['Content-Type'];
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor pentru răspunsuri - tratează erorile de autentificare
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Tratează erorile 401 (neautorizat)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);


export default apiClient;