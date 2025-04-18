import React from 'react';
// import Logo from '../assets/logo2.png';

const AdminNavbarMobile = ({ navigateTo, setIsMenuOpen, isMenuOpen }) => {
  return (
    <div className="md:hidden flex items-center justify-between py-3">
      <div className="flex items-center">
        <div 
          onClick={() => navigateTo('/admin/dashboard')} 
          className="flex items-center cursor-pointer"
        >
          <img 
            src="/logo2.png"
            alt="Logo" 
            className="h-12 mr-2"
          />
        </div>
        <span className="bg-[#F5A9B8] text-white px-2 py-0.5 rounded text-xs font-bold ml-2">
          ADMIN
        </span>
      </div>

      {/* Buton Hamburger */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="text-white focus:outline-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  );
};

export default AdminNavbarMobile;