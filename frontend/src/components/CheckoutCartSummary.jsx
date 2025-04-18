// CartSummary.jsx - Componenta pentru sumarul coșului
import React from 'react';
import { useCart } from '../context/cartContext';
import DeliveryTime from './CheckoutDeliveryTime';

const CartSummary = ({ 
  formData, 
  handleInputChange, 
  handleSubmit, 
  isValid, 
  errors, 
  formSubmitted,
  minDate 
}) => {
  const { cartItems, cartTotal } = useCart();
  
  // Taxă de livrare
  const taxaLivrare = 20;
  
  // Total general
  const totalGeneral = cartTotal() + taxaLivrare;

  return (
    <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200 sticky top-5">
      <h2 className="text-xl font-medium text-[#3B2417] mb-4">Coșul tău</h2>
      
      {/* Lista produse */}
      <div className="flow-root mb-6">
        <ul className="divide-y divide-gray-200">
          {cartItems.map((item) => (
            <li key={item.product._id} className="py-4 flex">
              <img 
                src={item.product.images[0] || '/api/placeholder/80/80'} 
                alt={item.product.name} 
                className="h-20 w-20 rounded-md object-cover object-center border border-gray-200"
              />
              <div className="ml-4 flex-1">
                <div className="flex justify-between">
                  <h3 className="text-base font-medium text-gray-900">{item.product.name}</h3>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Preț: {item.product.price?.toFixed(2)} RON
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Cantitate: {item.quantity}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Estimare livrare */}
      <DeliveryTime 
        formData={formData}
        handleInputChange={handleInputChange}
        errors={errors}
        formSubmitted={formSubmitted}
        minDate={minDate}
      />

      {/* Totalizator */}
      <div className="border-t border-gray-200 pt-4 mt-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <p>Subtotal</p>
          <p>{cartTotal().toFixed(2)} RON</p>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <p>Taxă de livrare</p>
          <p>{taxaLivrare.toFixed(2)} RON</p>
        </div>
        <div className="flex justify-between text-base font-medium text-gray-900 pt-2 border-t border-gray-200 mt-2">
          <p>Total:</p>
          <p>{totalGeneral.toFixed(2)} RON</p>
        </div>
        
        <div className="mt-6">
          <button
            type="submit"
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${isValid ? 'bg-[#D5A8B3] hover:bg-[#C7919E]' : 'bg-gray-400 cursor-not-allowed'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D5A8B3]`}
            onClick={handleSubmit}
          >
            Finalizează comanda
          </button>
          
          {formSubmitted && !isValid && (
            <p className="error-message mt-2 text-center text-sm text-red-600">
              Vă rugăm să completați toate câmpurile obligatorii marcate cu *
            </p>
          )}
        </div>
        
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>Plătind, ești de acord cu <span className="underline cursor-pointer">Termenii și condițiile</span> noastre.</p>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;