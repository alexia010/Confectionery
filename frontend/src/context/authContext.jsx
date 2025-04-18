// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { userService } from '../services/userService';

// Starea implicită de utilizator
const guest = {
  id: null,
  name: 'Guest', // Numele implicit este acum "Guest"
  email: null,
  isLoggedIn: false,
  role: null, // Rolul implicit este null
};

// Creează și exportă contextul cu valori implicite
export const AuthContext = createContext({
  currentUser: guest,
  isLoading: false,
  isAuthenticated: false,
  login: () => Promise.resolve(null),
  register: () => Promise.resolve(null),
  logout: () => Promise.resolve(),
  updateProfile: () => Promise.resolve(null),
  getRedirectPathByRole: () => '/', // Funcție nouă pentru redirecționare
});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(guest);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verifică starea de autentificare la încărcarea componentei
  useEffect(() => {
    const checkAuthStatus = async () => {
      setIsLoading(true);
      try {
        if (userService.isAuthenticated()) {
          const user = await userService.getCurrentUser();
          if (user) {
            setCurrentUser(user);
            setIsAuthenticated(true);
          } else {
            setCurrentUser(guest);
            setIsAuthenticated(false);
            localStorage.removeItem('token');
          }
        } else {
          setCurrentUser(guest);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        setCurrentUser(guest);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const getRedirectPathByRole = (role) => {
    if (!role) return '/';
    
    switch(role.toLowerCase()) {
      case 'admin':
        return '/admin';
      case 'baker':
      case 'cofetar':
        return '/baker';
      case 'user':
      default:
        return '/';
    }
  };

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const { user } = await userService.login(email, password);
      
      // Nu mai combinăm coșurile - păstrăm coșurile separate
      
      setCurrentUser(user);
      setIsAuthenticated(true);
      
      return {
        user,
        redirectPath: getRedirectPathByRole(user.role),
      };
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    try {
      const { user } = await userService.register(userData);
      
      // Nu mai combinăm coșurile - păstrăm coșurile separate
      
      setCurrentUser(user);
      setIsAuthenticated(true);
      
      return {
        user,
        redirectPath: getRedirectPathByRole(user.role),
      };
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      // Deconectăm utilizatorul fără a goli coșul
      // Astfel, coșul guest rămâne separat de coșul utilizatorului autentificat
      await userService.logout();
      
      // Actualizăm starea
      setCurrentUser(guest);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (userData) => {
    setIsLoading(true);
    try {
      const updatedUser = await userService.updateCurrentProfile(userData);
      setCurrentUser((prev) => ({ ...prev, ...updatedUser }));
      return updatedUser;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    currentUser,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile,
    getRedirectPathByRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personalizat pentru a utiliza contextul de autentificare
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext trebuie utilizat în interiorul unui AuthProvider');
  }
  return context;
};