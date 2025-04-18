

import React, { useState, useEffect } from 'react';
import CreditCardSimulation from './ui/CreditCardSimulation';
import { CreditCard, Truck } from 'lucide-react';

const PaymentMethod = ({ formData, handleInputChange, onValidationChange, formSubmitted = false }) => {
  const [cardValidation, setCardValidation] = useState(false);
  const [cardDetails, setCardDetails] = useState(null);

  // Handle changes to card details and validation
  const handleCardInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'cardDetails') {
      // Update card details
      setCardDetails(value);
      handleInputChange({
        target: {
          name: 'cardDetails',
          value: value
        }
      });
    } else if (name === 'cardValidation') {
      // Update card validation status
      setCardValidation(value);
      
      // Notify parent component about validation status
      if (onValidationChange) {
        onValidationChange({
          paymentMethodValidation: formData.metodaPlata === 'ramburs' || value
        });
      }
    } else {
      // Handle other input changes
      handleInputChange(e);
    }
  };

  // Effect to handle initial validation for ramburs
  useEffect(() => {
    if (formData.metodaPlata === 'ramburs') {
      // For cash on delivery, validation is always true
      if (onValidationChange) {
        onValidationChange({
          paymentMethodValidation: true
        });
      }
    }
  }, [formData.metodaPlata]);

  return (
    <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
      <h3 className="text-xl font-medium text-[#3B2417] mb-4">Metodă de plată</h3>
      
      <div className="space-y-4 mb-6">
        {/* Card Payment Option */}
        <div className="relative flex items-start">
          <div className="flex items-center h-5">
            <input
              id="card"
              name="metodaPlata"
              type="radio"
              value="card"
              checked={formData.metodaPlata === 'card'}
              onChange={handleInputChange}
              className="h-4 w-4 appearance-none rounded-full border border-gray-300 checked:border-[#D5A8B3] relative after:absolute after:content-[''] after:w-2 after:h-2 after:rounded-full after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:bg-[#D5A8B3] after:opacity-0 checked:after:opacity-100"
            />
          </div>
          <div className="ml-3 text-sm flex items-center justify-between w-full">
            <div>
              <label htmlFor="card" className="font-medium text-gray-700 flex items-center">
                <CreditCard className="mr-2 text-[#D5A8B3]" size={20} />
                Card de credit/debit
              </label>
              <p className="text-gray-500">Plată securizată online</p>
            </div>
          </div>
        </div>

        {/* Cash on Delivery Option */}
        <div className="relative flex items-start">
          <div className="flex items-center h-5">
            <input
              id="ramburs"
              name="metodaPlata"
              type="radio"
              value="ramburs"
              checked={formData.metodaPlata === 'ramburs'}
              onChange={handleInputChange}
              className="h-4 w-4 appearance-none rounded-full border border-gray-300 checked:border-[#D5A8B3] relative after:absolute after:content-[''] after:w-2 after:h-2 after:rounded-full after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:bg-[#D5A8B3] after:opacity-0 checked:after:opacity-100"
            />
          </div>
          <div className="ml-3 text-sm flex items-center justify-between w-full">
            <div>
              <label htmlFor="ramburs" className="font-medium text-gray-700 flex items-center">
                <Truck className="mr-2 text-[#D5A8B3]" size={20} />
                Ramburs la livrare
              </label>
              <p className="text-gray-500">Plătești când primești comanda</p>
            </div>
          </div>
        </div>
      </div>

      {/* Conditional Rendering of Credit Card Simulation */}
      {formData.metodaPlata === 'card' && (
        <CreditCardSimulation 
          formData={formData} 
          handleInputChange={handleCardInputChange}
          formSubmitted={formSubmitted}
        />
      )}

      {/* Cash on Delivery Additional Info */}
      {formData.metodaPlata === 'ramburs' && (
        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
          <p className="text-gray-700">
            La livrare veți putea plăti suma totală a comenzii direct curierului. 
            Acceptăm plata în numerar sau cu cardul la momentul ridicării coletului.
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentMethod;