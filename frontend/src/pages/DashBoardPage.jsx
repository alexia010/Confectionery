

import React, { useState, useEffect } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

// Importăm componentele
import StatCards from '../sections/dashboard/StatsCardSection';
import SalesChart from '../components/SalesChart';
import DistributionChart from '../components/DistributionChart';
import OrderTable from '../components/AdminOrdersTable'; 
import OrderList from '../components/AdminOrdersList';
import OrderDetailsModal from '../components/OrderDetailsModal';
import EditOrderModal from '../components/EditOrderModal';

// Importăm servicii
import dashboardService from '../services/dashboardService';

// Culori pentru graficul de distribuție
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#A28DF2'];

// Funcție pentru formatarea comenzilor pentru modale
const formatOrderForModals = (order) => {
  return {
    id: order.orderNumber || order._id,
    _id: order._id,
    data: new Date(order.createdAt).toLocaleDateString('ro-RO'),
    client: `${order.customerInfo?.firstName || ''} ${order.customerInfo?.lastName || ''}`.trim(),
    email: order.customerInfo?.email || '',
    telefon: order.customerInfo?.phone || '',
    metodaPlata: order.paymentMethod || 'Ramburs',
    observatii: order.notes || '',
    status: order.status || 'În procesare',
    motivAnulare: order.cancellationReason || '',
    adresa: order.shippingInfo 
      ? `${order.shippingInfo.address || ''}, ${order.shippingInfo.city || ''}, ${order.shippingInfo.county || ''}`.trim()
      : '',
    produse: (order.items || []).map(item => ({
      nume: item.productName,
      cantitate: item.quantity,
      pret: item.price
    })),
    suma: order.items?.reduce((total, item) => total + (item.price * item.quantity), 0) || 0
  };
};

