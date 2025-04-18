
// components/QuantitySelector.jsx
import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';

const QuantitySelector = ({ quantity, onIncrease, onDecrease }) => {
  return (
    <motion.div
      className="flex items-center space-x-2 border border-gray-300 rounded-lg bg-white shadow-sm"
      whileHover={{ borderColor: '#6B7280', shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
      transition={{ duration: 0.2 }}
    >
      <Button
        variant="link"
        onClick={onDecrease}
        disabled={quantity <= 1}
        className="p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-l-lg"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="w-10 text-center text-base font-semibold text-gray-900 py-2">
        {quantity}
      </span>
      <Button
        variant="link"
        onClick={onIncrease}
        className="p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors rounded-r-lg"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </motion.div>
  );
};

export default QuantitySelector;