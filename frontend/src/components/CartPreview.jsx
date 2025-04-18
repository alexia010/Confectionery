import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import CartPreviewItem from "./ui/CartPreviewItem";
import { useWindowSize } from "../hooks/useWindowSize";
import { useCart } from '../context/cartContext';

const CartPreview = () => {
  const { cartItems, removeFromCart, cartTotal, cartItemsCount, loading } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const windowSize = useWindowSize();
  
  // Determină dacă este desktop bazat pe dimensiunea ferestrei
  const isDesktop = windowSize.width > 768;

  // Manipularea scroll-ului când panoul este deschis
  useEffect(() => {
    if (isOpen && isDesktop) {
      // Dezactivează scroll-ul pe body când panoul este deschis
      document.body.style.overflow = "hidden";
    } else {
      // Reactivează scroll-ul când panoul este închis
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"; // Asigură-te că scroll-ul este reactivat la demontare
    };
  }, [isOpen, isDesktop]);

  // Funcția pentru eliminarea unui produs din coș
  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  // Calculează totalul coșului
  const total = cartTotal();

  // Numărul de produse în coș
  const itemCount = cartItemsCount();

  // Verificăm dacă suntem pe pagina /cos
  const isOnCartPage = location.pathname === "/cos";

  // Logging cart items for debugging
  useEffect(() => {
    console.log("Cart items:", cartItems);
  }, [cartItems]);

  // Butonul de coș pentru desktop și mobil
  const cartButton = isDesktop ? (
    <div className="relative">
      <button
        onClick={() => !isOnCartPage && setIsOpen(true)}
        className={`bg-[#E9A8B9] hover:bg-[#e890a5] text-white px-4 py-2 rounded-md flex items-center ${
          isOnCartPage ? "cursor-default" : ""
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        Coș ({loading ? '...' : itemCount})
      </button>
    </div>
  ) : (
    <Link
      to="/cos"
      className="bg-[#E9A8B9] hover:bg-[#e890a5] text-white px-4 py-2 rounded-md flex items-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 mr-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      Coș ({loading ? '...' : itemCount})
    </Link>
  );

  // Renderăm butonul și folosim createPortal pentru panoul care trebuie să rămână fix pe pagină
  return (
    <>
      {/* Butonul de coș normal */}
      {cartButton}

      {/* Folosim createPortal pentru panou și overlay pentru a le poziționa corect indiferent de scroll */}
      {isDesktop &&
        ReactDOM.createPortal(
          <>
            {/* Overlay pentru fundal */}
            <AnimatePresence>
              {isOpen && !isOnCartPage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  className={`fixed inset-0 bg-black z-[1999] transition-opacity duration-300 ${
                    isOpen ? "opacity-50" : "opacity-0 pointer-events-none"
                  }`}
                  onClick={() => setIsOpen(false)}
                />
              )}
            </AnimatePresence>

            {/* Panoul de preview */}
            <AnimatePresence>
              {isOpen && !isOnCartPage && (
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "tween", duration: 0.3 }}
                  className="fixed top-0 right-0 h-full w-96 bg-white shadow-lg z-[2000] flex flex-col overflow-hidden"
                >
                  {/* Header-ul panoului */}
                  <div className="flex justify-between items-center p-4 border-b-[0.5px] sticky top-0 bg-white z-10">
                    <h2 className="text-lg font-medium text-black">Coșul tău</h2>
                    <button onClick={() => setIsOpen(false)}>
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Lista de produse cu scroll */}
                  <div className="p-6 space-y-6 flex-1 overflow-y-auto mt-6">
                    {loading ? (
                      <p className="text-gray-500">Se încarcă...</p>
                    ) : cartItems.length === 0 ? (
                      <p className="text-gray-500">Coșul este gol.</p>
                    ) : (
                      cartItems.map((item) => (
                        <CartPreviewItem 
                          key={item.product._id} 
                          item={{
                            id: item.product._id,
                            name: item.product.name,
                            price: item.product.price,
                            image: item.product.images[0],
                            quantity: item.quantity
                          }} 
                          onRemove={handleRemoveItem} 
                        />
                      ))
                    )}
                  </div>

                  {/* Secțiunea de jos: buton și total - fixată în partea de jos */}
                  {!loading && cartItems.length > 0 && (
                    <div className="p-6 sticky bottom-0 bg-white border-t border-gray-100 mt-auto">
                      <Link
                        to="/cos"
                        className="text-gray-500 user-menu block text-left bg-transparent"
                        onClick={() => setIsOpen(false)}
                      >
                        Vezi coșul complet
                      </Link>
                      <div className="border-t border-gray-200 my-2"></div>
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-lg text-black font-medium">Total:</span>
                        <span className="text-lg text-black font-medium">
                          {total.toFixed(2)} RON
                        </span>
                      </div>
                      <Link
                        to="/checkout"
                        className="block w-full mt-4 bg-[#E9A8B9] hover:bg-[#e890a5] text-white py-3 px-4 rounded-md text-center font-medium transition-colors duration-300"
                        onClick={() => setIsOpen(false)}
                      >
                        Finalizare comandă
                      </Link>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </>,
          document.body // Montăm direct pe body pentru a evita probleme de poziționare
        )}
    </>
  );
};

export default CartPreview;