import React from 'react';
import AdminNavbar from '../components/AdminNavbar';

const AdminLayout = ({ children, title = 'Admin Panel - Gust Divin' }) => {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content="Panou de administrare pentru Gust Divin" />
      <link rel="icon" href="/favicon.ico" />
      
      <div className="flex flex-col min-h-screen">
        <AdminNavbar />
        
        <main className="flex-grow bg-gray-50 w-full">
          <div className="w-full py-6 px-4">
            {children}
          </div>
        </main>
        
        <footer className="bg-[#4A2512] text-white py-3 text-center text-sm">
          <div className="w-full">
            <p>© {new Date().getFullYear()} Gust Divin - Panou de administrare</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default AdminLayout;
