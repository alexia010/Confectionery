// components/TabButton.jsx
import React from 'react';
import { motion } from 'framer-motion';

const TabButton = ({ label, isActive, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`relative text-sm font-sans font-medium uppercase tracking-wider transition-colors duration-300 bg-transparent border-none outline-none focus:outline-none px-6 py-3 ${
        isActive ? 'text-[#8B5E3B]' : 'text-gray-600 hover:text-[#8B5E3B]'
      }`}
      style={{ backgroundColor: 'transparent' }}
      whileHover={{ y: -2, color: '#8B5E3B' }}
      transition={{ duration: 0.3 }}
    >
      {label}
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8B5E3B] rounded-t-full"
          layoutId="underline"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />
      )}
    </motion.button>
  );
};

export default TabButton;