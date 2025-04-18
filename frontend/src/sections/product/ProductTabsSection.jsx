import React, { useState } from 'react';
import ReviewItem from '../../components/ui/ReviewItem';
import ReviewForm from '../../components/ui/ReviewForm';
import { Button } from '../../components/ui/Button';
import { getIngredientNames } from '../../utils/productFormatter';

const ProductTabsSection = ({ product = {} }) => {
  const [activeTab, setActiveTab] = useState('ingrediente');
  const [productData, setProductData] = useState(product); // Local product state

  const tabs = [
    // { id: 'descriere', label: 'Descriere' },
    { id: 'ingrediente', label: 'Ingrediente' },
    { id: 'recenzii', label: `Recenzii (${productData.reviews?.length || 0})` },
  ];

  // Callback to update reviews locally
  const handleReviewAdded = (newReview) => {
    setProductData((prev) => ({
      ...prev,
      reviews: [...(prev.reviews || []), newReview],
    }));
  };

  const formattedIngredients = getIngredientNames(productData.ingredients);

  return (
    <section id="product-tabs" className="container mx-auto px-4">
      <div className="mb-20">
        <div className="flex flex-wrap border-b-2 mb-6 md:mb-10">
          {tabs.map((tab) => (
            <Button
              variant="link"
              key={tab.id}
              className={`py-2 px-3 md:px-4 text-sm md:text-base ${
                activeTab === tab.id
                  ? '!text-black border-b-2 border-red-500 font-medium'
                  : '!text-gray-500'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        <div className="p-4 md:p-6 lg:p-8 bg-white rounded-xl shadow-lg">
         

          {activeTab === 'ingrediente' && (
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-serif text-gray-900 tracking-tight break-words hyphens-auto">
                Ingrediente și Alergeni
              </h2>
              <div className="mb-3 md:mb-4">
                <span className="font-medium text-black block mb-1">Ingrediente:</span>
                <div className="text-gray-700 break-words whitespace-normal text-sm md:text-base">
                  {formattedIngredients || 'Nu sunt disponibile.'}
                </div>
              </div>
              <div>
                <span className="font-medium text-black block mb-1">Alergeni:</span>
                <div className="text-gray-700 break-words whitespace-normal text-sm md:text-base">
                  {productData.allergensText || productData.allergens || 'Nu sunt disponibili.'}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'recenzii' && (
            <div className="space-y-6 md:space-y-8">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-serif text-gray-900 tracking-tight break-words">
                Recenzii ({productData.reviews?.length || 0})
              </h2>

              {productData.reviews?.length ? (
                <div className="space-y-4">
                  {productData.reviews.map((review) => (
                    <ReviewItem key={review.id || Math.random().toString()} review={review} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">Nicio recenzie încă.</p>
              )}

              <ReviewForm product={productData} onReviewAdded={handleReviewAdded} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductTabsSection;

