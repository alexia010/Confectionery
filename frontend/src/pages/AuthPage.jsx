import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import AuthForm from '../components/AuthForm';
import useAuth from '../hooks/useAuth';

const AuthPage = () => {
  const location = useLocation();
  
  // Determină modul inițial (login sau register) bazat pe URL
  const initialMode = location.pathname === '/register' ? 'register' : 'login';
  
  // Folosește hook-ul personalizat pentru logica de autentificare
  const auth = useAuth(initialMode);
  
  // Actualizează modul când se schimbă URL-ul
  useEffect(() => {
    if (location.pathname === '/register' && auth.mode !== 'register') {
      auth.toggleMode();
    } else if (location.pathname === '/login' && auth.mode !== 'login') {
      auth.toggleMode();
    }
  }, [location.pathname]);

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#ffffff] pt-20 px-4 sm:px-6 lg:px-8 flex items-start justify-center">
        <AuthForm {...auth} />
      </div>
    </MainLayout>
  );
};

export default AuthPage;