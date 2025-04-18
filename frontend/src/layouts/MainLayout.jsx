
import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useNavbarState } from '../hooks/useNavbarState';

// Componenta de tranziție minimalistă
const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ 
        duration: 0.2, 
        ease: "easeInOut" 
      }}
    >
      {children}
    </motion.div>
  );
};

export const MainLayout = ({ children, title = 'Gust Divin' }) => {
  // Folosește același hook pentru a determina dacă este pagina home
  const { isHomePage } = useNavbarState();

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#A35D3A] overflow-x-hidden">
      <Navbar />
      
      {/* Adaugă padding-top doar pe paginile care nu sunt home */}
      <main className={isHomePage ? '' : 'pt-10'}>
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      
      <Footer />
    </div>
  );
};

export default MainLayout;