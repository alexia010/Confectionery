// src/components/favorites/ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { X, ShoppingCart } from "lucide-react";
import { Button } from "./ui/Button";

const ProductCard = ({ product, removeFromFavorites, addToCart, isAddedToCart }) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <Link to={`/produs/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover"
          />
        </Link>
        <button
          onClick={() => removeFromFavorites(product.id)}
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300"
          title="Elimină din favorite"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">
          <Link
            to={`/produs/${product.id}`}
            className="!text-gray-800 !hover:text-[#E9A8B9] transition-colors duration-300"
          >
            {product.name}
          </Link>
        </h3>
        <p className="text-gray-600 mb-2">{product.category}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-lg font-bold">{product.price.toFixed(2)} RON</span>
          <Button
            onClick={() => addToCart(product.id)}
            disabled={isAddedToCart}
            className={`p-2 rounded-md ${
              isAddedToCart
                ? "bg-[#E9A8B9] text-white"
                : "bg-[#E9A8B9] hover:bg-[#e890a5] text-white"
            } transition-colors duration-300 flex items-center`}
          >
            {isAddedToCart ? (
              <>
                <span className="mr-1">Adăugat</span>
                <ShoppingCart className="w-4 h-4" />
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;