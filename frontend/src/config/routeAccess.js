// src/config/routeAccess.js
export const RouteAccess = {
    // Rute publice - accesibile tuturor (inclusiv guest, dar nu și admin)
    PUBLIC: {
      routes: [
        '/',
        '/login', 
        '/register', 
        '/produse', 
        '/produs/:id', 
        '/despre-noi',
        '/contact',
        '/comanda',
        '/favorite', 
        '/cos'
      ],
      allowedRoles: ['guest', 'user']
    },
  
    // Rute pentru utilizatori autentificați (user și admin)
    USER: {
      routes: [
        '/profil', 
      
      ],
      allowedRoles: ['user', 'admin']
    },
  
    // Rute specifice pentru admin
    ADMIN: {
      routes: [
        '/admin',
        '/admin/produse'
      ],
      allowedRoles: ['admin']
    },
  
    // Verifică dacă o rută este publică
    isPublicRoute: (path) => {
      return RouteAccess.PUBLIC.routes.some(route => 
        new RegExp(`^${route.replace(/:[^\s/]+/g, '[^/]+')}$`).test(path)
      );
    },
  
    // Obține rolurile necesare pentru o anumită rută
    getRoleForRoute: (path) => {
      // Verifică mai întâi rutele admin
      if (RouteAccess.ADMIN.routes.some(route => 
        new RegExp(`^${route.replace(/:[^\s/]+/g, '[^/]+')}$`).test(path)
      )) {
        return RouteAccess.ADMIN.allowedRoles;
      }
  
      // Apoi verifică rutele publice
      if (RouteAccess.PUBLIC.routes.some(route => 
        new RegExp(`^${route.replace(/:[^\s/]+/g, '[^/]+')}$`).test(path)
      )) {
        return RouteAccess.PUBLIC.allowedRoles;
      }
  
      // Apoi verifică rutele pentru utilizatori
      if (RouteAccess.USER.routes.some(route => 
        new RegExp(`^${route.replace(/:[^\s/]+/g, '[^/]+')}$`).test(path)
      )) {
        return RouteAccess.USER.allowedRoles;
      }
  
      // Returnează null dacă nu sunt roluri specificate
      return null;
    }
  };