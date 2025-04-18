
import React from 'react';

const ShippingInfo = ({ formData, handleInputChange, errors, formSubmitted }) => {
  // Stiluri pentru autofill
  const inputStyle = {
    WebkitTextFillColor: '#3B2417',
    WebkitBoxShadow: '0 0 0 30px white inset',
    caretColor: '#3B2417',
    transition: 'background-color 5000s ease-in-out 0s',
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
      <h3 className="text-xl font-medium text-[#3B2417] mb-4">Adresă de livrare</h3>
      
      <div className="mb-6">
        <label htmlFor="adresa" className="block text-sm font-medium text-gray-700 mb-1">Adresă *</label>
        <input
          type="text"
          id="adresa"
          name="adresa"
          value={formData.adresa}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border ${(formSubmitted && errors.adresa) ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-[#D5A8B3] focus:border-[#D5A8B3]`}
          style={inputStyle}
        />
        {formSubmitted && errors.adresa && (
          <p className="error-message mt-1 text-sm text-red-600">{errors.adresa}</p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="oras" className="block text-sm font-medium text-gray-700 mb-1">Oraș *</label>
          <input
            type="text"
            id="oras"
            name="oras"
            value={formData.oras}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border ${(formSubmitted && errors.oras) ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-[#D5A8B3] focus:border-[#D5A8B3]`}
            style={inputStyle}
          />
          {formSubmitted && errors.oras && (
            <p className="error-message mt-1 text-sm text-red-600">{errors.oras}</p>
          )}
        </div>
        <div>
          <label htmlFor="judet" className="block text-sm font-medium text-gray-700 mb-1">Județ *</label>
          <input
            type="text"
            id="judet"
            name="judet"
            value={formData.judet}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border ${(formSubmitted && errors.judet) ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-[#D5A8B3] focus:border-[#D5A8B3]`}
            style={inputStyle}
          />
          {formSubmitted && errors.judet && (
            <p className="error-message mt-1 text-sm text-red-600">{errors.judet}</p>
          )}
        </div>
        <div>
          <label htmlFor="codPostal" className="block text-sm font-medium text-gray-700 mb-1">Cod poștal</label>
          <input
            type="text"
            id="codPostal"
            name="codPostal"
            value={formData.codPostal}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D5A8B3] focus:border-[#D5A8B3]"
            style={inputStyle}
          />
        </div>
      </div>
    </div>
  );
};

export default ShippingInfo;