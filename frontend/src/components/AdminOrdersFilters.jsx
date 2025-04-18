// components/orders/OrderFilters.js

import React from 'react';

const OrderFilters = ({ filters, handleFilterChange, resetFilters }) => {
  return (
    <div className="bg-white rounded-xl shadow p-5 border border-gray-200 mb-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4">
        <h2 className="text-base font-semibold text-gray-700 mb-3 lg:mb-0 tracking-tight">Filtre</h2>
        <button 
          onClick={resetFilters}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 px-3 py-1.5 border border-gray-200 rounded-md transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Resetează
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
        <div className="flex flex-col">
          <label className="text-xs text-gray-600 mb-1">ID Comandă</label>
          <input
            type="text"
            name="idComanda"
            value={filters.idComanda}
            onChange={handleFilterChange}
            placeholder="ID..."
            className="px-3 py-1.5 text-sm text-black border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xs text-gray-600 mb-1">Client</label>
          <input
            type="text"
            name="client"
            value={filters.client}
            onChange={handleFilterChange}
            placeholder="Nume..."
            className="px-3 py-1.5 text-sm text-black border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xs text-gray-600 mb-1">Status</label>
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="px-3 py-1.5 text-sm border text-black border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="">Toate</option>
            <option value="În procesare">În procesare</option>
            <option value="Expediată">Expediată</option>
            <option value="Livrată">Livrată</option>
            <option value="Anulată">Anulată</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-xs text-gray-600 mb-1">Data</label>
          <input
            type="date"
            name="dataStart"
            value={filters.dataStart}
            onChange={handleFilterChange}
            className="px-3 py-1.5 text-sm text-black border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>
    </div>
  );
};

export default OrderFilters;