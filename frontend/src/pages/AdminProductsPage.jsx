

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { PlusCircle } from 'lucide-react';
import AdminLayout from '../layouts/AdminLayout';
import { Button } from '../components/ui/Button';
import Modal from '../components/Modal';
import ProductTable from '../components/ui/AdminProductTable';
import { productService } from '../services/productService';
import { categories, characteristics } from '../config/constants';

// Lazy-loaded ProductTable with data
const ProductTableWithData = React.lazy(() => {
  // Simulate network delay for smoother transitions
  return new Promise(resolve => {
    const component = import('../components/ui/AdminProductTable');
    setTimeout(() => resolve(component), 100);
  });
});

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [sortConfig, setSortConfig] = useState({ key: '_id', direction: 'ascending' });
  const [expandedReviews, setExpandedReviews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // Ref for scrolling
  const tableContainerRef = useRef(null);

  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    characteristics: [],
    allergensText: '',
    ingredients: [],
    images: [],
    visible: true,
  });

  // Separate data loading from rendering
  useEffect(() => {
    let isMounted = true;
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Use a slight delay to ensure UI is rendered first
        setTimeout(async () => {
          if (!isMounted) return;
          
          try {
            const fetchedProducts = await productService.getAllProducts(true);
            if (isMounted) {
              setProducts(fetchedProducts);
              setLoading(false);
            }
          } catch (err) {
            if (isMounted) {
              setError('Eroare la încărcarea produselor: ' + err.message);
              console.error(err);
              setLoading(false);
            }
          }
        }, 300); // Small delay to render UI first
      } catch (err) {
        if (isMounted) {
          setError('Eroare la încărcarea produselor: ' + err.message);
          console.error(err);
          setLoading(false);
        }
      }
    };

    fetchProducts();
    
    return () => {
      isMounted = false;
    };
  }, [refreshTrigger]);

  const handleFormChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'checkbox') {
      setFormValues(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      const newImages = Array.from(files);
      setFormValues(prev => ({
        ...prev,
        images: [...(prev.images || []), ...newImages]
      }));
    } else {
      setFormValues(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let formData = { ...formValues };
    if (formData.price) formData.price = parseFloat(formData.price);
  
    if (formData.ingredients && typeof formData.ingredients === 'string') {
      try {
        formData.ingredients = JSON.parse(formData.ingredients);
      } catch (err) {
        console.error('Eroare la parsarea ingredientelor:', err);
        setError('Eroare la parsarea ingredientelor');
        return;
      }
    }

    const existingImages = formData.images.filter((img) => typeof img === 'string');
    const newImages = formData.images.filter((img) => img instanceof File);

    try {
      if (modalMode === 'add') {
        const newProduct = await productService.createProduct(formData, newImages);
        setProducts((prevProducts) => [...prevProducts, newProduct]);
        setRefreshTrigger((prev) => prev + 1);
      } else if (modalMode === 'edit' && selectedProduct) {
        formData.images = existingImages;
        const updatedProduct = await productService.updateProduct(
          selectedProduct._id,
          formData,
          newImages
        );
        setProducts((prevProducts) => 
          prevProducts.map((product) =>
            product._id === selectedProduct._id ? updatedProduct : product
          )
        );
        setRefreshTrigger((prev) => prev + 1);
      }
      setIsModalOpen(false);
      setSelectedProduct(null);
    } catch (err) {
      setError('Eroare la salvarea produsului: ' + err.message);
      console.error('Eroare în handleSubmit:', err);
    }
  };

  const handleDelete = async () => {
    if (selectedProduct) {
      try {
        await productService.deleteProduct(selectedProduct._id);
        setProducts((prevProducts) => 
          prevProducts.filter((product) => product._id !== selectedProduct._id)
        );
        setRefreshTrigger((prev) => prev + 1);
        setIsModalOpen(false);
        setSelectedProduct(null);
      } catch (err) {
        setError('Eroare la ștergerea produsului: ' + err.message);
      }
    }
  };

  const sortedProducts = React.useMemo(() => {
    if (!products.length) return [];
    
    return [...products].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [products, sortConfig.key, sortConfig.direction]);

  const filteredProducts = React.useMemo(() => {
    if (loading || !sortedProducts.length) {
      return [];
    }
    
    const filtered = sortedProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.category &&
        product.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    // Calculate total pages based on filtered products
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    return filtered;
  }, [sortedProducts, searchTerm, itemsPerPage, loading]);

  const currentProducts = React.useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    // Scroll to the top of the table container smoothly
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }

    // Set the new page
    setCurrentPage(page);
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const toggleVisibility = async (id) => {
    try {
      const product = products.find((p) => p._id === id);
      if (!product) return;
      
      const newVisibility = !product.visible;
      await productService.toggleVisibility(id, newVisibility);
      
      setProducts((prevProducts) =>
        prevProducts.map((p) => p._id === id ? {...p, visible: newVisibility} : p)
      );
    } catch (err) {
      console.error('Eroare la actualizarea vizibilității:', err);
      setError('Eroare la actualizarea vizibilității: ' + err.message);
      setRefreshTrigger((prev) => prev + 1);
    }
  };

  const toggleReviews = (productId) => {
    setExpandedReviews(prev => prev === productId ? null : productId);
  };

  const deleteReview = async (productId, reviewId) => {
    try {
      await productService.deleteReview(productId, reviewId);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productId
            ? {
                ...product,
                reviews: product.reviews.filter((review) => review._id !== reviewId),
              }
            : product
        )
      );
    } catch (err) {
      setError('Eroare la ștergerea recenziei: ' + err.message);
      console.error('Eroare la ștergerea recenziei:', err);
    }
  };

  // Render loading spinner for table
  const TableLoadingSpinner = () => (
    <div className="flex justify-center items-center h-40">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
    </div>
  );

  // Empty table placeholder
  const EmptyTablePlaceholder = () => (
    <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 className="text-lg font-medium text-gray-700 mb-2">Nu au fost găsite produse</h3>
      <p className="text-gray-500 mb-4">Încercați să modificați criteriile de căutare pentru a găsi rezultate.</p>
      <button 
        onClick={() => setSearchTerm('')}
        className="px-4 py-2 bg-red-200 text-red-700 rounded-md hover:bg-red-300 inline-flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Resetează căutarea
      </button>
    </div>
  );

  // If there's an error, show error message
  if (error) return (
    <AdminLayout>
      <div className="text-red-500 p-6">{error}</div>
    </AdminLayout>
  );

  // Load the static UI elements immediately
  return (
    <AdminLayout>
      <header className="bg-white shadow-sm w-full">
        <div className="w-full px-4 py-6 sm:px-6 lg:px-8 box-border">
          <h1 className="text-2xl sm:text-2xl md:text-3xl font-sans font-light text-gray-900 text-center sm:text-left break-words">
            Management Produse
          </h1>
        </div>
      </header>

      <main className="w-full max-w-full px-4 py-6 sm:px-6 lg:px-8">
        <div className="py-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-4 sm:space-y-0">
            <div className="relative w-full sm:w-auto">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Caută produse..."
                className="text-black pl-10 pr-4 py-2 border border-gray-200 rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <Button
              onClick={() => {
                setModalMode('add');
                setFormValues({
                  name: '',
                  description: '',
                  price: '',
                  category: '',
                  characteristics: [],
                  allergensText: '',
                  ingredients: [],
                  images: [],
                  visible: true,
                });
                setIsModalOpen(true);
              }}
              className="flex items-center px-4 py-2 bg-red-200 hover:bg-red-300 text-red-700 rounded-md transition-colors w-full sm:w-auto justify-center sm:justify-start"
            >
              <PlusCircle size={18} className="mr-2" />
              Adaugă Produs
            </Button>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-600">
                Afișare <span className="font-medium">{!loading && filteredProducts.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span>-
                <span className="font-medium">
                  {!loading ? Math.min(currentPage * itemsPerPage, filteredProducts.length) : 0}
                </span> din <span className="font-medium">{!loading ? filteredProducts.length : 0}</span> produse
              </p>
            </div>
            <div className="flex items-center">
              <label htmlFor="itemsPerPage" className="text-sm text-gray-600 mr-2">Afișează:</label>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(parseInt(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-3 py-2 border text-black border-gray-300 rounded-md text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>

          <div ref={tableContainerRef} className="overflow-x-auto">
            {loading ? (
              <TableLoadingSpinner />
            ) : filteredProducts.length === 0 ? (
              <EmptyTablePlaceholder />
            ) : (
              <Suspense fallback={<TableLoadingSpinner />}>
                <ProductTableWithData
                  products={currentProducts}
                  sortConfig={sortConfig}
                  requestSort={requestSort}
                  onEdit={(product) => {
                    setSelectedProduct(product);
                    setModalMode('edit');
                    setFormValues({
                      name: product.name,
                      description: product.description,
                      price: product.price.toString(),
                      category: product.category || '',
                      characteristics: product.characteristics || [],
                      allergensText: product.allergensText || '',
                      ingredients: product.ingredients || [],
                      images: product.images || [],
                      visible: product.visible !== undefined ? product.visible : true,
                    });
                    setIsModalOpen(true);
                  }}
                  onDelete={(product) => {
                    setSelectedProduct(product);
                    setModalMode('delete');
                    setIsModalOpen(true);
                  }}
                  onToggleVisibility={toggleVisibility}
                  expandedReviews={expandedReviews}
                  toggleReviews={toggleReviews}
                  deleteReview={deleteReview}
                />
              </Suspense>
            )}
          </div>

          {!loading && filteredProducts.length > 0 && (
            <div className="flex flex-wrap items-center justify-between gap-4 mt-6 px-2">
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                  className={`px-1 ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'hover:text-black'}`}
                  aria-label="Prima pagină"
                >
                  «
                </button>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-1 ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'hover:text-black'}`}
                  aria-label="Pagina anterioară"
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
                  aria-label="Pagina următoare"
                >
                  ›
                </button>
                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                  className={`px-1 ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'hover:text-black'}`}
                  aria-label="Ultima pagină"
                >
                  »
                </button>
              </div>
              <div className="text-sm text-gray-500">
                Pagina {currentPage} din {totalPages}
              </div>
            </div>
          )}
        </div>
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
        modalMode={modalMode}
        title={
          modalMode === 'add' 
            ? 'Adaugă produs nou' 
            : modalMode === 'edit' 
            ? 'Editează produs' 
            : 'Șterge produs'
        }
        selectedProduct={selectedProduct}
        formValues={formValues}
        handleFormChange={handleFormChange}
        handleSubmit={handleSubmit}
        handleDelete={handleDelete}
        categories={categories}
        characteristics={characteristics}
      />
    </AdminLayout>
  );
};

export default AdminProductsPage;