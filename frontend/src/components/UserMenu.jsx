
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/authContext'; // Import the custom hook

const UserMenu = () => {
  const { currentUser, isAuthenticated, logout } = useAuthContext(); // Use AuthContext
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  const toggleUserMenu = () => {
    setIsUserMenuOpen(prevState => !prevState);
  };
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handler pentru deconectare
  const handleLogout = async () => {
    try {
      await logout(); // Use the logout function from AuthContext
      navigate('/'); // Redirecționare către pagina de autentificare
    } catch (error) {
      console.error('Eroare la deconectare:', error);
      // Opțional: Afișează un mesaj de eroare
    }
  };
  
  return (
    <div className="relative" ref={userMenuRef}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-[#F5F5F5] hover:text-[#D7BFA8] transition-colors duration-300 cursor-pointer"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        onClick={toggleUserMenu}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
      
      {/* Dropdown Menu */}
      {isUserMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          {isAuthenticated ? (
            <>
              <div className="px-4 py-2 border-b border-gray-200">
                <p className="text-sm font-medium text-gray-900">
                  {currentUser?.name || 'Utilizator'}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {currentUser?.email || 'email@example.com'}
                </p>
              </div>
              <div className='user-menu'>
                <Link
                  to="/profil"
                  className="back block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  Profil
                </Link>
      
                <button
                  onClick={handleLogout}
                  className="back block w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100"
                >
                  Deconectare
                </button>
              </div>
            </>
          ) : (
            <div className='user-menu'>
              
              <Link
                to="/login"
                className='back block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                onClick={() => setIsUserMenuOpen(false)}
              >
                Autentificare
              </Link>
              <Link
                to="/register"
                className="back block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsUserMenuOpen(false)}
              >
                Înregistrare
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;