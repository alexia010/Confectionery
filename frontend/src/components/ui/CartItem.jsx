

import React from "react";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus } from "lucide-react";
import { Button } from "./Button"; // Assuming you have a Button component

const CartItem = ({ item, increaseQuantity, decreaseQuantity, removeItem }) => {
  // Calculate subtotal for the item
  const subtotal = (item.price * item.quantity).toFixed(2);
  
  return (
    <div className="flex flex-col sm:flex-row sm:items-center py-4 sm:py-6 border-b border-gray-200">
      {/* Clickable Product Image with Fixed Size Wrapper */}
      <Link to={`/produs/${item.id}`} className="self-start">
        <div className="w-24 h-24 sm:w-32 sm:h-32 sm:mr-6 flex-shrink-0 mb-3 sm:mb-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      </Link>
      
      {/* Product Details and Trash Icon in Top Row */}
      <div className="flex-1">
        <div className="flex justify-between items-start">
          {/* Product Name and Price */}
          <div>
            <Link to={`/produs/${item.id}`}>
              <h3 className="text-base sm:text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors">
                {item.name}
              </h3>
            </Link>
            <p className="text-sm text-gray-600 mt-1">
              Preț: {item.price.toFixed(2)} RON
            </p>
          </div>
          
          {/* Trash icon positioned in top row */}
          <Button
            variant="link"
            onClick={() => removeItem(item.id)}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2"
            aria-label="Remove item"
          >
            <Trash2 className="w-5 h-5" />
          </Button>
        </div>
        
        {/* Subtotal and Quantity Controls */}
        <div className="mt-2">
          <p className="text-sm text-gray-600">
            Subtotal: {subtotal} RON
          </p>
          
          {/* Quantity Controls */}
          <div className="flex items-center space-x-3 mt-3">
            <Button
              variant="link"
              onClick={() => decreaseQuantity(item.id)}
              className="p-1 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors"
            >
              <Minus className="w-4 h-4 text-gray-600" />
            </Button>
            <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
            <Button
              variant="link"
              onClick={() => increaseQuantity(item.id)}
              className="p-1 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors"
            >
              <Plus className="w-4 h-4 text-gray-600" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;