import React, { useState, useEffect } from 'react';
import { Package, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { OrderStatus } from '../components/ui/OrderStatus';
import OrderDetailsModal from './OrderDetailsModal';

// Componenta OrderCard pentru mobil (neschimbată)
const OrderCard = ({ order, handleShowOrderDetails }) => (
  <div className="bg-white rounded-lg shadow-sm p-4 mb-4 border border-gray-200">
    <div className="flex justify-between items-start mb-3">
      <h3 className="font-medium text-indigo-600">#{order.orderNumber}</h3>
      <div className="whitespace-nowrap">
        <OrderStatus status={order.status} />
      </div>
    </div>
    
    <p className="text-sm text-gray-700 mb-1">
      <span className="font-medium">Data:</span> {new Date(order.createdAt).toLocaleDateString('ro-RO')}
    </p>
    
    <p className="text-sm text-gray-700 mb-3">
      <span className="font-medium">Total:</span> {order.total ? order.total.toFixed(2) : calculateOrderTotal(order)} RON
    </p>
    
    <div className="flex justify-end space-x-2 mt-2">
      <button
        className="px-3 py-1 bg-gray-100 text-gray-600 rounded-md text-sm hover:bg-gray-200 flex items-center"
        onClick={() => handleShowOrderDetails(order)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        Detalii
      </button>
    </div>
  </div>
);

// Funcție utilă pentru calculul totalului (neschimbată)
const calculateOrderTotal = (order) => {
  if (!order || !order.items) return '0.00';
  const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = order.shipping || 0;
  const discount = order.discount || 0;
  return (subtotal + shipping - discount).toFixed(2);
};

// Funcție pentru a formata datele din order pentru modal (neschimbată)
const formatOrderForModal = (order) => {
  if (!order) return null;
  console.log(order);
  return {
    id: order.orderNumber,
    data: new Date(order.createdAt).toLocaleDateString('ro-RO'),
    client: `${order.customerInfo.firstName} ${order.customerInfo.lastName}`|| 'N/A',
    email: order.customerInfo.email || 'N/A',
    telefon: order.customerInfo.phone || 'N/A',
    adresa: order.shippingInfo ? 
      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.county}${order.shippingInfo.postalCode ? `, ${order.shippingInfo.postalCode}` : ''}` : 
      'N/A',
    metodaLivrare:order.paymentMethod,
    observatii:order.notes,
    status: order.status,
    produse: order.items.map(item => ({
      nume: item.productName,
      cantitate: item.quantity,
      pret: item.price
    }))
  };
};

// Componenta principală OrdersHistory (modificată pentru detectarea lățimii ecranului)
export const OrdersHistory = ({ orders, loading }) => {
  // Stare pentru a determina dacă este mobil, bazată pe lățimea ecranului
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Actualizează isMobile la redimensionarea ferestrei
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  console.log("OrdersHistory component - isMobile:", isMobile);

  // State pentru varianta mobilă cu modal
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  
  // State pentru varianta desktop cu expandare
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [orderDetails, setOrderDetails] = useState({});

  // Handler pentru mobil - deschide modalul
  const handleShowOrderDetails = (order) => {
    console.log("handleShowOrderDetails called with order:", order);
    setSelectedOrder(order);
    setIsDetailsModalOpen(true);
  };

  // Handler pentru desktop - expandează în tabel
  const toggleOrderDetails = (order) => {
    const orderId = order._id;
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
      return;
    }
    if (!orderDetails[orderId]) {
      setOrderDetails(prev => ({
        ...prev,
        [orderId]: order
      }));
    }
    setExpandedOrderId(orderId);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
  };

  const formattedSelectedOrder = formatOrderForModal(selectedOrder);

  // Determină ce să afișeze în funcție de isMobile
  const renderOrders = () => {
    console.log("renderOrders - isMobile value:", isMobile);
    if (orders.length === 0) {
      return (
        <div className="text-center py-8">
          <Package className="h-12 w-12 text-gray-300 mx-auto mb-2" />
          <p className="text-gray-500">Nu ai nicio comandă momentan</p>
        </div>
      );
    }

    if (isMobile) {
      console.log("Rendering mobile cards view");
      return (
        <div>
          {orders.map((order) => (
            <OrderCard 
              key={order.orderNumber || order._id} 
              order={order} 
              handleShowOrderDetails={handleShowOrderDetails}
            />
          ))}
        </div>
      );
    } 
    
    console.log("Rendering desktop table view");
    return (
      <div className={`overflow-x-auto ${orders.length > 5 && expandedOrderId === null ? 'max-h-96 overflow-y-auto scrollbar-hide' : ''}`}
           style={{
             scrollbarWidth: 'none',
             msOverflowStyle: 'none',
           }}>
        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className={`bg-gray-50 ${orders.length > 5 && expandedOrderId === null ? 'sticky top-0 z-10' : ''}`}>
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Comandă
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acțiuni
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <React.Fragment key={order.orderNumber || order._id}>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {order.orderNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString('ro-RO')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <OrderStatus status={order.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {order.total ? order.total.toFixed(2) : calculateOrderTotal(order)} RON
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button 
                      variant="link" 
                      className="!text-blue-600 !hover:text-blue-800 flex items-center"
                      onClick={() => toggleOrderDetails(order)}
                    >
                      Detalii
                      {expandedOrderId === order._id ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      )}
                    </Button>
                  </td>
                </tr>
                {expandedOrderId === order._id && (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 bg-gray-50">
                      <OrderDetailsExpanded order={orderDetails[order._id]} />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Comenzile mele</h2>
      
      {loading ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Se încarcă comenzile...</p>
        </div>
      ) : renderOrders()}

    

        <div style={{ 
          position: 'fixed', 
          top: '30vh', 
          left: '0', 
          right: '0', 
          zIndex: '1050' /* asigură-te că este mai mare decât alte elemente */
        }}>
          <OrderDetailsModal
            isDetailsModalOpen={isDetailsModalOpen}
            selectedOrder={formattedSelectedOrder}
            handleCloseDetailsModal={handleCloseDetailsModal}
          />
        </div>
    </div>
  );
};

// Componenta separată pentru afișarea detaliilor comenzii în tabel (desktop) (neschimbată)
const OrderDetailsExpanded = ({ order }) => {
  if (!order) return (
    <div className="text-center py-4">
      <p className="text-gray-500">Nu s-au putut încărca detaliile comenzii</p>
    </div>
  );

  const calculateTotal = () => {
    const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = order.shipping || 0;
    const discount = order.discount || 0;
    return (subtotal + shipping - discount).toFixed(2);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white p-3 rounded shadow-sm">
        <h3 className="font-medium text-gray-700 mb-2">Produse comandate</h3>
        <div className="divide-y divide-gray-200">
          {order.items.map((item) => (
            <div 
              key={item._id || `${item.productId}-${item.price}`} 
              className="py-1.5 flex items-start"
            >
              <div className="flex-grow">
                <p className="font-medium text-gray-900 text-sm">{item.productName}</p>
                <div className="flex justify-between text-gray-600 mt-0.5 text-sm">
                  <span>Cantitate: {item.quantity}</span>
                  <span>Preț unitar: {item.price} RON</span>
                  <span className="font-medium">subtotal: {(item.price * item.quantity).toFixed(2)} RON</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-3 pt-3 border-t border-gray-200 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal produse:</span>
            <span>
              {order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)} RON
            </span>
          </div>
          <div className="flex justify-between text-gray-600 mt-0.5">
            <span>Cost livrare:</span>
            <span>{order.shipping} RON</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-green-600 mt-0.5">
              <span>Discount:</span>
              <span>-{order.discount} RON</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-gray-900 mt-2 pt-2 border-t border-gray-200">
            <span>Total:</span>
            <span>{calculateTotal()} RON</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow-sm">
          <h3 className="font-medium text-gray-700 mb-2">Detalii comandă</h3>
          <p className="text-black">data plasării comenzii: {new Date(order.createdAt).toLocaleString('ro-RO')}</p>
          <p className="text-black">metodă de plată: {
            order.paymentMethod === 'card' ? 'card bancar' : 
            order.paymentMethod === 'ramburs' ? 'ramburs' : 
            order.paymentMethod === 'transfer' ? 'Transfer bancar' : 
            order.paymentMethod
          }</p>
          {order.notes && (
            <>
              <h3 className="font-medium text-gray-700 mt-4 mb-2">Observații</h3>
              <p className="text-black">{order.notes}</p>
            </>
          )}
        </div>
        
        <div className="bg-white p-4 rounded shadow-sm">
          <h3 className="font-medium text-gray-700 mb-2">Informații livrare</h3>
          <p className='text-black'>Adresa: {order.shippingInfo.address} {order.shippingInfo.city}, {order.shippingInfo.county}  {order.shippingInfo.postalCode && `, ${order.shippingInfo.postalCode}`}</p>
          {order.shippingInfo.deliveryDate && (
            <p className='text-black'>
              Data livrare: {new Date(order.shippingInfo.deliveryDate).toLocaleDateString('ro-RO')}
            </p>
          )}
          {order.shippingInfo.deliveryTimeSlot && (
            <p className='text-black'>Interval de livrare: {order.shippingInfo.deliveryTimeSlot}</p>
          )}
        </div>
      </div>
    </div>
  );
};