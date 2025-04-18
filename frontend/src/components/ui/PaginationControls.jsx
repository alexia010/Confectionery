const PaginationControls = ({ currentPage, totalPages, handlePageChange }) => (
    <div className="flex items-center space-x-2 text-sm text-gray-700">
      <button
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        className={`px-1 ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'hover:text-black'}`}
      >
        «
      </button>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-1 ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'hover:text-black'}`}
      >
        ‹
      </button>
      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
        let pageNum;
        if (totalPages <= 5) {
          pageNum = i + 1;
        } else if (currentPage <= 3) {
          pageNum = i + 1;
        } else if (currentPage >= totalPages - 2) {
          pageNum = totalPages - 4 + i;
        } else {
          pageNum = currentPage - 2 + i;
        }
        return (
          <button
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}
            className={`px-2 ${currentPage === pageNum ? 'font-bold underline' : 'hover:underline'}`}
          >
            {pageNum}
          </button>
        );
      })}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-1 ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'hover:text-black'}`}
      >
        ›
      </button>
      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={`px-1 ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'hover:text-black'}`}
      >
        »
      </button>
    </div>
  );
  
  export default PaginationControls;