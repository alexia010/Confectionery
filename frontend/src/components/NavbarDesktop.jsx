import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserMenu from './UserMenu';
import SearchBar from './ui/SearchBar';
import CartPreview from './CartPreview';

const NavbarDesktop = ({ logo }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);

  // Folosește useSearch hook pentru a detecta când search-ul este deschis
  useEffect(() => {
    const handleClickOutside = (event) => {
      const searchContainer = document.querySelector('.search-container');
      const searchForm = document.querySelector('.search-container form');
      
      if (searchForm && !searchForm.contains(event.target)) {
        // S-a făcut click în afara formularului de căutare
        setIsSearchActive(false);
      } else if (searchContainer && searchContainer.contains(event.target)) {
        // S-a făcut click pe containerul de căutare sau pe butonul de căutare
        setIsSearchActive(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Monitorizăm când SearchBar-ul este apăsat prin customizarea hook-ului useSearch
  const handleSearchOpen = () => {
    setIsSearchActive(true);
  };

  return (
    <div className="hidden md:flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img 
          src={logo} 
          alt="Gust Divin" 
          className="h-12"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
        />
      </Link>
      
      {/* Navigare principală - se ascunde când search-ul este activ */}
      <div className={`flex items-center pl-10 space-x-12 text-base transition-opacity duration-300 ${isSearchActive ? 'opacity-0 invisible' : 'opacity-100 visible'}`}>
        <Link to="/" className="text-white hover:text-[#D7BFA8] transition-colors duration-300 font-medium">
          Acasă
        </Link>
        <Link to="/produse" className="text-white hover:text-[#D7BFA8] transition-colors duration-300 font-medium">
          Produse
        </Link>
        <Link to="/despre-noi" className="text-white hover:text-[#D7BFA8] transition-colors duration-300 font-medium">
          Despre noi
        </Link>
        {/* <Link to="/contact" className="text-white hover:text-[#D7BFA8] transition-colors duration-300 font-medium">
          Contact
        </Link> */}
      </div>
      
      {/* Iconițe și butoane */}
      <div className="flex items-center space-x-4">
 
        {/* SearchBar */}
        {/* <div className="search-container flex items-center h-10">
          <SearchBar 
            onOpen={handleSearchOpen} 
            expandDirection="right" 
          />
        </div> */}
        
        {/* Iconița de favorite */}
        <Link to="/favorite" className="text-white hover:text-[#D7BFA8] transition-colors duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </Link>
        
        {/* Meniul de utilizator */}
        <UserMenu isLoggedIn={false} />
        
        <CartPreview />
      </div>
    </div>
  );
};

export default NavbarDesktop;