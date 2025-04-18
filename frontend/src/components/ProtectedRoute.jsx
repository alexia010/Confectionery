// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';
import { RouteAccess } from '../config/routeAccess';

export const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { currentUser, isLoading } = useAuthContext();

  // Dacă încă se verifică starea de autentificare, lasă conținutul să se încarce
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Se încarcă...
      </div>
    );
  }

  // Verifică ruta curentă
  const currentPath = location.pathname;

  // Verifică dacă ruta este publică
  if (RouteAccess.isPublicRoute(currentPath)) {
    return children;
  }

  // Verifică rolurile necesare pentru rută
  const requiredRoles = RouteAccess.getRoleForRoute(currentPath);
  
  if (requiredRoles) {
    const userRole = currentUser.role?.toLowerCase();
    const hasAllowedRole = requiredRoles.some(
      role => role.toLowerCase() === userRole
    );

    if (!hasAllowedRole) {
      return (
        <Navigate 
          to="/" 
          state={{ 
            error: 'Nu aveți permisiunea de a accesa această pagină' 
          }} 
          replace 
        />
      );
    }
  }

  // Dacă nu sunt roluri specificate sau utilizatorul are rol corespunzător, afișează conținutul rutei
  return children;
};