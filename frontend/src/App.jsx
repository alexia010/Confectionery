import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useConditionalScrollToTop } from './hooks/useConditionalScrollToTop';

import { AuthProvider } from './context/authContext.jsx';
import { CartProvider } from './context/cartContext.jsx';
import { FavoritesProvider } from './context/favoritesContext.jsx';
import { ProductProvider } from './context/productContext.jsx';



// Importă paginile existente
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import ProductsPage from './pages/ProductsPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import FavoritesPage from './pages/FavoritesPage';
import AboutUsPage from './pages/AboutUsPage';
import UserProfile from './pages/UserProfilePage';
import AdminProductsPage from './pages/AdminProductsPage.jsx';
import AdminDashboard from './pages/DashBoardPage.jsx'
import AdminOrdersPage from './pages/AdminOrdersPage.jsx'
import AdminUsersPage from './pages/AdminUsersPage.jsx';
import CheckoutPage from './pages/ProcessOrderPage.jsx'
import ContactPage from './pages/ContactPage.jsx';

// import { ToastContainer } from 'react-hot-toast';

// Pagină temporară pentru rute neimplementate
const ComingSoon = () => {
  return (
    <div className="min-h-screen bg-[#1F0F0A] flex items-center justify-center">
      <div className="max-w-md w-full p-8 bg-[#3A1F17] rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-[#F5F5F5] mb-4">În curând</h1>
        <p className="text-[#D7BFA8] mb-6">
          Această pagină este în curs de dezvoltare. Mulțumim pentru răbdare!
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-[#A35D3A] text-[#F5F5F5] rounded-md hover:bg-[#8B4E31] transition-colors duration-300"
        >
          Înapoi la pagina principală
        </a>
      </div>
    </div>
  );
};

function App() {
  useConditionalScrollToTop({
    resetPaths: ['/produs/'], // va reseta scroll când URL conține "/product/"
    preservePaths: ['/produse']  // va păstra scroll când URL conține "/products"
  });

  return (
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
        <FavoritesProvider>

      <Routes>
        {/* Rute publice */}
        
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
        <Route path="/produse" element={<ProductsPage />} />
        <Route path="/produs/:id" element={<ProductPage />} />
        <Route path="/despre-noi" element={<AboutUsPage />} />

        <Route path="/profil" element={<UserProfile />} />
        <Route path="/favorite" element={<FavoritesPage />} />
        <Route path="/cos" element={<CartPage />} />

        {/* Rute protejate pentru admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/produse" element={<AdminProductsPage />} />
        <Route path="/admin/comenzi" element={<AdminOrdersPage/>}/>
        <Route path="/admin/utilizatori" element={<AdminUsersPage/>}/>
  

        {/* Rute temporare - vor afișa pagina "În curând" */}
        <Route path="/contact" element={< ContactPage/>} />
        {/* <Route path="/comanda" element={<ComingSoon />} /> */}
        <Route path="/checkout" element={<CheckoutPage/>}/>

        {/* Redirecționează orice altă rută către Home */}
        <Route path="*" element={<Navigate to="/" />} />
        {/* <ToastContainer/> */}
      </Routes>
      </FavoritesProvider>
      </ProductProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
