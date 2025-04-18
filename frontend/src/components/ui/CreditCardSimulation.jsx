
// export default CreditCardSimulation;
import React, { useState, useEffect } from 'react';
import { CreditCard, Lock } from 'lucide-react';

const CreditCardSimulation = ({ formData, handleInputChange, formSubmitted = false }) => {
  const [cardNumber, setCardNumber] = useState(formData?.cardDetails?.cardNumber || '');
  const [cardName, setCardName] = useState(formData?.cardDetails?.cardName || '');
  const [expiryDate, setExpiryDate] = useState(formData?.cardDetails?.expiryDate || '');
  const [cvv, setCvv] = useState(formData?.cardDetails?.cvv || '');
  const [cardType, setCardType] = useState(formData?.cardDetails?.cardType || '');
  const [errors, setErrors] = useState({});

  // Validation functions
  const validateCardNumber = (number) => {
    const cleanNumber = number.replace(/\s/g, '');
    if (!cleanNumber) {
      return 'Număr card este obligatoriu';
    }
    if (cleanNumber.length < 13 || cleanNumber.length > 19) {
      return 'Număr card invalid';
    }
    return null;
  };

  const validateCardName = (name) => {
    if (!name.trim()) {
      return 'Numele proprietarului este obligatoriu';
    }
    if (name.trim().split(/\s+/).length < 2) {
      return 'Introduceți numele complet';
    }
    return null;
  };

  const validateExpiryDate = (date) => {
    if (!date || date.length !== 5) {
      return 'Data expirării este obligatorie';
    }
    const [month, year] = date.split('/');
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear() % 100;
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);
    if (monthNum < 1 || monthNum > 12) {
      return 'Lună invalidă';
    }
    if (yearNum < currentYear || (yearNum === currentYear && monthNum < currentMonth)) {
      return 'Card expirat';
    }
    return null;
  };

  const validateCVV = (cvvValue) => {
    if (!cvvValue || cvvValue.length !== 3) {
      return 'CVV invalid';
    }
    return null;
  };

  // Validate individual field
  const validateField = (name, value) => {
    switch (name) {
      case 'cardNumber':
        return validateCardNumber(value);
      case 'cardName':
        return validateCardName(value);
      case 'expiryDate':
        return validateExpiryDate(value);
      case 'cvv':
        return validateCVV(value);
      default:
        return null;
    }
  };

  // Handlers
  const formatCardNumber = (value) => {
    const cleanedValue = value.replace(/\D/g, '');
    const formattedValue = cleanedValue.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formattedValue;
  };

  const detectCardType = (number) => {
    const visa = /^4/;
    const mastercard = /^5[1-5]/;
    const cleanedNumber = number.replace(/\D/g, '');
    if (visa.test(cleanedNumber)) return 'visa';
    if (mastercard.test(cleanedNumber)) return 'mastercard';
    return '';
  };

  const handleCardNumberChange = (e) => {
    const rawValue = e.target.value;
    const formattedValue = formatCardNumber(rawValue);
    setCardNumber(formattedValue);
    const cleanedNumber = rawValue.replace(/\D/g, '');
    setCardType(detectCardType(cleanedNumber));
    setErrors((prev) => ({ ...prev, cardNumber: validateField('cardNumber', formattedValue) }));
  };

  const handleCardNameChange = (e) => {
    const value = e.target.value;
    setCardName(value);
    setErrors((prev) => ({ ...prev, cardName: validateField('cardName', value) }));
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
    }
    setExpiryDate(value);
    setErrors((prev) => ({ ...prev, expiryDate: validateField('expiryDate', value) }));
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 3);
    setCvv(value);
    setErrors((prev) => ({ ...prev, cvv: validateField('cvv', value) }));
  };

  const getCardIcon = () => {
    switch (cardType) {
      case 'visa':
        return '/visa_logo.jpg';
      case 'mastercard':
        return '/mastercard_logo.png';
      default:
       
    }
  };

  // Sync with parent form data and validate form
  useEffect(() => {
    const cardDetails = {
      cardNumber,
      cardName,
      expiryDate,
      cvv,
      cardType,
    };
    const newErrors = {
      cardNumber: validateCardNumber(cardNumber),
      cardName: validateCardName(cardName),
      expiryDate: validateExpiryDate(expiryDate),
      cvv: validateCVV(cvv),
    };
    setErrors(newErrors);
    const isValid = Object.values(newErrors).every((error) => error === null);

    handleInputChange({
      target: {
        name: 'cardDetails',
        value: cardDetails,
      },
    });
    handleInputChange({
      target: {
        name: 'cardValidation',
        value: isValid,
      },
    });
  }, [cardNumber, cardName, expiryDate, cvv, cardType, handleInputChange]);

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
        <div className="relative mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Detalii card
          </label>

          {/* Card Number Input */}
          <div className="mb-3">
            <div className="relative">
              <input
                type="text"
                name="cardNumber"
                value={cardNumber}
                onChange={handleCardNumberChange}
                placeholder="Număr card"
                maxLength="19"
                className={`text-black w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.cardNumber ? 'border-red-500 focus:ring-red-500' : 'focus:ring-[#D5A8B3]'
                }`}
              />
              {getCardIcon() && (
                <img
                  src={getCardIcon()}
                  alt="Card Type"
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-10"
                  onError={(e) => {
                    console.error(`Failed to load image: ${getCardIcon()}`);
                    e.target.src = '/images/default_card.png';
                  }}
                />
              )}
            </div>
            {errors.cardNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
            )}
          </div>

          {/* Name on Card Input */}
          <div className="mb-3">
            <div className="relative">
              <input
                type="text"
                value={cardName}
                onChange={handleCardNameChange}
                placeholder="Nume proprietar"
                className={`text-black w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.cardName ? 'border-red-500 focus:ring-red-500' : 'focus:ring-[#D5A8B3]'
                }`}
              />
            </div>
            {errors.cardName && (
              <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>
            )}
          </div>

          {/* Expiry and CVV Container */}
          <div className="flex space-x-3">
            {/* Expiry Date */}
            <div className="flex-1 mb-3">
              <div className="relative">
                <input
                  type="text"
                  value={expiryDate}
                  onChange={handleExpiryChange}
                  placeholder="MM/YY"
                  maxLength="5"
                  className={`text-black w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.expiryDate ? 'border-red-500 focus:ring-red-500' : 'focus:ring-[#D5A8B3]'
                  }`}
                />
              </div>
              {errors.expiryDate && (
                <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>
              )}
            </div>

            {/* CVV */}
            <div className="flex-1 mb-3">
              <div className="relative">
                <input
                  type="text"
                  value={cvv}
                  onChange={handleCvvChange}
                  placeholder="CVV"
                  maxLength="3"
                  className={`text-black w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.cvv ? 'border-red-500 focus:ring-red-500' : 'focus:ring-[#D5A8B3]'
                  }`}
                />
                <Lock
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
              </div>
              {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
            </div>
          </div>
        </div>

        {/* Card Preview */}
        <div className="mt-4 bg-gradient-to-r from-[#D5A8B3] to-[#9A7B9D] rounded-lg p-3 text-white">
          <div className="flex justify-between items-center mb-3">
            <CreditCard size={24} />
            <span className="text-xs">{cardType ? cardType.toUpperCase() : 'CARD'}</span>
          </div>
          <div className="text-base font-semibold tracking-wider mb-2">
            {cardNumber || '•••• •••• •••• ••••'}
          </div>
          <div className="flex justify-between text-xs">
            <span>{cardName || 'Name on Card'}</span>
            <span>{expiryDate || 'MM/YY'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCardSimulation;