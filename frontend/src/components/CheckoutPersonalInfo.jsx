
import React from 'react';

const PersonalInfo = ({ formData, handleInputChange, errors, formSubmitted }) => {
  // Stiluri pentru autofill
  const inputStyle = {
    WebkitTextFillColor: '#3B2417',
    WebkitBoxShadow: '0 0 0 30px white inset',
    caretColor: '#3B2417',
    transition: 'background-color 5000s ease-in-out 0s',
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
      <h3 className="text-xl font-medium text-[#3B2417] mb-4">Date personale</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="nume" className="block text-sm font-medium text-gray-700 mb-1">Nume *</label>
          <input
            type="text"
            id="nume"
            name="nume"
            value={formData.nume}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border ${(formSubmitted && errors.nume) ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-[#D5A8B3] focus:border-[#D5A8B3]`}
            style={inputStyle}
          />
          {formSubmitted && errors.nume && (
            <p className="error-message mt-1 text-sm text-red-600">{errors.nume}</p>
          )}
        </div>
        <div>
          <label htmlFor="prenume" className="block text-sm font-medium text-gray-700 mb-1">Prenume *</label>
          <input
            type="text"
            id="prenume"
            name="prenume"
            value={formData.prenume}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border ${(formSubmitted && errors.prenume) ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-[#D5A8B3] focus:border-[#D5A8B3]`}
            style={inputStyle}
          />
          {formSubmitted && errors.prenume && (
            <p className="error-message mt-1 text-sm text-red-600">{errors.prenume}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border ${(formSubmitted && errors.email) ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-[#D5A8B3] focus:border-[#D5A8B3]`}
            style={inputStyle}
          />
          {formSubmitted && errors.email && (
            <p className="error-message mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="telefon" className="block text-sm font-medium text-gray-700 mb-1">Telefon *</label>
          <input
            type="tel"
            id="telefon"
            name="telefon"
            value={formData.telefon}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border ${(formSubmitted && errors.telefon) ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-[#D5A8B3] focus:border-[#D5A8B3]`}
            style={inputStyle}
          />
          {formSubmitted && errors.telefon && (
            <p className="error-message mt-1 text-sm text-red-600">{errors.telefon}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;