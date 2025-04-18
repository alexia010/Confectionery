import React from 'react';
import AddToCartButton from './ui/AddToCartButton';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/productFormatter';

export const ProductCard = ({ product }) => {
  const handleButtonClick = (e) => {
    // Previne evenimentul de a se propaga către Link-ul părinte
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Link
      to={`/produs/${product._id}`}
      className="block w-full h-full product-card"
    >
      <div className="product-card bg-[#F5F5F5] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full">
        <div className="h-64 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
          />
        </div>
        
        <div className="p-6 flex flex-col h-[calc(100%-16rem)]">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-serif font-semibold text-[#000000]">{product.name}</h3>
            <span
              className="py-[5px] px-3 bg-[#8B5E3B] text-white text-[12px] font-medium rounded-xl whitespace-nowrap leading-none min-w-[60px] text-center"
            >
              {formatPrice(product.price, {decimals:0})}
            </span>
          </div>
          <p className="text-[#000000]/80 mb-4 text-sm flex-grow">
            {product.description.split(' ').slice(0, 20).join(' ')}...
          </p>

          {/* Buton de adăugare în coș */}
          <div 
            onClick={handleButtonClick} 
            className="mt-auto"
          >
            <AddToCartButton 
              product={{
                _id: product._id,
                name: product.name,
                price: product.price
              }}
              className="w-full justify-center bg-[#8B5E3B] hover:bg-[#5A3C25] text-white py-4 text-lg font-medium"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;