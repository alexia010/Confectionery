

import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

export const useAuth = (initialMode = 'login') => {
  const navigate = useNavigate();
  const [mode, setMode] = useState(initialMode);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    agreeTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { login: contextLogin, register: contextRegister } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validări comune pentru ambele moduri
    if (!formData.email) {
      newErrors.email = 'Email-ul este obligatoriu';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Adresa de email este invalidă';
    }

    if (!formData.password) {
      newErrors.password = 'Parola este obligatorie';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Parola trebuie să aibă minim 6 caractere';
    }

    // Validări specifice pentru înregistrare
    if (mode === 'register') {
      if (!formData.name) {
        newErrors.name = 'Numele este obligatoriu';
      } else if (!/^[A-Z]/.test(formData.name)) {
        newErrors.name = 'Numele trebuie să înceapă cu literă mare';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Confirmarea parolei este obligatorie';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Parolele nu coincid';
      }

      if (!formData.agreeTerms) {
        newErrors.agreeTerms = 'Trebuie să accepți termenii și condițiile';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      let result;
      
      if (mode === 'login') {
        // Folosim metoda de login din context
        result = await contextLogin(formData.email, formData.password);
      } else {
        // Folosim metoda de register din context
        result = await contextRegister({
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
      }

      // După autentificare/înregistrare reușită, redirecționează utilizatorul în funcție de rol
      if (result && result.redirectPath) {
        navigate(result.redirectPath);
      } else {
        navigate('/'); // Redirecționare la pagina principală în caz că nu există role
      }
      
    } catch (error) {
      console.error('Eroare:', error);

      // Gestionează mesajele de eroare specifice API
      if (error.response && error.response.data && error.response.data.message) {
        setErrors({ submit: error.response.data.message });
      } else {
        setErrors({ submit: 'A apărut o eroare. Te rugăm să încerci din nou.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(prev => prev === 'login' ? 'register' : 'login');
    setErrors({});
  };

  return {
    mode,
    formData,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
    toggleMode
  };
};

export default useAuth;