import React, { useState, useEffect } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import OrderFilters from '../components/AdminOrdersFilters';
import OrderTable from '../components/AdminOrdersTable';
import OrderList from '../components/AdminOrdersList';
import EditOrderModal from '../components/EditOrderModal';
import OrderDetailsModal from '../components/OrderDetailsModal';
import { orderEndpoints } from '../services/api/endpoints';
import { useAuthContext } from '../context/authContext';

// Funcție pentru formatarea structurii comenzii compatibilă cu ambele modale
const formatOrderForModals = (order) => {
  if (!order) return null;
  
  // Verificăm dacă avem deja structura veche (cu produse)
  const hasOldStructure = !!order.produse;
  
  // Dacă deja folosește structura veche, o returnăm neschimbată
  if (hasOldStructure) {
    return order;
  }
  
  // Formatarea structurii noi pentru OrderDetailsModal și EditOrderModal
  const formattedOrder = {
    id: order.orderNumber || order._id,
    _id: order._id, // Păstrăm și _id pentru API calls
    data: new Date(order.createdAt).toLocaleDateString('ro-RO'),
    client: `${order.customerInfo?.firstName || ''} ${order.customerInfo?.lastName || ''}`.trim(),
    email: order.customerInfo?.email || '',
    telefon: order.customerInfo?.phone || '',
    metodaPlata: order.paymentMethod || 'Ramburs',
    observatii: order.notes || '',
    status: order.status || 'În procesare',
    motivAnulare: order.cancellationReason || '',
    // Formatăm adresa
    adresa: order.shippingInfo ? 
      `${order.shippingInfo.address || ''}, ${order.shippingInfo.city || ''}, ${order.shippingInfo.county || ''}`.trim() :
      '',
    // Transformăm items în produse
    produse: (order.items || []).map(item => ({
      nume: item.productName,
      cantitate: item.quantity,
      pret: item.price
    }))
  };
  
  return formattedOrder;
};

