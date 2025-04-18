import React from 'react';
import RatingStars from './ui/RatingStars';
import ProductTags from './ui/ProductTags';
import { formatPrice } from '../utils/productFormatter';

const ProductInfo = ({ product }) => {
  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-0"> {/* padding adăugat pentru mobil */}
      <div>
        <span className="text-sm uppercase tracking-wider text-[#8B5E3B] font-medium">
          {product.category}
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-gray-900 mt-3 leading-tight tracking-tight break-words whitespace-normal">
          {product.name}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <RatingStars rating={product.rating} showValue={false} />
        <span className="text-sm text-gray-600">({product.numReviews} recenzii)</span>
      </div>

      <div className="text-2xl text-black tracking-tight">
        {formatPrice(product.price,{decimals:0})}
      </div>

      <p className="text-gray-700 leading-relaxed text-lg">
        {product.description}
      </p>

      <ProductTags tags={product.tags} />
    </div>
  );
};

export default ProductInfo;
