// src/contexts/ProductContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { productService } from '../services/productService';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [enums, setEnums] = useState({ categories: [], characteristics: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products and enums on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch enums
        const enumsResponse = await productService.getProductEnums();
        setEnums({
          categories: enumsResponse.data.categories || [],
          characteristics: enumsResponse.data.characteristics || [],
        });

        // Fetch all products (including hidden for admin)
        const fetchedProducts = await productService.getAllProducts(true);
        setProducts(fetchedProducts);
      } catch (err) {
        setError('Eroare la încărcarea datelor: ' + err.message);
        console.error('ProductContext error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to refetch products
  const refetchProducts = async () => {
    try {
      setLoading(true);
      const fetchedProducts = await productService.getAllProducts(true);
      setProducts(fetchedProducts);
    } catch (err) {
      setError('Eroare la reîncărcarea produselor: ' + err.message);
      console.error('Refetch products error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch a single product by ID
  const getProductById = async (id) => {
    try {
      const product = await productService.getProductById(id);
      return product;
    } catch (err) {
      console.error('Error fetching product by ID:', err);
      throw err;
    }
  };

  // Function to create a product
  const createProduct = async (productData, images) => {
    try {
      const newProduct = await productService.createProduct(productData, images);
      setProducts((prev) => [...prev, newProduct]);
      return newProduct;
    } catch (err) {
      console.error('Error creating product:', err);
      throw err;
    }
  };

  // Function to update a product
  const updateProduct = async (id, productData, images) => {
    try {
      const updatedProduct = await productService.updateProduct(id, productData, images);
      setProducts((prev) =>
        prev.map((product) => (product._id === id ? updatedProduct : product))
      );
      return updatedProduct;
    } catch (err) {
      console.error('Error updating product:', err);
      throw err;
    }
  };

  // Function to delete a product
  const deleteProduct = async (id) => {
    try {
      await productService.deleteProduct(id);
      setProducts((prev) => prev.filter((product) => product._id !== id));
    } catch (err) {
      console.error('Error deleting product:', err);
      throw err;
    }
  };

  // Function to add a review
  const addReview = async (productId, reviewData) => {
    try {
      const response = await productService.addReview(productId, reviewData);
      await refetchProducts();
      return response;
    } catch (err) {
      console.error('Error adding review:', err);
      throw err;
    }
  };

  // Function to toggle product visibility
  const toggleVisibility = async (id, visible) => {
    try {
      const response = await productService.toggleVisibility(id, visible);
      setProducts((prev) =>
        prev.map((p) => (p._id === id ? { ...p, visible } : p))
      );
      return response;
    } catch (err) {
      console.error('Error toggling visibility:', err);
      throw err;
    }
  };

  // Function to delete a review
  const deleteReview = async (productId, reviewId) => {
    try {
      const response = await productService.deleteReview(productId, reviewId);
      setProducts((prev) =>
        prev.map((product) =>
          product._id === productId
            ? {
                ...product,
                reviews: product.reviews.filter((review) => review._id !== reviewId),
              }
            : product
        )
      );
      return response;
    } catch (err) {
      console.error('Error deleting review:', err);
      throw err;
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        enums,
        loading,
        error,
        refetchProducts,
        getProductById,
        createProduct,
        updateProduct,
        deleteProduct,
        addReview,
        toggleVisibility,
        deleteReview,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductsContext = () => useContext(ProductContext);