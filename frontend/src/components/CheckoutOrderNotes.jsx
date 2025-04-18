

import React from 'react';

const OrderNotes = ({ formData, handleInputChange }) => {
  // Stiluri pentru autofill
  const inputStyle = {
    WebkitTextFillColor: '#3B2417',
    WebkitBoxShadow: '0 0 0 30px white inset',
    caretColor: '#3B2417',
    transition: 'background-color 5000s ease-in-out 0s',
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
      <h3 className="text-xl font-medium text-[#3B2417] mb-4">Observații comandă</h3>
      
      <div>
        <label htmlFor="observatii" className="block text-sm font-medium text-gray-700 mb-1">Instrucțiuni speciale</label>
        <textarea
          id="observatii"
          name="observatii"
          rows="3"
          value={formData.observatii}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D5A8B3] focus:border-[#D5A8B3]"
          placeholder="Instrucțiuni speciale pentru livrare sau mesaj pentru tort..."
          style={inputStyle}
        ></textarea>
      </div>
    </div>
  );
};

export default OrderNotes;