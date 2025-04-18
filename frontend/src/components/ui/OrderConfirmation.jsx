

import React from 'react';

const OrderSuccess = ({ orderNumber }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-10 rounded-lg shadow-md text-center">
          <div className="flex justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Comanda a fost plasată cu succes!</h1>
          
          {orderNumber && (
            <p className="text-gray-700 mb-2">
              Comanda cu numărul <span className="font-semibold">{orderNumber}</span> a fost înregistrată.
            </p>
          )}
          
          <p className="text-gray-600 mb-8">
            Vă mulțumim pentru comandă. Veți primi un email de confirmare în curând.
          </p>
          
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => window.location.href = '/'}
              className="bg-[#D5A8B3] hover:bg-[#C7919E] text-white font-medium py-3 px-6 rounded-md"
            >
              Înapoi la pagina principală
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;