const AdminOrders = () => {
  const { currentUser, isAuthenticated } = useAuthContext();
  const [comenzi, setComenzi] = useState([]);
  const [filteredComenzi, setFilteredComenzi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [filters, setFilters] = useState({
    idComanda: '',
    client: '',
    status: '',
    dataStart: '',
    dataEnd: '',
    sumMinima: '',
    sumMaxima: ''
  });
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  
  const [sortConfig, setSortConfig] = useState({
    key: 'createdAt',
    direction: 'desc'
  });
  
  const [editingOrder, setEditingOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  
  const [isCompactView, setIsCompactView] = useState(false);
  
  // Funcție pentru a încărca comenzile de la API
  const fetchOrders = async () => {
    if (!isAuthenticated || currentUser.role !== 'admin') {
      setError('Acces restricționat. Sunt necesare drepturi de administrator.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // Obținem toate comenzile fără filtrare (filtrarea se va face în frontend)
      const response = await orderEndpoints.getAllOrders();
      const data = response.data;
      
      setComenzi(data.orders || []);
      // Filtrarea se va face într-un useEffect separat
      setLoading(false);
    } catch (err) {
      console.error('Eroare la încărcarea comenzilor:', err);
      if (err.response?.status === 403) {
        setError('Nu aveți permisiunea de a accesa această resursă. Sunt necesare drepturi de administrator.');
      } else {
        setError('Nu s-au putut încărca comenzile. Vă rugăm încercați din nou.');
      }
      setComenzi([]);
      setFilteredComenzi([]);
      setTotalPages(1);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchOrders();
    
    const handleResize = () => {
      setIsCompactView(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isAuthenticated]);
  
  // Filtrarea comenzilor în frontend
  useEffect(() => {
    // Calculează totalul unei comenzi
    const calculateTotal = (order) => {
      const subtotal = order.items?.reduce((total, item) => {
        return total + (item.price * item.quantity);
      }, 0) || 0;
      
      return subtotal + (order.shipping || 0) - (order.discount || 0);
    };

    // Filtrăm comenzile conform criteriilor
    const filteredResults = comenzi.filter(comanda => {
      // Filtrare după ID comandă
      if (filters.idComanda && !comanda.orderNumber.toLowerCase().includes(filters.idComanda.toLowerCase())) {
        return false;
      }
      
      // Filtrare după numele clientului
      if (filters.client) {
        const clientName = `${comanda.customerInfo?.firstName || ''} ${comanda.customerInfo?.lastName || ''}`.toLowerCase();
        if (!clientName.includes(filters.client.toLowerCase())) {
          return false;
        }
      }
      
      // Filtrare după status
      if (filters.status && comanda.status !== filters.status) {
        return false;
      }
      
      // Filtrare după data
      if (filters.dataStart && new Date(comanda.createdAt) < new Date(filters.dataStart)) {
        return false;
      }
      if (filters.dataEnd && new Date(comanda.createdAt) > new Date(filters.dataEnd)) {
        return false;
      }
      
      // Filtrare după sumă
      const total = calculateTotal(comanda);
      if (filters.sumMinima && total < parseFloat(filters.sumMinima)) {
        return false;
      }
      if (filters.sumMaxima && total > parseFloat(filters.sumMaxima)) {
        return false;
      }
      
      return true;
    });
    
    // Sortarea rezultatelor
    const sortedResults = [...filteredResults].sort((a, b) => {
      if (sortConfig.key === 'total') {
        const totalA = calculateTotal(a);
        const totalB = calculateTotal(b);
        return sortConfig.direction === 'asc' ? totalA - totalB : totalB - totalA;
      } 
      else if (sortConfig.key === 'createdAt') {
        return sortConfig.direction === 'asc' 
          ? new Date(a.createdAt) - new Date(b.createdAt) 
          : new Date(b.createdAt) - new Date(a.createdAt);
      }
      else if (sortConfig.key === 'customerInfo.lastName') {
        const nameA = `${a.customerInfo?.lastName || ''}, ${a.customerInfo?.firstName || ''}`;
        const nameB = `${b.customerInfo?.lastName || ''}, ${b.customerInfo?.firstName || ''}`;
        return sortConfig.direction === 'asc' 
          ? nameA.localeCompare(nameB) 
          : nameB.localeCompare(nameA);
      }
      else {
        // Pentru celelalte chei, folosim operatorul de acces proprietăți imbricate
        const getNestedProperty = (obj, path) => {
          return path.split('.').reduce((prev, curr) => 
            prev && prev[curr] !== undefined ? prev[curr] : null, obj);
        };
        
        const valA = getNestedProperty(a, sortConfig.key);
        const valB = getNestedProperty(b, sortConfig.key);
        
        if (typeof valA === 'string' && typeof valB === 'string') {
          return sortConfig.direction === 'asc' 
            ? valA.localeCompare(valB) 
            : valB.localeCompare(valA);
        }
        
        // Pentru valori numerice
        return sortConfig.direction === 'asc' 
          ? (valA || 0) - (valB || 0) 
          : (valB || 0) - (valA || 0);
      }
    });
    
    setFilteredComenzi(sortedResults);
    
    // Calculăm numărul total de pagini
    setTotalPages(Math.ceil(sortedResults.length / itemsPerPage));
  }, [filters, comenzi, sortConfig, itemsPerPage]);
  
  // Resetăm pagina când se schimbă filtrele
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };
  
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };
  
  // Calculează indexul primului și ultimului element afișat pentru paginare
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = ((currentPage - 1) * itemsPerPage) + 1;
  
  // Obține elementele pentru pagina curentă
  const currentItems = filteredComenzi.slice((currentPage - 1) * itemsPerPage, indexOfLastItem);
  
  // Editare comandă - formatăm datele înainte de a le trimite către modal
  const handleEditOrder = (order) => {
    // Formatăm comanda înainte de a o seta în state
    setEditingOrder(formatOrderForModals(order));
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingOrder(null);
  };
  
  


const handleSaveOrder = async (order, shippingDetails = null) => {
  console.log('Salvare comandă:', order);

  try {
    // Pregătim datele pentru actualizare
    const updateData = {
      status: order.status
    };
    
    // Adăugăm telefon și adresă doar dacă comanda este în procesare
    if (order.status === 'În procesare') {
      updateData.customerInfo = {
        phone: order.telefon
      };
      
      // Folosim shippingDetails dacă este furnizat, altfel facem split la adresa
      if (shippingDetails) {
        updateData.shippingInfo = {
          address: shippingDetails.address || '',
          city: shippingDetails.city || '',
          county: shippingDetails.county || '',
          postalCode: shippingDetails.postalCode || ''
        };
      } else {
        // Logica existentă pentru când shippingDetails nu este furnizat
        const addressParts = order.adresa ? order.adresa.split(', ') : [];
        updateData.shippingInfo = {
          address: addressParts[0] || '',
          city: addressParts[1] || '',
          county: addressParts[2] || '',
          postalCode: order.codPostal || ''
        };
      }
    }
    

    
    // Actualizăm comanda în backend
    await orderEndpoints.updateOrder(order._id, updateData);
    
    // Reîncarcă comenzile pentru a reflecta modificările
    fetchOrders();
    handleCloseModal();
  } catch (err) {
    console.error('Eroare la actualizarea comenzii:', err);
    if (err.response?.status === 403) {
      alert('Nu aveți permisiunea de a actualiza această comandă. Sunt necesare drepturi de administrator.');
    } else {
      alert(`Eroare la actualizarea comenzii: ${err.response?.data?.message || 'Încercați din nou mai târziu.'}`);
    }
  }
};

  const handleOrderChange = (e) => {
    const { name, value } = e.target;
    setEditingOrder({
      ...editingOrder,
      [name]: value
    });
  };
  
  const resetFilters = () => {
    setFilters({
      idComanda: '',
      client: '',
      status: '',
      dataStart: '',
      dataEnd: '',
      sumMinima: '',
      sumMaxima: ''
    });
  };

  // Funcția pentru a vizualiza detaliile comenzii - folosește aceeași funcție de formatare
  const handleShowOrderDetails = async (order) => {
    if (!isAuthenticated || currentUser.role !== 'admin') {
      alert('Nu aveți permisiunea de a vizualiza detaliile comenzilor. Sunt necesare drepturi de administrator.');
      return;
    }
    
    try {
      // Verifică dacă avem deja toate detaliile necesare sau trebuie să le preluăm
      if (order.items) {
        // Formatăm comanda înainte de a o seta în state, folosind aceeași funcție ca pentru EditOrderModal
        setSelectedOrder(formatOrderForModals(order));
      } else {
        // Obține detaliile complete ale comenzii și apoi formatează
        const response = await orderEndpoints.getOrderById(order._id);
        setSelectedOrder(formatOrderForModals(response.data));
      }
      setIsDetailsModalOpen(true);
    } catch (err) {
      console.error('Eroare la încărcarea detaliilor comenzii:', err);
      if (err.response?.status === 403) {
        alert('Nu aveți permisiunea de a vizualiza această comandă. Sunt necesare drepturi de administrator.');
      } else {
        alert(`Eroare la încărcarea detaliilor comenzii: ${err.response?.data?.message || 'Încercați din nou mai târziu.'}`);
      }
    }
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedOrder(null);
  };

  const renderNoOrders = () => (
    <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 className="text-lg font-medium text-gray-700 mb-2">Nu au fost găsite comenzi</h3>
      <p className="text-gray-500 mb-4">Încercați să modificați criteriile de filtrare pentru a găsi rezultate.</p>
      <button 
        onClick={resetFilters}
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 inline-flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Resetează filtrele
      </button>
    </div>
  );

  const renderError = () => (
    <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 className="text-lg font-medium text-gray-700 mb-2">Eroare la încărcarea comenzilor</h3>
      <p className="text-gray-500 mb-4">{error}</p>
      <button 
        onClick={fetchOrders}
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 inline-flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Reîncarcă
      </button>
    </div>
  );
  
  const renderPagination = () => (
    <div className="flex flex-wrap items-center justify-between gap-4 mt-6 px-2">
      <div className="flex items-center space-x-2 text-sm text-gray-700">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className={`px-1 ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'hover:text-black'}`}
          aria-label="Prima pagină"
        >
          «
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-1 ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'hover:text-black'}`}
          aria-label="Pagina anterioară"
        >
          ‹
        </button>
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNum;
          if (totalPages <= 5) {
            pageNum = i + 1;
          } else if (currentPage <= 3) {
            pageNum = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = currentPage - 2 + i;
          }
          return (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`px-2 ${currentPage === pageNum ? 'font-bold underline' : 'hover:underline'}`}
            >
              {pageNum}
            </button>
          );
        })}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-1 ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'hover:text-black'}`}
          aria-label="Pagina următoare"
        >
          ›
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={`px-1 ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'hover:text-black'}`}
          aria-label="Ultima pagină"
        >
          »
        </button>
      </div>
      <div className="text-sm text-gray-500">
        Pagina {currentPage} din {totalPages}
      </div>
    </div>
  );

  return (
    <AdminLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-xl font-sans font-light text-gray-800 mb-6">
          Managment Comenzi
        </h1>
        
        {!isAuthenticated && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  Trebuie să fiți autentificat pentru a accesa această pagină.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {isAuthenticated && currentUser.role !== 'admin' && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Această pagină necesită drepturi de administrator. Unele funcționalități ar putea fi restricționate.
                </p>
              </div>
            </div>
          </div>
        )}
        
        <OrderFilters 
          filters={filters} 
          handleFilterChange={handleFilterChange} 
          resetFilters={resetFilters} 
        />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">
              Afișare <span className="font-medium">{indexOfFirstItem}</span>-
              <span className="font-medium">
                {indexOfLastItem > filteredComenzi.length ? filteredComenzi.length : indexOfLastItem}
              </span> din <span className="font-medium">{filteredComenzi.length}</span> comenzi
            </p>
          </div>
          <div className="flex items-center">
            <label htmlFor="itemsPerPage" className="text-sm text-gray-600 mr-2">Afișează:</label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="px-3 py-2 border text-black border-gray-300 rounded-md text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
          </div>
        ) : error ? (
          renderError()
        ) : filteredComenzi.length === 0 ? (
          renderNoOrders()
        ) : isCompactView ? (
          <OrderList 
            orders={currentItems} 
            handleShowOrderDetails={handleShowOrderDetails} 
            handleEditOrder={handleEditOrder} 
          />
        ) : (
          <OrderTable 
            currentItems={currentItems} 
            sortConfig={sortConfig} 
            requestSort={requestSort} 
            getSortIcon={(key) => getSortIcon(key, sortConfig)}
            handleShowOrderDetails={handleShowOrderDetails} 
            handleEditOrder={handleEditOrder} 
          />
        )}
        
        {filteredComenzi.length > 0 && renderPagination()}
      </div>

      <EditOrderModal 
        isModalOpen={isModalOpen}
        editingOrder={editingOrder}
        handleCloseModal={handleCloseModal}
        handleSaveOrder={handleSaveOrder}
        handleOrderChange={handleOrderChange}
      />
      <OrderDetailsModal 
        isDetailsModalOpen={isDetailsModalOpen}
        selectedOrder={selectedOrder}
        handleCloseDetailsModal={handleCloseDetailsModal}
      />
    </AdminLayout>
  );
};

// Functie helper pentru iconitele de sortare
const getSortIcon = (key, sortConfig) => {
  if (sortConfig.key !== key) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
      </svg>
    );
  }
  return sortConfig.direction === 'asc' ? (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
};

export default AdminOrders;