


import React from 'react';

const OrderTable = ({ 
  currentItems, 
  sortConfig, 
  requestSort, 
  getSortIcon,
  handleShowOrderDetails, 
  handleEditOrder 
}) => {
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                scope="col" 
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('orderNumber')}
              >
                <div className="flex items-center">
                  ID Comandă
                  <span className="ml-1">{getSortIcon('orderNumber')}</span>
                </div>
              </th>
              <th 
                scope="col" 
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('customerInfo.lastName')}
              >
                <div className="flex items-center">
                  Client
                  <span className="ml-1">{getSortIcon('customerInfo.lastName')}</span>
                </div>
              </th>
              <th 
                scope="col" 
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('total')}
              >
                <div className="flex items-center">
                  Sumă
                  <span className="ml-1">{getSortIcon('total')}</span>
                </div>
              </th>
              <th 
                scope="col" 
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('createdAt')}
              >
                <div className="flex items-center">
                  Dată
                  <span className="ml-1">{getSortIcon('createdAt')}</span>
                </div>
              </th>
              <th 
                scope="col" 
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('status')}
              >
                <div className="flex items-center">
                  Status
                  <span className="ml-1">{getSortIcon('status')}</span>
                </div>
              </th>
              <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acțiuni
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                  {order.orderNumber}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                  {order.customerInfo ? `${order.customerInfo.firstName} ${order.customerInfo.lastName}` : 'N/A'}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {calculateTotal(order)} RON
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString('ro-RO')}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className={`
                    px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${order.status === 'Livrată' ? 'bg-green-100 text-green-800' : 
                      order.status === 'În procesare' ? 'bg-yellow-100 text-yellow-800' : 
                      order.status === 'Anulată' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'}
                  `}>
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-right">
                  <button 
                    className="text-gray-500 hover:text-indigo-600 mr-3"
                    onClick={() => handleShowOrderDetails(order)}
                    aria-label="Detalii comandă"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button 
                    className="text-gray-500 hover:text-indigo-600"
                    onClick={() => handleEditOrder(order)}
                    aria-label="Editare comandă"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;