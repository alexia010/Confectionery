


import React, { useState, useEffect } from 'react';
import ModalWrapper from './ui/ModalWrapper';

const EditOrderModal = ({
  isModalOpen,
  editingOrder,
  handleCloseModal,
  handleSaveOrder,
  handleOrderChange,
}) => {
  if (!editingOrder) return null;

  const [error, setError] = useState('');
  const [attempted, setAttempted] = useState(false);
  
  // State local pentru adresă separată în componente
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    county: '',
    postalCode: ''
  });
  
  // Parsează adresa la deschiderea modalului
  useEffect(() => {
    if (editingOrder && editingOrder.adresa) {
      // Încercăm să extragem componentele adresei (adresă, oraș, județ)
      const addressParts = editingOrder.adresa.split(', ');
      
      setShippingInfo({
        address: addressParts[0] || '',
        city: addressParts[1] || '',
        county: addressParts[2] || '',
        postalCode: addressParts[3] || ''
      });
    } else {
      setShippingInfo({
        address: '',
        city: '',
        county: '',
        postalCode: ''
      });
    }
  }, [editingOrder]);
  
  // Check if status is valid (not empty)
  const isStatusValid = editingOrder.status && editingOrder.status !== '';
  
  // Reset error when order changes
  useEffect(() => {
    setError('');
    setAttempted(false);
  }, [editingOrder]);

  const isEditable = editingOrder.status === 'În procesare';

  // Modified close handler with validation
  const handleClose = () => {
    if (!isStatusValid) {
      setError('Vă rugăm să selectați un status valid înainte de a închide.');
      setAttempted(true);
      return;
    }
    handleCloseModal();
  };

  // Modified save handler with validation
  const handleSave = () => {
    if (!isStatusValid) {
      setError('Vă rugăm să selectați un status valid înainte de a salva.');
      setAttempted(true);
      return;
    }
    
    // Trebuie să combinăm editingOrder cu shippingInfo
    // pentru a trimite toate datele actualizate
    const updatedOrder = {
      ...editingOrder,
      // Concatenăm componentele adresei pentru compatibilitate
      adresa: `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.county}`,
      // Adăugăm și câmpul separat pentru cod poștal
      codPostal: shippingInfo.postalCode
    };
    
    // Trimitem ordinea actualizată
    handleSaveOrder(updatedOrder);
  };

  // Custom handler for status changes
  const handleStatusChange = (e) => {
    handleOrderChange(e);
    if (e.target.value !== '') {
      setError('');
    }
  };
  
  // Handler pentru modificările din câmpurile de adresă
  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <ModalWrapper isOpen={isModalOpen}>
      <div className="bg-white rounded-xl w-full max-w-2xl h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-200 flex-shrink-0">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Editare Comandă</h2>
            <p className="text-sm text-gray-500">
              #{editingOrder.id} - {editingOrder.data}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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

        {/* Conținut cu scroll */}
        <div className="p-6 space-y-5 overflow-y-auto flex-grow scrollbar-none">
          {/* Client */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
            <input
              type="text"
              name="client"
              value={editingOrder.client}
              disabled
              className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 cursor-not-allowed"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="text"
              name="email"
              value={editingOrder.email}
              disabled
              className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 cursor-not-allowed"
            />
          </div>

          {/* Telefon */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
            <input
              type="text"
              name="telefon"
              value={editingOrder.telefon}
              onChange={handleOrderChange}
              placeholder="07xxxxxxxx"
              disabled={!isEditable}
              className={`w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none ${
                !isEditable ? 'bg-gray-50 text-gray-700 cursor-not-allowed' : 'text-black'
              }`}
            />
          </div>

          {/* Adresa - acum cu câmpuri separate */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Adresă Livrare</h3>
            
            {/* Stradă, număr */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">Stradă, număr</label>
              <input
                type="text"
                name="address"
                value={shippingInfo.address}
                onChange={handleShippingChange}
                placeholder="Calea Călărașilor nr. 170, Sector 3"
                disabled={!isEditable}
                className={`w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none ${
                  !isEditable ? 'bg-gray-50 text-gray-700 cursor-not-allowed' : 'text-black'
                }`}
              />
            </div>
            
            {/* Oraș */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">Oraș</label>
              <input
                type="text"
                name="city"
                value={shippingInfo.city}
                onChange={handleShippingChange}
                placeholder="București"
                disabled={!isEditable}
                className={`w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none ${
                  !isEditable ? 'bg-gray-50 text-gray-700 cursor-not-allowed' : 'text-black'
                }`}
              />
            </div>
            
            {/* Județ */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">Județ</label>
              <input
                type="text"
                name="county"
                value={shippingInfo.county}
                onChange={handleShippingChange}
                placeholder="București"
                disabled={!isEditable}
                className={`w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none ${
                  !isEditable ? 'bg-gray-50 text-gray-700 cursor-not-allowed' : 'text-black'
                }`}
              />
            </div>
            
            {/* Cod poștal */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">Cod poștal</label>
              <input
                type="text"
                name="postalCode"
                value={shippingInfo.postalCode}
                onChange={handleShippingChange}
                placeholder="123456"
                disabled={!isEditable}
                className={`w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none ${
                  !isEditable ? 'bg-gray-50 text-gray-700 cursor-not-allowed' : 'text-black'
                }`}
              />
            </div>
          </div>

          {/* Sumar comandă */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sumar Comandă</label>
            <div className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-700">
              <p className="text-sm">
                {editingOrder.produse?.length || 0} produs(e) - Total:{' '}
                {editingOrder.produse ? editingOrder.produse.reduce((sum, p) => sum + p.cantitate * p.pret, 0) : 0} RON
              </p>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              value={editingOrder.status}
              onChange={handleStatusChange}
              className={`text-black w-full px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:outline-none ${
                attempted && !isStatusValid
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-200 focus:ring-pink-500'
              }`}
            >
              <option value="">Selectează statusul</option>
              <option value="În procesare">În procesare</option>
              <option value="Expediată">Expediată</option>
              <option value="Livrată">Livrată</option>
              <option value="Anulată">Anulată</option>
            </select>
            {attempted && !isStatusValid && (
              <p className="mt-1 text-sm text-red-600">
                Selectarea unui status este obligatorie.
              </p>
            )}
          </div>

          {/* Motiv anulare */}
          {editingOrder.status === 'Anulată' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Motiv Anulare</label>
              <textarea
                name="motivAnulare"
                value={editingOrder.motivAnulare || ''}
                onChange={handleOrderChange}
                rows={2}
                placeholder="Ex. Clientul a renunțat"
                className="text-black w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
              />
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Butoane */}
          <div className="pt-4 flex justify-end space-x-3">
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            >
              Anulează
            </button>
            <button
              onClick={handleSave}
              className={`px-4 py-2 rounded-lg transition ${
                !isStatusValid
                  ? 'bg-pink-300 text-white cursor-pointer'
                  : 'bg-[#F5A9B8] text-white hover:bg-pink-600'
              }`}
            >
              Salvează
            </button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default EditOrderModal;