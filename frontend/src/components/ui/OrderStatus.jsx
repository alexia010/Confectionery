import React from 'react';

export const OrderStatus = ({ status }) => {
  const statusStyles = {
    'Livrată': 'bg-green-100 text-green-800',
    'În procesare': 'bg-yellow-100 text-yellow-800',
    'Anulată': 'bg-red-100 text-red-800',
    'În așteptare': 'bg-blue-100 text-blue-800'
  };
  
  const style = statusStyles[status] || 'bg-gray-100 text-gray-800';
  
  return (
    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${style}`}>
      {status}
    </span>
  );
};