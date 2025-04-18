
// CartPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import CartItem from "../components/ui/CartItem";
import { useCart } from "../context/cartContext";
import Notification from "../components/ui/Notification"; // Dacă ai nevoie de notificări

const CartPage = () => {
  const { 
    cartItems, 
    updateCartItemQuantity, 
    removeFromCart, 
    cartTotal, 
    loading 
  } = useCart();

  // Increase quantity
  const increaseQuantity = (id) => {
    // Găsim item-ul pentru a obține cantitatea curentă
    const item = cartItems.find((item) => item.product._id === id);
    if (item) {
      updateCartItemQuantity(id, item.quantity + 1);
    }
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    // Găsim item-ul pentru a obține cantitatea curentă
    const item = cartItems.find((item) => item.product._id === id);
    if (item && item.quantity > 1) {
      updateCartItemQuantity(id, item.quantity - 1);
    }
  };

  // Remove item
  const removeItem = (id) => {
    removeFromCart(id);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 pt-16 pb-8 md:py-12 max-w-3xl">
        <h1 className="text-3xl font-sans font-light text-gray-800 mb-8 mt-4">
          Coșul tău
        </h1>

        {loading ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">Se încarcă...</p>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg mb-6">Coșul tău este gol momentan.</p>
            <Link
              to="/produse"
              className="inline-block bg-[#E9A8B9] hover:bg-[#e890a5] text-white py-2 px-6 rounded-md font-medium transition-colors"
            >
              Explorează produsele
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
           
            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartItem
                  key={item.product._id}
                  item={{
                    id: item.product._id,
                    name: item.product.name,
                    price: item.product.price,
                    quantity: item.quantity,
                    image: item.product.images[0], // Presupunem că prima imagine este cea principală
                  }}
                  increaseQuantity={increaseQuantity}
                  decreaseQuantity={decreaseQuantity}
                  removeItem={removeItem}
                />
              ))}
            </div>
       

            {/* Total and Checkout */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-medium text-gray-700">Total:</span>
                <span className="text-xl font-semibold text-gray-800">
                  {cartTotal().toFixed(2)} RON
                </span>
              </div>
              <Link
                to="/checkout"
                className="block w-full text-center bg-[#E9A8B9] hover:bg-[#e890a5] text-white py-3 px-6 rounded-md font-medium transition-colors"
              >
                Finalizează comanda
              </Link>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default CartPage;