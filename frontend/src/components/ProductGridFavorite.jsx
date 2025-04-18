// src/components/favorites/ProductGrid.jsx
import React from "react";
import ProductCard from "./ProductCardFavorite";

const ProductGrid = ({ products, removeFromFavorites, addToCart, addedToCart }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          removeFromFavorites={removeFromFavorites}
          addToCart={addToCart}
          isAddedToCart={addedToCart[product._id]}
        />
      ))}
    </div>
  );
};

export default ProductGrid;