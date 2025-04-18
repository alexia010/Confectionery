// pages/sections/SimilarProductsSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../../components/ProductCard';

const SimilarProductsSection = ({ products }) => {
  return (
    <section id="similar-products">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-4xl font-serif text-gray-900 mb-10 tracking-tight">Produse Similare</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map(product => (
            <motion.div key={product._id} whileHover={{ y: -5, transition: { duration: 0.3 } }}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default SimilarProductsSection;