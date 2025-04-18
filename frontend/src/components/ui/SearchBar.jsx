
import React from 'react';
import useSearch from '../../hooks/useSearch';

const SearchBar = ({
  onSearch,
  onOpen,
  placeholder = "Caută produse...",
  expandDirection = "right", // "right" sau "left"
  buttonClassName = "text-white hover:text-[#D7BFA8] transition-colors duration-300",
  containerClassName = "relative",
  inputClassName = "py-1 pl-3 pr-8 bg-[#3C2A21]/90 text-white border border-[#D7BFA8]/30 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D7BFA8] text-sm w-48"
}) => {
  const {
    isSearchOpen,
    searchQuery,
    searchRef,
    inputRef,
    setSearchQuery,
    openSearch: originalOpenSearch,
    closeSearch,
    handleSearchSubmit
  } = useSearch(onSearch);
  
  // Adaugă un wrapper pentru openSearch pentru a notifica părintele
  const openSearch = () => {
    originalOpenSearch();
    if (onOpen) onOpen();
  };

  // Stiluri pentru poziționarea formularului în funcție de direcția de expandare
  const getFormPositionClass = () => {
    if (expandDirection === "right") {
      return "right-0";
    } else if (expandDirection === "left") {
      return "left-0";
    } else {
      return "right-0"; // Default la dreapta
    }
  };

  return (
    <div ref={searchRef} className={`${containerClassName}`}>
      {isSearchOpen ? (
        <form 
          onSubmit={handleSearchSubmit}
          className={`absolute top-1/2 transform -translate-y-1/2 flex items-center ${getFormPositionClass()}`}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={inputClassName}
            autoFocus
          />
          {/* Înlocuim button cu div cu rol de buton pentru formular */}
          <div
            onClick={() => handleSearchSubmit({ preventDefault: () => {} })}
            role="button"
            tabIndex={0}
            aria-label="Caută"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white hover:text-[#D7BFA8] transition-colors duration-300 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </form>
      ) : (
       
        <div
          onClick={openSearch}
          role="button"
          tabIndex={0}
          aria-label="Caută"
          className={`${buttonClassName} cursor-pointer`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default SearchBar;