const AdminDashboard = () => {
  // State pentru statistici
  const [stats, setStats] = useState({
    totalVanzari: 0,
    vanzariLunaCurenta: 0,
    comenziNoi: 0,
    utilizatoriNoi: 0,
    produseStoc: 0
  });

  // State pentru datele graficelor
  const [vanzariData, setVanzariData] = useState([]);
  const [distributieData, setDistributieData] = useState([]);
  
  // Starea pentru perioada selectată
  const [perioadaSelectata, setPerioadaSelectata] = useState('month');

  // State pentru sortare comenzi
  const [sortConfig, setSortConfig] = useState({
    key: 'id',
    direction: 'ascending'
  });

  // State-uri pentru modale
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);

  // State pentru comenzi
  const [ultimeleComenzi, setUltimeleComenzi] = useState([]);
  
  // State pentru loading și errors
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});

  // Funcție pentru a încărca date în siguranță cu gestionarea erorilor
  const safelyFetchData = async (fetchFunction, fallbackData = [], errorKey) => {
    try {
      const data = await fetchFunction();
      return data;
    } catch (error) {
      console.error(`Error fetching ${errorKey}:`, error);
      setErrors(prev => ({ ...prev, [errorKey]: true }));
      return fallbackData;
    }
  };

  // Actualizarea datelor graficului în funcție de perioada selectată
  const handlePeriodChange = async (event) => {
    const perioada = event.target.value;
    setPerioadaSelectata(perioada);
    
    try {
      setIsLoading(true);
      
      // Convertim perioada pentru API
      let apiPeriod;
      switch(perioada) {
        case '6luni':
          apiPeriod = '6months';
          break;
        case '1an':
          apiPeriod = 'year';
          break;
      }
      
      // Obținem datele actualizate
      const newData = await dashboardService.getSalesData(apiPeriod);
      setVanzariData(newData);
    } catch (error) {
      console.error('Eroare la actualizarea datelor de vânzări:', error);
      toast.error('Nu s-au putut încărca datele de vânzări');
    } finally {
      setIsLoading(false);
    }
  };

  // Încărcăm toate datele necesare pentru dashboard
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        setErrors({});
        
        // Preluăm datele pentru statistici
        const statsData = await safelyFetchData(
          dashboardService.getStats, 
          {
            totalVanzari: 0,
            vanzariLunaCurenta: 0,
            comenziNoi: 0,
            utilizatoriNoi: 0,
            produseStoc: 0
          }, 
          'stats'
        );
        
        // Preluăm datele pentru graficul de vânzări
        const salesData = await safelyFetchData(
          () => dashboardService.getSalesData('month'), 
          [], 
          'sales'
        );
        
        // Preluăm datele pentru distribuție
        const distributionData = await safelyFetchData(
          dashboardService.getSalesDistribution, 
          [], 
          'distribution'
        );
        
        // Preluăm comenzile recente
        const ordersData = await safelyFetchData(
          () => dashboardService.getRecentOrders(5), 
          [], 
          'orders'
        );
        
        // Actualizăm state-urile cu datele primite
        setStats(statsData);
        setVanzariData(salesData);
        setDistributieData(distributionData);
        setUltimeleComenzi(ordersData);
      } catch (error) {
        console.error('Eroare generală la încărcarea datelor pentru dashboard:', error);
        toast.error('Nu s-au putut încărca unele date pentru dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Funcția de sortare pentru tabelul de comenzi
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Funcția pentru a afișa iconița de sortare
  const getSortIcon = (name) => {
    if (sortConfig.key !== name) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    
    if (sortConfig.direction === 'ascending') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      );
    }
    
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  // Sortează comenzile
  const sortedOrders = React.useMemo(() => {
    let sortableOrders = [...ultimeleComenzi];
    if (sortConfig.key) {
      sortableOrders.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableOrders;
  }, [ultimeleComenzi, sortConfig]);

  // Handler pentru afișarea detaliilor comenzii
  const handleShowOrderDetails = (order) => {
    // Formatăm comanda pentru modal
    const formattedOrder = formatOrderForModals(order);
    setSelectedOrder(formattedOrder);
    setIsDetailsModalOpen(true);
  };

  // Handler pentru închiderea modalului de detalii
  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedOrder(null);
  };

  // Handler pentru editarea comenzii
  const handleEditOrder = (order) => {
    // Formatăm comanda pentru modal
    const formattedOrder = formatOrderForModals(order);
    setEditingOrder(formattedOrder);
    setIsEditModalOpen(true);
  };

  // Handler pentru închiderea modalului de editare
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingOrder(null);
  };

  // Handler pentru salvarea modificărilor la comandă
  const handleSaveOrder = async () => {
    try {
      console.log("Saving order with data:", editingOrder);
      
      if (!editingOrder || !editingOrder.id) {
        throw new Error("Comanda nu conține date valide");
      }

      // Aici ar trebui să implementezi actualizarea comenzii prin API
      // De exemplu:
      // await dashboardService.updateOrder(editingOrder._id, editingOrder);
      
      // Actualizăm starea locală
      const updatedOrders = ultimeleComenzi.map(order => 
        order._id === editingOrder._id ? editingOrder : order
      );
      setUltimeleComenzi(updatedOrders);
      
      toast.success('Comanda a fost actualizată cu succes');
      
      // Închide modalul
      handleCloseEditModal();
    } catch (error) {
      console.error('Eroare la salvarea comenzii:', error);
      toast.error('Nu s-a putut actualiza comanda: ' + (error.message || 'Eroare necunoscută'));
    }
  };

  // Handler pentru modificări în formularul de editare
  const handleOrderChange = (e) => {
    const { name, value } = e.target;
    setEditingOrder(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Detectare dispozitiv mobil
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Componenta de loading
  if (isLoading) {
    return (
      <AdminLayout>
        <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
            <p className="text-gray-600">Se încarcă datele...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  // Error component - if all APIs failed
  if (Object.keys(errors).length > 0) {
    return (
      <AdminLayout>
        <div className="p-6 bg-gray-50 min-h-screen">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  Nu s-au putut încărca datele pentru dashboard. Vă rugăm încercați din nou mai târziu.
                </p>
              </div>
            </div>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Reîncarcă pagina
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Statistici principale */}
        <StatCards stats={stats} />
        
        {/* Grafice și tabele */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Grafic vânzări */}
          <SalesChart 
            data={vanzariData}
            onPeriodChange={handlePeriodChange} 
            selectedPeriod={perioadaSelectata} 
          />

          {/* Distribuție vânzări */}
          <DistributionChart data={distributieData} colors={COLORS} />
        </div>
        
        {/* Ultimele comenzi */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Ultimele Comenzi</h2>
              <Link to="/admin/comenzi" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                Vezi toate
              </Link>
            </div>
            
            {isMobile ? (
              // Versiunea mobilă
              <OrderList 
                orders={sortedOrders} 
                handleShowOrderDetails={handleShowOrderDetails} 
                handleEditOrder={handleEditOrder} 
              />
            ) : (
              // Versiunea desktop
              <OrderTable 
                currentItems={sortedOrders} 
                sortConfig={sortConfig} 
                requestSort={requestSort} 
                getSortIcon={getSortIcon}
                handleShowOrderDetails={handleShowOrderDetails} 
                handleEditOrder={handleEditOrder} 
              />
            )}
          </div>
        </div>
      </div>

      {/* Modale */}
      <OrderDetailsModal 
        isDetailsModalOpen={isDetailsModalOpen}
        selectedOrder={selectedOrder}
        handleCloseDetailsModal={handleCloseDetailsModal}
      />
      
      <EditOrderModal 
        isModalOpen={isEditModalOpen}
        editingOrder={editingOrder}
        handleCloseModal={handleCloseEditModal}
        handleSaveOrder={handleSaveOrder}
        handleOrderChange={handleOrderChange}
      />
    </AdminLayout>
  );
};

export default AdminDashboard;

