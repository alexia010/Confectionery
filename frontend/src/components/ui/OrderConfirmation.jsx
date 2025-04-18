
import React, { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

const OrderConfirmation = ({ orderNumber }) => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
        <div className="bg-white p-10 rounded-2xl shadow-lg text-center border border-pink-100 animate-fadeIn">
          {/* Success animation */}
          <div className="flex justify-center mb-12 animate-bounce-once">
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-green-100 opacity-50 animate-pulse"></div>
              <CheckCircle size={72} className="text-green-500 relative z-10" />
            </div>
          </div>
          
          {/* Title with gradient */}
          <h1 className="text-black text-3xl font-bold mb-8">
            Comanda a fost plasată cu succes!
          </h1>
          
          {/* Order details */}
          <div className="mb-12 space-y-4">
            {orderNumber && (
              <p className="text-gray-700 text-lg leading-relaxed">
                Comanda cu numărul <span className="font-bold text-pink-600">{orderNumber}</span> a fost înregistrată.
              </p>
            )}
            <p className="text-gray-600 leading-relaxed">
              Vă mulțumim pentru comandă. Veți primi un email de confirmare în curând.
            </p>
          </div>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <button
              onClick={() => window.location.href = '/'}
              className="bg-[#F5A9B8] hover:bg-[#F08CA0] text-white font-medium py-4 px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
            >
              Înapoi la pagina principală
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;