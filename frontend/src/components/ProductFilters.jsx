
import React, { useState } from 'react';
import { Search, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './ui/Button';

const ProductFilters = ({ 
  filters,
  onFilterChange,
  onResetFilters,
  isMobile = false
}) => {
  const { 
    priceRange, 
    selectedCategories, 
    selectedTags, 
    searchQuery,
    categories,
    allTags,
    activeFilterCount 
  } = filters;

  console.log('ProductFilters rendering with:', { categories, allTags, selectedCategories, selectedTags });

  if (!Array.isArray(categories) || !categories.length || !Array.isArray(allTags) || !allTags.length) {
    return <div className="text-center py-4">Nu există filtre disponibile</div>;
  }

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [openSections, setOpenSections] = useState({
    price: false,
    categories: false,
    tags: false
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const FilterSectionHeader = ({ title, section, isOpen, count = 0 }) => (
    <div 
      className="flex justify-between items-center cursor-pointer py-2"
      onClick={() => toggleSection(section)}
    >
      <span className="text-sm font-medium text-[#8B5E3B]">
        {title} 
        {count > 0 && ` (${count})`}


      </span>
      {isOpen ? 
        <ChevronUp className="h-4 w-4 text-[#8B5E3B]" /> : 
        <ChevronDown className="h-4 w-4 text-[#8B5E3B]" />
      }
    </div>
  );

  const MobileFilterToggle = () => (
    <div className="lg:hidden mb-4">
      <Button
        onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-lg shadow-sm border border-[#F3D9CA] text-[#8B5E3B]"
      >
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span className="font-medium">Filtre</span>
        </div>
        
        {activeFilterCount > 0 && (
          <span className="bg-[#8B5E3B] text-white text-xs px-2 py-1 rounded-full">
            {activeFilterCount}
          </span>
        )}
        
        {!isMobileFiltersOpen ? (
          <ChevronDown className="h-5 w-5 ml-2" />
        ) : (
          <ChevronUp className="h-5 w-5 ml-2" />
        )}
      </Button>
    </div>
  );

  const TransparentCheckboxes = ({ title, section, items, selectedItems, onToggle }) => (
    <div>
      <div className="lg:hidden">
        <FilterSectionHeader 
          title={title}
          section={section}
          isOpen={openSections[section]}
          count={selectedItems.length}
        />
      </div>
      
      <div 
        className={`${openSections[section] ? 'block' : 'hidden'} lg:block`}
        style={{ backgroundColor: 'transparent', background: 'none' }}
      >
        <label 
          className="block text-sm font-medium mb-2 text-[#8B5E3B] hidden lg:block"
          style={{ backgroundColor: 'transparent', background: 'none' }}
        >
          {title}
        </label>
        <div 
          className="space-y-2"
          style={{ backgroundColor: 'transparent', background: 'none' }}
        >
          {items.map((item) => (
            <div 
              key={item} 
              className="flex items-center"
              style={{ backgroundColor: 'transparent', background: 'none' }}
            >
              <input
                type="checkbox"
                id={`${section}-${item}`}
                checked={selectedItems.includes(item)}
                onChange={() => {
                  console.log(`Toggling ${section}:`, item);
                  onToggle(item);
                }}
                className="mr-2 accent-[#8B5E3B]"
                style={{ backgroundColor: 'transparent' }}
              />
              <label 
                htmlFor={`${section}-${item}`} 
                className="text-gray-700"
                style={{ backgroundColor: 'transparent', background: 'none' }}
              >
                {section === 'tags' ? <span className="capitalize">{item}</span> : item}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {isMobile && <MobileFilterToggle />}
      
      <div className={`${isMobile && !isMobileFiltersOpen ? 'hidden lg:block' : 'block'} lg:w-full`}>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-serif mb-6 text-[#8B5E3B] border-b pb-2 hidden lg:block">Filtre</h2>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-[#8B5E3B]">Caută produse</label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onFilterChange('searchQuery', e.target.value)}
                placeholder="Caută..."
                className="w-full p-2 pl-10 border rounded focus:ring-[#8B5E3B] focus:border-[#8B5E3B]"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#8B5E3B]" />
            </div>
          </div>
          
          <div className="mb-6">
            <div className="lg:hidden">
              <FilterSectionHeader 
                title={`Preț: ${priceRange.min} - ${priceRange.max} lei`}
                section="price"
                isOpen={openSections.price}
                count={priceRange.min > 0 || priceRange.max < 300 ? 1 : 0}
              />
            </div>
            
            <div className={`${openSections.price ? 'block' : 'hidden'} lg:block`}>
              <label className="block text-sm font-medium mb-2 text-[#8B5E3B] hidden lg:block">
                Preț: {priceRange.min} - {priceRange.max} lei
              </label>
              <div className="space-y-4">
                <input
                  type="range"
                  min="0"
                  max="300"
                  value={priceRange.min}
                  onChange={(e) => onFilterChange('priceRange', { 
                    ...priceRange, 
                    min: Number(e.target.value) 
                  })}
                  className="w-full accent-[#8B5E3B]"
                />
                <input
                  type="range"
                  min="0"
                  max="300"
                  value={priceRange.max}
                  onChange={(e) => onFilterChange('priceRange', { 
                    ...priceRange, 
                    max: Number(e.target.value) 
                  })}
                  className="w-full accent-[#8B5E3B]"
                />
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <TransparentCheckboxes
              title="Categorii"
              section="categories"
              items={categories}
              selectedItems={selectedCategories}
              onToggle={(category) => onFilterChange('categoryToggle', category)}
            />
          </div>
          
          <div className="mb-6">
            <TransparentCheckboxes
              title="Caracteristici"
              section="tags"
              items={allTags}
              selectedItems={selectedTags}
              onToggle={(tag) => onFilterChange('tagToggle', tag)}
            />
          </div>
          
          <Button
            onClick={onResetFilters}
            className="w-full justify-center"
          >
            Resetează filtrele
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductFilters;