import React from 'react';
import ReactDOM from 'react-dom';
import { userService } from '../services/userService';

const AdminNavbarMobileMenu = ({ isMenuOpen, setIsMenuOpen, currentPath, navigateTo }) => {
  // Funcție pentru logout folosind userService
  const handleLogout = async () => {
    try {
      const success = await userService.logout();
      if (success) {
        window.location.href = '/';
      } else {
        console.error('Eroare la delogare');
      }
    } catch (error) {
      console.error('Eroare la delogare:', error);
    }
  };
  return ReactDOM.createPortal(
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black z-[9998] transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Meniu glisant */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#3A1F17] shadow-xl overflow-y-auto z-[9999] transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col">
          <div className="mt-20 py-2">
            <div 
              onClick={() => navigateTo('/admin')}
              className={`px-6 py-3 text-[#F5F5F5] hover:bg-[#A35D3A]/50 text-lg border-b border-[#D7BFA8]/10 ${
                currentPath === '/admin' ? 'bg-[#A35D3A]/30' : ''
              }`}
            >
              Dashboard
            </div>
            <div 
              onClick={() => navigateTo('/admin/produse')}
              className={`px-6 py-3 text-[#F5F5F5] hover:bg-[#A35D3A]/50 text-lg border-b border-[#D7BFA8]/10 ${
                currentPath.includes('/admin/produse') ? 'bg-[#A35D3A]/30' : ''
              }`}
            >
              Produse
            </div>
            <div 
              onClick={() => navigateTo('/admin/comenzi')}
              className={`px-6 py-3 text-[#F5F5F5] hover:bg-[#A35D3A]/50 text-lg border-b border-[#D7BFA8]/10 ${
                currentPath.includes('/admin/comenzi') ? 'bg-[#A35D3A]/30' : ''
              }`}
            >
              Comenzi
            </div>
            <div 
              onClick={() => navigateTo('/admin/utilizatori')}
              className={`px-6 py-3 text-[#F5F5F5] hover:bg-[#A35D3A]/50 text-lg border-b border-[#D7BFA8]/10 ${
                currentPath.includes('/admin/utilizatori') ? 'bg-[#A35D3A]/30' : ''
              }`}
            >
              Utilizatori
            </div>
            <div 
              onClick={() => navigateTo('/profil')}
              className={`px-6 py-3 text-[#F5F5F5] hover:bg-[#A35D3A]/50 text-lg border-b border-[#D7BFA8]/10 flex items-center`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profil
            </div>
            <div 
              onClick={handleLogout}
              className={`px-6 py-3 text-[#F5F5F5] hover:bg-[#A35D3A]/50 text-lg border-b border-[#D7BFA8]/10 flex items-center`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Deconectare
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};

export default AdminNavbarMobileMenu;