import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from './Button';

const BackButton = ({ url = "/produse", text = "Înapoi la Produse" }) => {
  return (

    
    <motion.div
      whileHover={{ x: -5 }}
      className="inline-block"
    >
      <Link 
        to={url}
      className=" back mb-6 inline-flex items-center text-[#000000] hover:text-[#5A3C25] transition-colors duration-300 no-underline focus:outline-none"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        {text}
      </Link>
    </motion.div>

  );
};

export default BackButton;