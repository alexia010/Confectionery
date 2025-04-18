import React from 'react';
import Select from './ui/Select';

/**
 * Header component for product listing with sorting and items per page controls
 */
const ProductListHeader = ({ 
  productCount, 
  sortOption, 
  onSortChange, 
  itemsPerPage, 
  onItemsPerPageChange 
}) => {
  const sortOptions = [
    { value: 'default', label: 'Recomandate' },
    { value: 'price-asc', label: 'Preț: Crescător' },
    { value: 'price-desc', label: 'Preț: Descrescător' },
    { value: 'name-asc', label: 'Nume: A-Z' },
    { value: 'rating-desc', label: 'Rating' }
  ];

  const itemsPerPageOptions = [
    { value: '3', label: '3' },
    { value: '6', label: '6' },
    { value: '9', label: '9' },
    { value: '12', label: '12' }
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm mb-4 sm:mb-0 text-[#8B5E3B]">
          {productCount} produse găsite
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full sm:w-auto">
          {/* Sort selector */}
          <Select
            id="sort"
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value)}
            label="Sortează după"
            options={sortOptions}
          />
          
          {/* Items per page selector */}
          <Select
            id="itemsPerPage"
            value={String(itemsPerPage)}
            onChange={onItemsPerPageChange}
            label="Produse/Pagină"
            options={itemsPerPageOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductListHeader;