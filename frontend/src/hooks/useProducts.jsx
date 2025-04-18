
import { useState, useMemo } from 'react';

const useProducts = (initialProducts = [], defaultItemsPerPage = 6) => {
  const maxPrice = Math.max(...initialProducts.map(p => Number(p.price) || 0), 300);

  const [priceRange, setPriceRange] = useState({ min: 0, max: maxPrice });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortOption, setSortOption] = useState('price-asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);

  const filteredProducts = useMemo(() => {
    console.log('Filtering products with:', {
      priceRange,
      selectedCategories,
      selectedTags,
      searchQuery,
      initialProductsCount: initialProducts.length,
    });

    let result = [...initialProducts];

    // Filtru după preț
    result = result.filter(product => {
      const price = Number(product.price) || 0;
      return price >= priceRange.min && price <= priceRange.max;
    });

    // Filtru după categorie
    if (selectedCategories.length > 0) {
      result = result.filter(product => {
        const productCategory = product.category || '';
        const isMatch = selectedCategories.some(selected => 
          productCategory.toLowerCase() === selected.toLowerCase()
        );
        console.log('Category filter:', {
          productName: product.name,
          productCategory,
          selectedCategories,
          isMatch,
        });
        return isMatch;
      });
    }

    // Filtru după tag-uri
    if (selectedTags.length > 0) {
      result = result.filter(product => {
        const productTags = Array.isArray(product.tags) ? product.tags : [];
        // const isMatch = selectedTags.some(selectedTag => 
        //   productTags.some(tag => tag.toLowerCase() === selectedTag.toLowerCase())
        // );
        const isMatch = selectedTags.every(selectedTag => 
          productTags.some(tag => tag.toLowerCase() === selectedTag.toLowerCase())
        );
        
        console.log('Tag filter:', {
          productName: product.name,
          productTags,
          selectedTags,
          isMatch,
        });
        return isMatch;
      });
    }

    // Filtru după căutare
    if (searchQuery) {
      result = result.filter(product =>
        (product.name || '').toLowerCase().includes(searchQuery.toLowerCase()) 
        // (product.description || '').toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sortare
    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
        break;
      case 'price-desc':
        result.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
        break;
      case 'name-asc':
        result.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        break;
      case 'rating-desc':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        break;
    }

    console.log('Filtered products:', result.map(p => p.name));
    return result;
  }, [initialProducts, priceRange.min, priceRange.max, selectedCategories, selectedTags, searchQuery, sortOption]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    return filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const handleCategoryChange = (category) => {
    console.log('Handling category change:', category);
    setSelectedCategories(prev => {
      const newCategories = prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category];
      console.log('Updated selectedCategories:', newCategories);
      return newCategories;
    });
    setCurrentPage(1);
  };

  const handleTagChange = (tag) => {
    console.log('Handling tag change:', tag);
    setSelectedTags(prev => {
      const newTags = prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag];
      console.log('Updated selectedTags:', newTags);
      return newTags;
    });
    setCurrentPage(1);
  };

  const resetFilters = () => {
    console.log('Resetting filters');
    setPriceRange({ min: 0, max: maxPrice });
    setSelectedCategories([]);
    setSelectedTags([]);
    setSortOption('price-asc');
    setSearchQuery('');
    setCurrentPage(1);
  };

  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(Number(newItemsPerPage));
    setCurrentPage(1);
  };

  const activeFilterCount = selectedCategories.length + selectedTags.length +
    (searchQuery ? 1 : 0) +
    (priceRange.min > 0 || priceRange.max < maxPrice ? 1 : 0);

  return {
    filteredProducts,
    paginatedProducts,
    priceRange,
    selectedCategories,
    selectedTags,
    sortOption,
    searchQuery,
    activeFilterCount,
    currentPage,
    itemsPerPage,
    totalPages,
    setPriceRange: (range) => { setPriceRange(range); setCurrentPage(1); },
    setSortOption,
    setSearchQuery: (query) => { setSearchQuery(query); setCurrentPage(1); },
    handleCategoryChange,
    handleTagChange,
    resetFilters,
    goToPreviousPage,
    goToNextPage,
    handleItemsPerPageChange,
  };
};

export default useProducts;

