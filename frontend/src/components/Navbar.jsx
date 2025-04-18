import React from 'react';
import { useNavbarState } from '../hooks/useNavbarState';
import useWindowSize from '../hooks/useWindowSize'; // Import hook-ul nou
import NavbarDesktop from './NavbarDesktop';
import NavbarMobile from './NavbarMobile';

// import logo from '../assets/logo2.png';

export const Navbar = () => {
  // Folosește hook-ul useNavbarState
  const { isScrolled, shouldBeTransparent } = useNavbarState();
  
  // Folosește hook-ul useWindowSize pentru a determina lățimea ferestrei
  const { width } = useWindowSize();
  // Definim breakpoint-ul pentru desktop (1024px)
  const isDesktop = width >= 1024;

  const navClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled 
      ? 'bg-[#3A1F17]/95 backdrop-blur-sm py-2 shadow-lg' 
      : shouldBeTransparent 
        ? 'bg-transparent py-3' 
        : 'bg-[#3A1F17] py-3'
  }`;

  return (
    <nav className={navClasses}>
      <div className="container mx-auto px-4 md:px-6 relative">
        {/* Decidem condiționat ce navbar să afișăm bazat pe lățimea ferestrei */}
        {isDesktop ? (
          <NavbarDesktop logo="logo2.png" />
        ) : (
          <NavbarMobile logo="logo2.png" />
        )}
      </div>
    </nav>
  );
};

export default Navbar;