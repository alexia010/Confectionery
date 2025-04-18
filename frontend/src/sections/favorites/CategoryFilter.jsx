
import React, { useEffect, useState } from "react";

const CategoryFilter = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  products // Adăugăm produsele pentru a verifica dacă categoria are produse
}) => {
  // Adăugăm o stare locală pentru a gestiona tranziția
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Verificăm dacă mai există produse în categoria selectată
  useEffect(() => {
    // Dacă nu suntem deja pe "toate" și categoria selectată nu mai are produse
    if (selectedCategory !== "toate" && !isTransitioning) {
      const hasProductsInCategory = products.some(product => product.category === selectedCategory);
      
      // Dacă nu mai există produse în categoria selectată, inițiem tranziția
      if (!hasProductsInCategory) {
        // Marcăm că suntem în tranziție pentru a preveni multiple tranziții
        setIsTransitioning(true);
        
        // Adăugăm o mică întârziere pentru o tranziție mai puțin bruscă
        setTimeout(() => {
          setSelectedCategory("toate");
          // După schimbarea categoriei, resetăm flag-ul de tranziție
          setTimeout(() => {
            setIsTransitioning(false);
          }, 100);
        }, 500); // O jumătate de secundă întârziere
      }
    }
  }, [products, selectedCategory, setSelectedCategory, isTransitioning]);

  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => !isTransitioning && setSelectedCategory("toate")}
          className={`px-4 py-2 rounded-full transition-colors duration-300 ${
            selectedCategory === "toate"
              ? "bg-[#E9A8B9] text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Toate
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => !isTransitioning && setSelectedCategory(category)}
            disabled={isTransitioning}
            className={`px-4 py-2 rounded-full transition-colors duration-300 ${
              selectedCategory === category
                ? "bg-[#E9A8B9] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            } ${isTransitioning ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;