import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

/**
 * TransparentCheckboxGroup - componentă pentru checkbox-uri cu fundal complet transparent
 */
const TransparentCheckboxGroup = ({ 
  title = "Categorii",
  items = [],
  selectedItems = [],
  onItemToggle,
  isMobile = false,
  initialOpen = false
}) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  
  // Filter Section Header component
  const FilterSectionHeader = ({ title, isOpen, count = 0 }) => (
    <div 
      className="flex justify-between items-center cursor-pointer py-2"
      onClick={() => setIsOpen(!isOpen)}
      style={{ backgroundColor: 'transparent' }}
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

  return (
    <div style={{ 
      backgroundColor: 'transparent',
      background: 'none'
    }}>
      {isMobile && (
        <div className="lg:hidden" style={{ backgroundColor: 'transparent', background: 'none' }}>
          <FilterSectionHeader 
            title={title}
            isOpen={isOpen}
            count={selectedItems.length}
          />
        </div>
      )}
      
      <div 
        className={`${isMobile && !isOpen ? 'hidden lg:block' : 'block'}`}
        style={{ 
          backgroundColor: 'transparent',
          background: 'none'
        }}
      >
        <label 
          className="block text-sm font-medium mb-2 text-[#8B5E3B] hidden lg:block"
          style={{ 
            backgroundColor: 'transparent',
            background: 'none'
          }}
        >
          {title}
        </label>
        
        <div 
          className="space-y-2"
          style={{ 
            backgroundColor: 'transparent',
            background: 'none'
          }}
        >
          {items.map((item) => (
            <div 
              key={item} 
              className="flex items-center"
              style={{ 
                backgroundColor: 'transparent',
                background: 'none',
                boxShadow: 'none'
              }}
            >
              <input
                type="checkbox"
                id={`checkbox-${item.replace(/\s+/g, '-').toLowerCase()}`}
                checked={selectedItems.includes(item)}
                onChange={() => onItemToggle(item)}
                className="mr-2 accent-[#8B5E3B]"
                style={{ backgroundColor: 'transparent' }}
              />
              <label 
                htmlFor={`checkbox-${item.replace(/\s+/g, '-').toLowerCase()}`} 
                className="text-gray-700"
                style={{ 
                  backgroundColor: 'transparent',
                  background: 'none'
                }}
              >
                {item}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransparentCheckboxGroup;