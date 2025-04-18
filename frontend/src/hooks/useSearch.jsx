import { useState, useEffect, useRef } from 'react';

/**
 * Hook pentru gestionarea funcționalității de căutare
 * @param {Function} onSearch - Funcția apelată la submiterea căutării
 * @param {boolean} initialState - Starea inițială a căutării (deschisă/închisă)
 * @returns {Object} - Starea și metodele pentru gestionarea căutării
 */
const useSearch = (onSearch, initialState = false) => {
  const [isSearchOpen, setIsSearchOpen] = useState(initialState);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  // Handler pentru submit
  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  // Deschide căutarea
  const openSearch = () => {
    setIsSearchOpen(true);
  };

  // Închide căutarea
  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  // Închide căutarea când se apasă Escape
  useEffect(() => {
    const handleEscPress = (e) => {
      if (e.key === 'Escape' && isSearchOpen) {
        closeSearch();
      }
    };

    window.addEventListener('keydown', handleEscPress);
    return () => window.removeEventListener('keydown', handleEscPress);
  }, [isSearchOpen]);

  // Închide căutarea când se face click în afara componentei
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target) && isSearchOpen) {
        closeSearch();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSearchOpen]);

  // Setează focus pe input când se deschide căutarea
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  return {
    isSearchOpen,
    searchQuery,
    searchRef,
    inputRef,
    setSearchQuery,
    openSearch,
    closeSearch,
    handleSearchSubmit
  };
};

export default useSearch;