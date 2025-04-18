
import React, { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import { useFavorites } from "../context/favoritesContext";
import { useCart } from "../context/cartContext";

// Importăm secțiunile
import PageHeader from "../sections/favorites/HeaderSection";
import EmptyFavorites from "../sections/favorites/EmptyState";
import CategoryFilter from "../sections/favorites/CategoryFilter";
import ProductGrid from "../components/ProductGridFavorite";

import Notification from "../components/ui/Notification";

const FavoritesPage = () => {
  const { favorites, removeFromFavorites, loading } = useFavorites();
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("toate");
  // Adaugă starea pentru notificări
  const [notification, setNotification] = useState({ 
    show: false, 
    message: '', 
    type: 'success' 
  });

  // Extragem categoriile unice pentru filtrare
  useEffect(() => {
    if (favorites.length > 0) {
      const uniqueCategories = [...new Set(favorites.map(item => item.category))];
      setCategories(uniqueCategories);
    }
  }, [favorites]);

  // Filtrăm produsele în funcție de categoria selectată
  const filteredFavorites = selectedCategory === "toate" 
    ? favorites 
    : favorites.filter(item => item.category === selectedCategory);

  // Funcție pentru adăugarea unui produs în coș
  const handleAddToCart = async (id) => {
    // Găsim produsul pentru a avea acces la informațiile sale
    const product = favorites.find(item => item.id === id);
    
    if (!product) {
      setNotification({
        show: true,
        message: "Produsul nu a fost găsit!",
        type: 'error',
      });
      return;
    }

    const success = await addToCart(id);
    if (success) {
      setAddedToCart(prev => ({
        ...prev,
        [id]: true
      }));

      setTimeout(() => {
        setAddedToCart(prev => ({
          ...prev,
          [id]: false
        }));
      }, 2000);

      setNotification({
        show: true,
        message: `${product.name} a fost adăugat în coș!`,
        type: 'success',
      });

      setTimeout(() => {
        setNotification({ show: false, message: '', type: 'success' });
      }, 3000);
    }
    else {
      setNotification({
        show: true,
        message: `${product.name} nu a putut fi adăugat în coș!`,
        type: 'error',
      });

      setTimeout(() => {
        setNotification({ show: false, message: '', type: 'error' });
      }, 3000);
    }
  };

  return (
    <MainLayout>
      <PageHeader />
      <div className="container mx-auto px-4 py-8 max-w-screen-xl">
        
      {notification.show && (
        <Notification 
          show={notification.show} 
          message={notification.message} 
          type={notification.type} 
        />
      )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl text-gray-600">Se încarcă favoritele...</p>
          </div>
        ) : favorites.length === 0 ? (
          <EmptyFavorites />
        ) : (
          <>
            <CategoryFilter 
              categories={categories} 
              selectedCategory={selectedCategory} 
              setSelectedCategory={setSelectedCategory}
              products={favorites}
            />
            
            {filteredFavorites.length === 0 ? (
              <EmptyFavorites />
            ) : (
              <ProductGrid 
                products={filteredFavorites} 
                removeFromFavorites={removeFromFavorites} 
                addToCart={handleAddToCart} 
                addedToCart={addedToCart} 
              />
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default FavoritesPage;