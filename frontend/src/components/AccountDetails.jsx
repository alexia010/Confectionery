

import React, { useState, useEffect } from 'react';
import { Clock, Edit } from 'lucide-react';
import { Button } from './ui/Button';
import { ProfileField } from './ui/ProfileField';
import { Input } from './ui/ProfileInput';
import { userService } from '../services/userService';
// import { userEndpoints } from './api/endpoints';
// import { toast } from 'sonner'; // Assuming you're using a toast library for notifications

export const AccountDetails = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const user = await userService.getCurrentUser();
       
        if (user) {
          setUserData(user);
          setFormData({ ...user });
        }
      } catch (error) {
        toast.error('Eroare la încărcarea datelor utilizatorului');
        console.error('Eroare la încărcarea datelor utilizatorului:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpdateClick = async () => {
    try {
      // Validare minimală
      if (!formData.name || !formData.email) {
        toast.error('Vă rugăm să completați numele și emailul');
        return;
      }

      // Trimite datele actualizate la server
      console.log(formData);
    
      const response = await userService.updateProfile(formData);
      
      // Actualizează datele locale
      setUserData({ ...formData });
      
      // Actualizează localStorage
      localStorage.setItem('user', JSON.stringify(formData));
      
      // Resetează modul de editare
      setIsEditing(false);
      
      // Afișează mesaj de succes
      toast.success('Datele au fost actualizate cu succes');
    } catch (error) {
      console.error('Eroare la actualizarea datelor:', error);
      toast.error('Nu s-au putut actualiza datele. Vă rugăm să încercați din nou.');
    }
  };

  const handleCancelClick = () => {
    // Resetează datele formularului la valorile originale
    setFormData({ ...userData });
    setIsEditing(false);
  };

  // Stare de încărcare
  if (isLoading) {
   
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Verifică dacă nu există utilizator
  if (!userData) {
    return (
      <div className="text-center text-gray-600">
        Vă rugăm să vă autentificați pentru a vedea datele contului.
      </div>
    );
  }

  console.log(userData);
  return (
    
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Datele contului meu</h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {!isEditing ? (
            <>
              <ProfileField label="Nume complet" value={userData.name} />
              <ProfileField label="Email" value={userData.email} />
              <ProfileField label="Telefon" value={userData.phone || 'N/A'} />
              <ProfileField label="Adresă" value={userData.adress || 'N/A'} />
            </>
          ) : (
            <>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-500 mb-1">Nume complet</label>
                <Input 
                  type="text" 
                  name="name" 
                  id="name"
                  value={formData.name} 
                  onChange={handleInputChange}
                  className="block w-full"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                <Input 
                  type="email" 
                  name="email" 
                  id="email"
                  value={formData.email} 
                  onChange={handleInputChange}
                  className="block w-full"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-500 mb-1">Telefon</label>
                <Input 
                  type="tel" 
                  name="phone" 
                  id="phone"
                  value={formData.phone || ''} 
                  onChange={handleInputChange}
                  className="block w-full"
                  placeholder="Adaugă număr de telefon"
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-500 mb-1">Adresă</label>
                <Input 
                  type="text" 
                  name="address" 
                  id="address"
                  value={formData.address || ''} 
                  onChange={handleInputChange}
                  className="block w-full"
                  placeholder="Adaugă adresă"
                />
              </div>
            </>
          )}
        </div>
        

        <div className="flex items-center pt-4 border-t border-gray-200">
          <Clock className="h-5 w-5 text-gray-400 mr-2" />
          <p className="text-sm text-gray-500">
            Cont creat pe data de <span className="font-medium">
              {new Date(userData.createdAt).toLocaleDateString('ro-RO', {
                day: 'numeric',
                month: 'long', 
                year: 'numeric'
              }) || 'N/A'}
            </span>
          </p>
        </div>
                
        <div className="pt-4 flex space-x-4">
          {!isEditing ? (
            <Button 
              variant="link" 
              onClick={handleEditClick}
              className="!text-[#F5A9B8] flex items-center"
            >
              <Edit className="h-4 w-4 mr-2" />
              Editează
            </Button>
          ) : (
            <>
              <Button 
                variant="primary" 
                onClick={handleUpdateClick}
              >
                Actualizează datele
              </Button>
              <Button 
                variant="secondary" 
                onClick={handleCancelClick}
              >
                Anulează
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Eliminăm wrapper-ul anterior, deoarece ComponentA va fi folosit direct
export default AccountDetails;
