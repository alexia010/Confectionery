// components/ProductTags.jsx
import React from 'react';
import { motion } from 'framer-motion';

const ProductTags = ({ tags }) => {
  return (
    <div className="flex flex-wrap gap-3">
      {tags.map((tag, index) => (
        <motion.span
          key={index}
          className="px-4 py-1.5 bg-[#F3D9CA] text-[#8B5E3B] rounded-full text-sm font-medium shadow-sm"
          whileHover={{ scale: 1.05 }}
        >
          {tag}
        </motion.span>
      ))}
    </div>
  );
};

export default ProductTags;