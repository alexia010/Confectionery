import React from 'react';

const DeliveryTime = ({ formData, handleInputChange, errors, formSubmitted, minDate }) => {
  return (
    <div className="mb-6 bg-[#F8F8F8] p-4 rounded-md border border-gray-200">
      <h3 className="text-sm font-medium text-[#3B2417] mb-3">Selectează data livrării *</h3>
      <p className="text-xs text-gray-500 mb-3">Vă rugăm să selectați data și ora la care doriți să primiți comanda.</p>
      
      <div className="mb-3">
        <label htmlFor="dataLivrare" className="block text-sm text-gray-600 mb-1">Data livrării *</label>
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#D5A8B3] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <input 
            type="date" 
            id="dataLivrare" 
            name="dataLivrare"
            value={formData.dataLivrare}
            onChange={handleInputChange}
            className={`flex-1 px-3 py-2 border ${(formSubmitted && errors.dataLivrare) ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-[#D5A8B3] focus:border-[#D5A8B3]`}
            min={minDate}
          />
        </div>
        {formSubmitted && errors.dataLivrare && (
          <p className="error-message mt-1 text-sm text-red-600">{errors.dataLivrare}</p>
        )}
      </div>
      
      <div className="mb-1">
        <label htmlFor="oraLivrare" className="block text-sm text-gray-600 mb-1">Intervalul orar *</label>
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#D5A8B3] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <select 
            id="oraLivrare"
            name="oraLivrare"
            value={formData.oraLivrare}
            onChange={handleInputChange}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D5A8B3] focus:border-[#D5A8B3]"
          >
            <option value="10-14">10:00 - 14:00</option>
            <option value="14-18">14:00 - 18:00</option>
            <option value="18-21">18:00 - 21:00</option>
          </select>
        </div>
      </div>
      
      <p className="text-xs text-gray-500 mt-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-4 w-4 text-[#D5A8B3] mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Pentru comenzile cu livrare în aceeași zi vă rugăm să ne contactați telefonic.
      </p>
    </div>
  );
};

export default DeliveryTime;