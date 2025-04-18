import React, { useState, useEffect } from 'react';
import AdminNavbarDesktop from './AdminNavbarDesktop';
import AdminNavbarMobile from './AdminNavbarMobile';
import AdminNavbarMobileMenu from './AdminNavbarMobileMenu';

const AdminNavbar = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Funcție pentru logout
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/';
  };

  // Funcție pentru a naviga între pagini
  const navigateTo = (path) => {
    window.location.href = path;
    setCurrentPath(path);
    setIsMenuOpen(false);
  };

  // Actualizează lățimea ferestrei
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // Dacă lățimea depășește breakpoint-ul md (768px), închide meniul
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Previne scrollarea body-ului când meniul este deschis
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  return (
    <nav className="bg-[#3A1F17] text-white shadow-md">
      <div className="container mx-auto px-4 relative">
        {/* Navbar Desktop */}
        <AdminNavbarDesktop 
          currentPath={currentPath} 
          navigateTo={navigateTo} 
        />

        {/* Navbar Mobil */}
        <AdminNavbarMobile 
          navigateTo={navigateTo} 
          setIsMenuOpen={setIsMenuOpen} 
          isMenuOpen={isMenuOpen} 
        />

        {/* Meniu Mobil */}
        {isMenuOpen && (
          <AdminNavbarMobileMenu 
            isMenuOpen={isMenuOpen} 
            setIsMenuOpen={setIsMenuOpen} 
            currentPath={currentPath} 
            navigateTo={navigateTo} 
            handleLogout={handleLogout} 
          />
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar;