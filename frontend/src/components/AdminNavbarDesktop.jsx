import React from 'react';
// import Logo from '../assets/logo2.png';
import UserMenu from './UserMenu';

const AdminNavbarDesktop = ({ currentPath, navigateTo }) => {
  return (
    <div className="hidden md:flex items-center justify-between py-3">
      <div className="flex items-center">
        <div 
          onClick={() => navigateTo('/admin')} 
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
      
      <div className="flex items-center space-x-12 text-base">
        <div 
          onClick={() => navigateTo('/admin')}
          className={`text-white hover:text-[#D7BFA8] transition-colors duration-300 font-medium cursor-pointer ${
            currentPath === '/admin/dashboard' ? 'font-semibold' : ''
          }`}
        >
          Dashboard
        </div>
        <div 
          onClick={() => navigateTo('/admin/produse')}
          className={`text-white hover:text-[#D7BFA8] transition-colors duration-300 font-medium cursor-pointer ${
            currentPath.includes('/admin/products') ? 'font-semibold' : ''
          }`}
        >
          Produse
        </div>
        <div 
          onClick={() => navigateTo('/admin/comenzi')}
          className={`text-white hover:text-[#D7BFA8] transition-colors duration-300 font-medium cursor-pointer ${
            currentPath.includes('/admin/comenzi') ? 'font-semibold' : ''
          }`}
        >
          Comenzi
        </div>
        <div 
          onClick={() => navigateTo('/admin/utilizatori')}
          className={`text-white hover:text-[#D7BFA8] transition-colors duration-300 font-medium cursor-pointer ${
            currentPath.includes('/admin/utilizatori') ? 'font-semibold' : ''
          }`}
        >
          Utilizatori
        </div>
      </div>

      <UserMenu isLoggedIn={false} />
    </div>
  );
};

export default AdminNavbarDesktop;