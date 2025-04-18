


import React, { useState, useEffect } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { useCart } from '../context/cartContext';
import { useAuthContext } from '../context/authContext';
import useFormValidation from '../hooks/useCheckoutFormValidation';
import {orderService} from '../services/orderService';

// Import componente
import PersonalInfo from '../components/CheckoutPersonalInfo';
import ShippingInfo from '../components/CheckoutShippingInfo';
import PaymentMethod from '../components/CheckoutPaymentMethod';
import OrderNotes from '../components/CheckoutOrderNotes';
import CartSummary from '../components/CheckoutCartSummary';
import OrderConfirmation from '../components/ui/OrderConfirmation';

const CheckoutPage = () => {
  const { isAuthenticated, user } = useAuthContext();
  const { cartItems, loading, clearCart } = useCart();
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderError, setOrderError] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [paymentMethodValidation, setPaymentMethodValidation] = useState(true);
  
  // State pentru datele formularului
  const [formData, setFormData] = useState({
    nume: '',
    prenume: '',
    email: '',
    telefon: '',
    adresa: '',
    oras: '',
    judet: '',
    codPostal: '',
    metodaPlata: 'card',
    observatii: '',
    dataLivrare: '',
    oraLivrare: '10-14'
  });

  // Câmpuri obligatorii
  const requiredFields = ['nume', 'prenume', 'email', 'telefon', 'adresa', 'oras', 'judet', 'dataLivrare'];
  
  // Validare formular
  const { isValid, errors } = useFormValidation(formData, requiredFields);

  // Completare automată date utilizator
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData(prevState => ({
        ...prevState,
        nume: user.lastName || prevState.nume,
        prenume: user.firstName || prevState.prenume,
        email: user.email || prevState.email,
        telefon: user.phone || prevState.telefon,
        adresa: user.address || prevState.adresa,
        oras: user.city || prevState.oras,
        judet: user.county || prevState.judet,
        codPostal: user.postalCode || prevState.codPostal
      }));
    }
  }, [isAuthenticated, user]);

  // Handler pentru input-uri
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Procesează comanda
  const processOrder = async () => {
    try {
      // Verifică dacă există produse în coș
      if (cartItems.length === 0) {
        throw new Error('Coșul este gol');
      }

      // Plasează comanda folosind serviciul de comenzi
      const orderResponse = await orderService.createOrder(formData, cartItems);
   
      // Salvează detaliile comenzii
      setOrderDetails(orderResponse);
      
      // Golește coșul după plasarea comenzii cu succes
      await clearCart();
      
      // Marchează comanda ca finalizată cu succes
      setOrderSuccess(true);
    } catch (error) {
      console.error("Eroare la plasarea comenzii:", error);
      setOrderError(error.response?.data?.message || "A apărut o eroare la plasarea comenzii. Vă rugăm să încercați din nou.");
    }
  };

  // Handler pentru trimitere formular
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    
    // Verifică validarea formularului și a metodei de plată
    if (isValid && paymentMethodValidation) {
      processOrder();
    } else {
      // Scroll la primul câmp cu eroare
      const firstErrorField = document.querySelector('.error-message');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  // Data minimă pentru livrare (mâine)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  // Setează data livrării la mâine dacă nu e setată
  useEffect(() => {
    if (!formData.dataLivrare) {
      setFormData(prev => ({
        ...prev,
        dataLivrare: minDate
      }));
    }
  }, [minDate]);

  // Pagină de confirmare comandă
  if (orderSuccess) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50 py-12">
          <OrderConfirmation 
            orderNumber={orderDetails?.orderNumber} 
            orderDetails={orderDetails}
          />
        </div>
      </MainLayout>
    );
  }

  // Pagina principală de checkout
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto p-4">
          <h1 className="text-4xl font-sans font-light mt-10 tracking-wide text-center my-8 text-gray-800">
            Finalizare comandă
          </h1>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D5A8B3] mx-auto mb-4"></div>
            <p className="text-gray-600">Se încarcă datele coșului...</p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <form onSubmit={handleSubmit}>
                <PersonalInfo 
                  formData={formData} 
                  handleInputChange={handleInputChange} 
                  errors={errors} 
                  formSubmitted={formSubmitted} 
                />
                
                <div className="h-6"></div>
                
                <ShippingInfo 
                  formData={formData} 
                  handleInputChange={handleInputChange} 
                  errors={errors} 
                  formSubmitted={formSubmitted} 
                />
                
                <div className="h-6"></div>
                
                <PaymentMethod 
                  formData={formData} 
                  handleInputChange={handleInputChange}
                  onValidationChange={(validation) => setPaymentMethodValidation(validation.paymentMethodValidation)}
                />
                
                <div className="h-6"></div>
                
                <OrderNotes 
                  formData={formData} 
                  handleInputChange={handleInputChange} 
                />
              </form>
            </div>

            <div className="lg:w-1/3">
              <CartSummary 
                formData={formData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                isValid={isValid && paymentMethodValidation}
                errors={errors}
                formSubmitted={formSubmitted}
                minDate={minDate}
                orderError={orderError}
              />
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default CheckoutPage;