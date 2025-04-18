

// export default ProductMainSection;
import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Componente
import ProductGallery from '../../components/ui/ProductGallery';
import ProductInfo from '../../components/ProductInfo';
import QuantitySelector from '../../components/QuantitySelector';
import AddToCartButton from '../../components/ui/AddToCartButton';
import ActionButtons from '../../components/ui/ActionButton';

const ProductMainSection = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  
  const handleIncreaseQuantity = () => setQuantity(prev => prev + 1);
  const handleDecreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1));
  
  return (
    <section id="main-product" className="px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 mb-20"
      >
        {/* Galeria de imagini */}
        <ProductGallery images={product.images} productName={product.name} />
        
        {/* Detaliile produsului */}
        <div className="space-y-8">
          {/* Informații produs */}
          <ProductInfo product={product} />
          
          {/* Selector cantitate și buton adăugare în coș */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <QuantitySelector
               quantity={quantity}
               onIncrease={handleIncreaseQuantity}
               onDecrease={handleDecreaseQuantity}
             />
            
            {/* Transmitem product și quantity către AddToCartButton */}
            <AddToCartButton 
              product={product} 
              quantity={quantity} 
            />
          </div>
          
          {/* Butoane acțiuni secundare */}
          <ActionButtons product={product} />
        </div>
      </motion.div>
    </section>
  );
};

export default ProductMainSection;