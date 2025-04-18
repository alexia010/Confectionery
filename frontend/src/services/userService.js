import { userEndpoints } from './api/endpoints';

class UserService {
  /**
   * Obține utilizatorul curent
   */
  async getCurrentUser() {
    try {

      const userData = localStorage.getItem('user');
    
      if (userData) {
        return JSON.parse(userData);
      }
      
      
      // Dacă nu avem date în localStorage, încercăm să le obținem de la server
      if (this.isAuthenticated()) {
        try {
          const response = await userEndpoints.getCurrentUser();
          const user = response.data;
          // Salvăm datele în localStorage pentru acces rapid ulterior
          localStorage.setItem('user', JSON.stringify(user));
          return user;
        } catch (error) {
          console.error('Eroare la obținerea utilizatorului de la server:', error);
          return null;
        }
      }
      
      return null;
    } catch (error) {
      console.error('Eroare la obținerea utilizatorului:', error);
      return null;
    }
  }

  

  /**
   * Verifică dacă utilizatorul este autentificat
   */
  isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  /**
   * Autentificare utilizator
   */
  async login(email, password) {
    try {
      const response = await userEndpoints.login({ email, password });
      const { token, user } = response.data;
      
      // Ne asigurăm că utilizatorul are un câmp de role definit
      // Dacă API-ul nu returnează acest câmp, se poate adăuga o logică personalizată
      const userWithRole = {
        ...user,
        role: user.role || 'user' // Setează rolul implicit ca 'user' dacă nu există
      };
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userWithRole));
      return { user: userWithRole, token };
    } catch (error) {
      console.error('Eroare la autentificare:', error);
      throw error;
    }
  }

  /**
   * Înregistrare utilizator
   */
  async register(userData) {
    try {
      const response = await userEndpoints.register(userData);
      const { token, user } = response.data;
      
      // Ne asigurăm că utilizatorul are un câmp de role definit
      // La înregistrare, rolul implicit este 'user'
      const userWithRole = {
        ...user,
        role: user.role || 'user'
      };
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userWithRole));
      return { user: userWithRole, token };
    } catch (error) {
      console.error('Eroare la înregistrare:', error);
      throw error;
    }
  }

  async addUser(userData) {
    try {
     console.log(userData);
      const response = await userEndpoints.addUser(userData);
      
      return response.data;
    } catch (error) {
      // Centralized error handling
      if (error.response) {
        console.error('Eroare de la server:', error.response.data);
        throw new Error(
          error.response.data.message || 
          'Failed to add user'
        );
      } else if (error.request) {
        console.error('Nu s-a primit răspuns de la server');
        throw new Error('No response received from server');
      } else {
        console.error('Eroare la configurarea cererii:', error.message);
        throw new Error(error.message || 'Error setting up request');
      }
    }
  }

  /**
   * Delogare utilizator
   */
  async logout() {
    try {
      await userEndpoints.logout();
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return true;
    } catch (error) {
      console.error('Eroare la delogare:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return false;
    }
  }

  /**
   * Obține calea de redirecționare pentru un utilizator în funcție de rol
   */
  getRedirectPathByRole(role) {
    if (!role) return '/';
    
    switch (role.toLowerCase()) {
      case 'admin':
        return '/admin';
      case 'baker':
      case 'cofetar':
        return '/cofetar';
      case 'user':
      default:
        return '/';
    }
  }

  

  // ADAUGARE
  async updateProfile(userData) {
    try {
      const response = await userEndpoints.updateCurrentProfile(userData);
      const updatedUser = response.data.user;
      
      // Actualizăm datele în localStorage
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      const mergedUser = {
        ...currentUser,
        ...updatedUser,
        role: updatedUser.role || currentUser.role || 'user'
      };
      
      localStorage.setItem('user', JSON.stringify(mergedUser));
      return mergedUser;
    } catch (error) {
      console.error('Eroare la actualizarea profilului:', error);
      throw error;
    }
  }

  async deleteAccount() {
    try {
      const response = await userEndpoints.deleteAccount();
      // La ștergerea contului, eliminăm și datele din localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return response.data;
    } catch (error) {
      console.error('Eroare la ștergerea contului:', error);
      throw error;
    }
  }

  // Funcții admin

  /**
   * Obține toți utilizatorii (doar admin)
   */
  async getAllUsers() {
    try {
      const response = await userEndpoints.getAllUsers();
      return response.data.users;
    } catch (error) {
      console.error('Eroare la obținerea utilizatorilor:', error);
      throw error;
    }
  }

  /**
   * Actualizează rolul unui utilizator (doar admin)
   */
  async updateUserRole(userId, role) {
    try {
      const response = await userEndpoints.updateUserRole({ userId, role });
      return response.data;
    } catch (error) {
      console.error('Eroare la actualizarea rolului:', error);
      throw error;
    }
  }

  /**
   * Șterge un utilizator (doar admin)
   */
  async deleteUser(userId) {
    try {
      const response = await userEndpoints.deleteUser(userId);
      return response.data;
    } catch (error) {
      console.error('Eroare la ștergerea utilizatorului:', error);
      throw error;
    }
  }

  async updateUserProfile(userId, userData){
    try {
      console.log(userData);
      const response = await userEndpoints.updateUserProfile(userId,userData);
      return response.data;
    } catch (error) {
      // Centralized error handling
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw new Error(
          error.response.data.message || 
          'Failed to update user profile'
        );
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error('No response received from server');
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new Error('Error setting up request');
      }
    }
  }
}

// Exportă o singură instanță a serviciului
export const userService = new UserService();