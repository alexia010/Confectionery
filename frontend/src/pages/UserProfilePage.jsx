// /pages/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DynamicLayout from '../layouts/DynamicLayout';
import { ProfileSidebar } from '../components/ProfileSidebar';
import { AccountDetails } from '../components/AccountDetails';
import { OrdersHistory } from '../components/OrdersHistory';
import { orderService } from '../services/orderService';
import { useAuthContext } from '../context/authContext'; // Importăm hook-ul de context

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState({
    orders: false
  });
  const navigate = useNavigate();
  
  // Folosim contextul de autentificare în loc de state local
  const { currentUser, isAuthenticated, logout } = useAuthContext();

  // Încarcă comenzile utilizatorului când se activează tab-ul de comenzi
  useEffect(() => {
    const loadOrders = async () => {
      if (activeTab === 'orders' && isAuthenticated) {
        try {
          setLoading(prev => ({ ...prev, orders: true }));
          const userOrders = await orderService.getUserOrders();
          setOrders(userOrders);
        } catch (error) {
          console.error('Eroare la încărcarea comenzilor:', error);
        } finally {
          setLoading(prev => ({ ...prev, orders: false }));
        }
      }
    };

    loadOrders();
  }, [activeTab, isAuthenticated]);

  // Funcție pentru logout folosind contextul
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login'); // Redirecționare către pagina de autentificare
    } catch (error) {
      console.error('Eroare la deconectare:', error);
    }
  };

  // Dacă nu avem date utilizator, nu afișăm nimic
  if (!currentUser) {
    return null;
  }
  
  return (
    <DynamicLayout>
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-l font-sans font-light text-gray-800 mb-10 mt-3.5">Profilul meu</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar cu opțiuni - folosim currentUser din context */}
            <div className="md:col-span-1">
              <ProfileSidebar 
                userData={currentUser}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                handleLogout={handleLogout}
              />
            </div>
            
            {/* Conținut principal - pasăm currentUser din context */}
            <div className="md:col-span-3">
              <div className="bg-white rounded-lg shadow-md p-6">
                {activeTab === 'account' && <AccountDetails />}
                {activeTab === 'orders' && <OrdersHistory orders={orders} loading={loading.orders} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DynamicLayout>
  );
};

export default ProfilePage;
