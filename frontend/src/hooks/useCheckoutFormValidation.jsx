import { useMemo } from 'react';

/**
 * Custom hook for form validation
 * @param {Object} formData - The form data object to validate
 * @param {Array} requiredFields - Array of field names that are required
 * @returns {Object} - Object containing isValid boolean and errors object
 */
const useFormValidation = (formData, requiredFields) => {
  // Use useMemo instead of useState + useEffect to prevent the infinite loop
  const validation = useMemo(() => {
    // Check if all required fields are filled
    const newErrors = {};
    let formIsValid = true;
    
    requiredFields.forEach(field => {
      if (!formData[field] || (typeof formData[field] === 'string' && formData[field].trim() === '')) {
        formIsValid = false;
        newErrors[field] = 'Acest câmp este obligatoriu';
      }
    });

    if (formData.nume && formData.nume.trim() !== '') {
      const firstChar = formData.nume.charAt(0);
      if (firstChar !== firstChar.toUpperCase()) {
        formIsValid = false;
        newErrors.nume = 'Numele trebuie să înceapă cu literă mare';
      }
    }

    if (formData.prenume && formData.prenume.trim() !== '') {
      const firstChar = formData.prenume.charAt(0);
      if (firstChar !== firstChar.toUpperCase()) {
        formIsValid = false;
        newErrors.prenume = 'Prenumele trebuie să înceapă cu literă mare';
      }
    }
    
    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      formIsValid = false;
      newErrors.email = 'Adresa de email nu este validă';
    }
    
    // Phone validation - simple check for digits only
    if (formData.telefon && !/^\d+$/.test(formData.telefon)) {
      formIsValid = false;
      newErrors.telefon = 'Numărul de telefon trebuie să conțină doar cifre';
    }

    if (formData.codPostal && formData.codPostal.trim() !== '') {
      if (!/^\d{6}$/.test(formData.codPostal)) {
        formIsValid = false;
        newErrors.codPostal = 'Codul poștal trebuie să conțină exact 6 cifre';
      }
    }
    
    return {
      isValid: formIsValid,
      errors: newErrors
    };
  }, [formData, requiredFields]); // Dependencies for useMemo
  
  return validation;
};

export default useFormValidation;