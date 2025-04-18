import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MobileMenu from './NavbarMobileMenu';

const NavbarMobile = ({ logo }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [orientation, setOrientation] = useState('portrait');

  const menuButtonStyle = {
    width: '36px',
    height: '36px',
    padding: '0'
  };

  // Effect pentru detectarea orientării ecranului
  useEffect(() => {
    const checkOrientation = () => {
      if (window.innerWidth > window.innerHeight) {
        setOrientation('landscape');
      } else {
        setOrientation('portrait');
      }
    };

    // Verifică orientarea inițială
    checkOrientation();

    const handleOrientationChange = () => {
      checkOrientation();
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, [isMobileMenuOpen]);

  // CSS specific pentru a preveni moștenirea width: 80% pentru butonul de meniu
  useEffect(() => {
    // Creează un stil specific pentru butonul de meniu
    const style = document.createElement('style');
    style.textContent = `
      @media (max-width: 576px) {
        button[aria-label="Meniu"] {
          width: 36px !important;
          height: 36px !important;
          padding: 0 !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      {/* Layout pentru mobile - cu logo centrat */}
      <div className="flex justify-center items-center py-2 lg:hidden relative">
        {/* Logo pentru mobile - centrat - folosind Link în loc de a */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Gust Divin" className="h-14 w-auto" />
        </Link>
        
        {/* Mobile Menu Button - cu z-index mărit */}
        <button 
          style={menuButtonStyle}
          className="fixed top-4 right-4 z-[9997] flex items-center justify-center rounded-md bg-[#3A1F17]/90 text-white shadow-lg border border-[#D7BFA8]/30"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Meniu"
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>
      
      {/* Meniul mobil folosind Portal */}
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};

export default NavbarMobile;
