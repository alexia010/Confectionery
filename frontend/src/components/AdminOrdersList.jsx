import React from 'react';

const OrderList = ({ orders, handleShowOrderDetails, handleEditOrder }) => {
  // Funcție pentru calcularea sumei totale a comenzii
  const calculateTotal = (order) => {
    // Calculează subtotalul produselor
    const subtotal = order.items?.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0) || 0;
    
    // Adaugă costul livrării și scade discountul
    const total = subtotal + (order.shipping || 0) - (order.discount || 0);
    
    return total.toFixed(2);
  };

  return (
    <div className="space-y-4">
      {orders.map(order => (
        <div key={order._id} className="bg-white rounded-lg shadow-sm p-4 mb-4 border border-gray-200">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-medium text-indigo-600">{order.orderNumber}</h3>
            <span className={`
              px-2 py-1 text-xs font-semibold rounded-full
              ${order.status === 'Livrată' ? 'bg-green-100 text-green-800' : 
                order.status === 'În procesare' ? 'bg-yellow-100 text-yellow-800' : 
                order.status === 'Anulată' ? 'bg-red-100 text-red-800' :
                'bg-blue-100 text-blue-800'}
            `}>
              {order.status}
            </span>
          </div>
          
          <p className="text-sm text-gray-700 mb-1">
            <span className="font-medium">Client:</span> {order.customerInfo ? `${order.customerInfo.firstName} ${order.customerInfo.lastName}` : 'N/A'}
          </p>
          <p className="text-sm text-gray-700 mb-1">
            <span className="font-medium">Data:</span> {new Date(order.createdAt).toLocaleDateString('ro-RO')}
          </p>
          <p className="text-sm text-gray-700 mb-2">
            <span className="font-medium">Suma:</span> {calculateTotal(order)} RON
          </p>
          
          <div className="grid grid-cols-2 gap-2 mt-2">
            <button 
              className="px-3 py-1 bg-gray-100 text-gray-600 rounded-md text-sm hover:bg-gray-200 flex items-center justify-center"
              onClick={() => handleShowOrderDetails(order)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Detalii
            </button>
            <button 
              className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-md text-sm hover:bg-indigo-200 flex items-center justify-center"
              onClick={() => handleEditOrder(order)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Editează
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderList;