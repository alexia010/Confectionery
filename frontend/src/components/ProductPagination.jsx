

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Pagination component for product listing
 */
const ProductPagination = ({
  currentPage,
  totalPages,
  onPreviousPage,
  onNextPage
}) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPreviousPage();
      console.log('Scrolling to top on previous page');
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onNextPage();
      console.log('Scrolling to top on next page');
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex justify-center items-center space-x-4">
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className={`!bg-transparent !border-none p-2 rounded-full ${
          currentPage === 1
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-[#8B5E3B] hover:bg-[#8B5E3B]/10'
        }`}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <div className="flex items-center">
        <span className="text-[#8B5E3B] font-medium">
          Pagina {currentPage} din {totalPages}
        </span>
      </div>

      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className={`!bg-transparent !border-none p-2 rounded-full ${
          currentPage === totalPages
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-[#8B5E3B] hover:bg-[#8B5E3B]/10'
        }`}
        aria-label="Next page"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
};

export default ProductPagination;