
// ProductPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ProductMainSection from '../sections/product/ProductMainSection';
import ProductTabsSection from '../sections/product/ProductTabsSection';
import SimilarProductsSection from '../sections/product/SimilarProductSection';
import BackButton from '../components/ui/BackButton';
import { productService } from '../services/productService';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);

        // Preia produsul curent
        const productData = await productService.getProductById(id);
        console.log('Product data from API:', productData); // Debug
        setProduct({
          ...productData,
          tags: productData.characteristics || [], // Mapăm characteristics ca tags
          images: productData.images || [], // URL-urile imaginilor
          reviews: productData.reviews || [],
          description: productData.description || 'Fără descriere',
          allergens: productData.allergensText || 'Fără alergeni specificați', // Mapăm allergensText
          ingredients: productData.ingredients || [], // Lista de ingrediente
          rating: productData.rating || 0,
          numReviews: productData.numReviews || 0,
          createdAt: productData.createdAt || Date.now(),
          updatedAt: productData.updatedAt || Date.now(),
          visible: productData.visible !== undefined ? productData.visible : true,
        });

        // Preia produse similare
        const allProducts = await productService.getProductsMinimal();
        const similar = allProducts
          .filter(p => p._id !== id && p.category === productData.category)
          .slice(0, 3);
        setSimilarProducts(similar);

      } catch (err) {
        setError('Eroare la încărcarea produsului');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  const handleGoBack = () => navigate(-1);

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-6 py-16 max-w-7xl">
          <p>Se încarcă...</p>
        </div>
      </MainLayout>
    );
  }

  if (error || !product) {
    return (
      <MainLayout>
        <div className="container mx-auto px-6 py-16 max-w-7xl">
          <p>{error || 'Produsul nu a fost găsit'}</p>
          <BackButton onClick={handleGoBack} />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-6 py-16 max-w-7xl">
        <BackButton onClick={handleGoBack} />
        <ProductMainSection product={product} />
        <ProductTabsSection product={product} />
        <SimilarProductsSection products={similarProducts} />
      </div>
    </MainLayout>
  );
};

export default ProductPage;
