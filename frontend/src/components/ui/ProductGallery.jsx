// components/ProductGallery.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { useEffect } from 'react';
const ProductGallery = ({ images, productName }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

 

  return (
    <div className="space-y-6">
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-xl bg-gradient-to-br from-gray-50 to-gray-100">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeImageIndex}
            src={images[activeImageIndex]}
            alt={productName}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        </AnimatePresence>
      </div>
      <div className="flex gap-4 justify-center">
        {images.map((img, index) => (
          <motion.div
            key={index}
            onClick={() => setActiveImageIndex(index)}
            className={`relative cursor-pointer w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
              activeImageIndex === index ? 'border-[#8B5E3B] shadow-md' : 'border-gray-200 opacity-80 hover:opacity-100'
            }`}
            whileHover={{ scale: 1.1 }}
          >
            <img src={img} alt={`${productName} ${index + 1}`} className="w-full h-full object-cover" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;