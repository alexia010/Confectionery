// ProductsSection.jsx
import React, { useState, useEffect } from 'react';
import { RevealOnScroll } from '../../components/ui/RevealOnScroll';
import { Button } from '../../components/ui/Button';
import { ProductCard } from '../../components/ProductCard';
import { Link } from 'react-router-dom';
import HomepageService from '../../services/homepageService';

export const ProductsSection = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Folosim noul endpoint care returneaza datele deja formatate pentru ProductCard
        const products = await HomepageService.getProductsForDisplay();
        console.log('Produse primite de la API:', products);
        setFeaturedProducts(products);
      } catch (err) {
        console.error('Eroare la încărcarea produselor:', err);
        setError('Nu s-au putut încărca produsele. Vă rugăm încercați mai târziu.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Date implicite pentru a fi folosite dacă nu există date în backend sau dacă apare o eroare
  const defaultProducts = [
    {
      id: 1,
      name: 'Tort Sacher',
      description: 'Tort vienez de ciocolată cu strat de gem de caise și glazură de ciocolată neagră',
      image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b',
      price: 135,
      badge: 'Popular'
    },
    {
      id: 2,
      name: 'Macarons Deluxe',
      description: 'Cutie cu 12 macarons în arome diverse: vanilie, fistic, zmeură, caramel, lavandă',
      image: 'https://images.unsplash.com/photo-1558326567-98ae2405596b',
      price: 95,
      badge: 'Nou'
    },
    {
      id: 3,
      name: 'Éclair Caramel',
      description: 'Ecler umplut cu cremă de vanilie și glazură de caramel cu sare de mare',
      image: 'https://images.unsplash.com/photo-1603532648955-039310d9ed75',
      price: 18,
      badge: 'Bestseller'
    },
    {
      id: 4,
      name: 'Tarte Framboise',
      description: 'Tartă cu cremă de vanilie și zmeură proaspătă, decorată cu fructe de pădure',
      image: 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81',
      price: 22,
      badge: null
    },
  ];

  // Folosim datele din backend sau cele implicite dacă nu există date sau apare o eroare
  const displayProducts = featuredProducts.length > 0 ? featuredProducts : defaultProducts;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <h5 className="text-[#C39074] font-medium mb-3 tracking-wider uppercase">Creații Delicioase</h5>
              <h2 className="font-serif text-4xl font-bold text-[#8B5E3B]">Produsele Noastre Populare</h2>
            </div>

            <div className="mt-4 md:mt-0">
              <Link to="/produse">
              <Button variant="link" className="group">
                Vezi toate produsele
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Button>
              </Link>
            </div>
          </div>
          
        </RevealOnScroll>
        
        {loading ? (
          <div className="text-center py-10">
            <p>Se încarcă produsele...</p>
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">
            <p>{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayProducts.map((product) => (
              <RevealOnScroll key={product.id} className="delay-100">
                <ProductCard product={product} />
              </RevealOnScroll>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};