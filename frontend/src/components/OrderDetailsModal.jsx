

import React from 'react';
import ModalWrapper from './ui/ModalWrapper';

const OrderDetailsModal = ({
  isDetailsModalOpen,
  selectedOrder,
  handleCloseDetailsModal,
}) => {
  if (!selectedOrder) return null;

  const calculateTotal = () => {
    return selectedOrder.produse.reduce(
      (total, produs) => total + produs.pret * produs.cantitate,
      0
    );
  };

  console.log(selectedOrder);

  return (
  <ModalWrapper
      isOpen={isDetailsModalOpen}
      onClose={handleCloseDetailsModal}
    >
      <div className="bg-white rounded-xl w-full max-w-2xl h-[80vh] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-lg font-bold text-gray-900">
            Detalii Comandă
          </h2>
          <button
            onClick={handleCloseDetailsModal}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal Content - Modified to hide scrollbar */}
        <div className="p-5 space-y-5 overflow-y-auto flex-grow scrollbar-none">
          {/* Order Summary */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase">
                Număr Comandă
              </p>
              <p className="text-sm font-semibold text-pink-600">
                {selectedOrder.id}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase">
                Dată Comandă
              </p>
              <p className="text-sm text-gray-700">
                {selectedOrder.data}
              </p>
            </div>
          </div>

          {/* Client Details */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">
              Informații Client
            </h3>
            <div className="space-y-1 text-sm text-gray-700">
              <p>
                <span className="text-gray-500">Nume: </span>
                {selectedOrder.client}
              </p>
              <p>
                <span className="text-gray-500">Email: </span>
                {selectedOrder.email}
              </p>
              <p>
                <span className="text-gray-500">Telefon: </span>
                {selectedOrder.telefon}
              </p>
            </div>
          </div>

          {/* Detalii Comandă - grupate metoda plată și observații */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">
              Detalii Comandă
            </h3>
            <div className="space-y-1 text-sm text-gray-700">
              <p>
                <span className="text-gray-500">Metodă de plată: </span>
                {selectedOrder.metodaPlata || "Ramburs"}
              </p>
              {selectedOrder.observatii && (
                <p>
                  <span className="text-gray-500">Observații: </span>
                  {selectedOrder.observatii}
                </p>
              )}
            </div>
          </div>

          {/* Shipping Details */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">
              Detalii Livrare
            </h3>
            <div className="space-y-1 text-sm text-gray-700">
              <p>{selectedOrder.adresa}</p>
              {/* <p>
                <span className="text-gray-500">Metoda de livrare: </span>
                {selectedOrder.metodaLivrare || "Standard"}
              </p> */}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              Produse Comandate
            </h3>
            <div className="divide-y divide-gray-200">
              {selectedOrder.produse.map((produs, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 text-sm"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {produs.nume}
                    </p>
                    <p className="text-gray-500">
                      {produs.cantitate} x {produs.pret} RON
                    </p>
                  </div>
                  <p className="font-semibold text-gray-800">
                    {produs.cantitate * produs.pret} RON
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
            <p className="text-sm font-semibold text-gray-800">
              Total Comandă
            </p>
            <p className="text-lg font-bold text-pink-600">
              {calculateTotal()} RON
            </p>
          </div>

          {/* Status */}
          <div className="text-center">
            <span
              className={`px-4 py-1.5 inline-block rounded-full text-xs font-medium
                ${
                  selectedOrder.status === 'Livrată'
                    ? 'bg-green-100 text-green-800'
                    : selectedOrder.status === 'În procesare'
                    ? 'bg-yellow-100 text-yellow-800'
                    : selectedOrder.status === 'Anulată'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-blue-100 text-blue-800'
                }`}
            >
              Status: {selectedOrder.status}
            </span>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default OrderDetailsModal;