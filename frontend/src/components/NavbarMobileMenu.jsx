import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/Button';
import SearchBar from './ui/SearchBar';
import { userService } from '../services/userService'; // Adjust the import path as needed

const MobileMenu = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  // Check login status on component mount and when menu opens
  useEffect(() => {
    const checkLoginStatus = async () => {
      const isAuthenticated = userService.isAuthenticated();
      setIsLoggedIn(isAuthenticated);

      if (isAuthenticated) {
        const currentUser = await userService.getCurrentUser();
        if (currentUser) {
          setUserRole(currentUser.role || 'user');
        }
      }
    };

    if (isOpen) {
      checkLoginStatus();
    }
  }, [isOpen]);

  // Prevents scrolling on body when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Determines the account link based on login status
  const accountLink = isLoggedIn ? '/profil' : '/login';

  // Handler for SearchBar
  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/cautare?q=${encodeURIComponent(query)}`);
      onClose(); // Close menu after search
    }
  };

  // Handler for opening search
  const handleSearchOpen = () => {
    setIsSearchActive(true);
  };

  // Logout handler
  const handleLogout = async () => {
    await userService.logout();
    setIsLoggedIn(false);
    setUserRole('');
    navigate('/');
    onClose();
  };

  // Render always with different classes to control visibility
  // This allows smooth transitions
  return ReactDOM.createPortal(
    <>
      {/* Overlay with opacity transition */}
      <div
        className={`fixed inset-0 bg-black z-[9998] transition-opacity duration-300 ${
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Slide-in menu with transform transition */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#3A1F17]/95 shadow-xl overflow-y-auto z-[9999] transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col py-16">
          
          {/* Search section with improved SearchBar */}
          {/* <div className="px-6 pb-4 h-10 flex items-center">
            <SearchBar 
              onSearch={handleSearch}
              onOpen={handleSearchOpen}
              expandDirection="right"
              placeholder="Caută produse..."
              buttonClassName="text-[#F5F5F5] hover:text-[#A35D3A]"
              containerClassName="relative w-full"
              inputClassName="w-full py-2 px-3 bg-[#F5F5F5]/10 text-[#F5F5F5] border border-[#D7BFA8]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A35D3A]"
            />
          </div> */}

          <Link 
            to="/" 
            className="px-6 py-3 text-[#F5F5F5] hover:bg-[#A35D3A]/50 text-lg border-b border-[#D7BFA8]/10"
            onClick={onClose}
          >
            Acasă
          </Link>
          <Link 
            to="/produse" 
            className="px-6 py-3 text-[#F5F5F5] hover:bg-[#A35D3A]/50 text-lg border-b border-[#D7BFA8]/10"
            onClick={onClose}
          >
            Produse
          </Link>
          <Link 
            to="/despre-noi" 
            className="px-6 py-3 text-[#F5F5F5] hover:bg-[#A35D3A]/50 text-lg border-b border-[#D7BFA8]/10"
            onClick={onClose}
          >
            Despre noi
          </Link>
          {/* <Link 
            to="/contact" 
            className="px-6 py-3 text-[#F5F5F5] hover:bg-[#A35D3A]/50 text-lg border-b border-[#D7BFA8]/10"
            onClick={onClose}
          >
            Contact
          </Link> */}

          {/* Account page link */}
          <Link
            to={accountLink}
            className="px-6 py-3 text-[#F5F5F5] hover:bg-[#A35D3A]/50 text-lg border-b border-[#D7BFA8]/10 flex items-center"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            {isLoggedIn ? 'Profil' : 'Cont'}
          </Link>

          {/* Favorites link - only show if logged in */}
          {isLoggedIn && (
            <Link 
              to="/favorite" 
              className="px-6 py-3 text-[#F5F5F5] hover:bg-[#A35D3A]/50 text-lg border-b border-[#D7BFA8]/10 flex items-center"
              onClick={onClose}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 mr-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                />
              </svg>
              Favorite
            </Link>
          )}

          <div className="flex flex-col space-y-3 px-6 py-4 mt-4">
            <Link to="/cos" onClick={onClose}>
              <Button variant="secondary" className="w-full py-2 justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
                </svg>
                Coș
              </Button>
            </Link>

         
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};

export default MobileMenu;

