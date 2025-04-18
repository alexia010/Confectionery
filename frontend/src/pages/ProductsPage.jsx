
// // import React, { useState, useEffect } from 'react';
// // import MainLayout from '../layouts/MainLayout';
// // import { ProductCard } from '../components/ProductCard';
// // import ProductFilters from '../components/ProductFilters';
// // import ProductListHeader from '../components/ProductListHeader';
// // import ProductPagination from '../components/ProductPagination';
// // import useProducts from '../hooks/useProducts';
// // import { Button } from '../components/ui/Button';
// // import { productService } from '../services/productService';

// // const ProdusePage = () => {
// //   const [products, setProducts] = useState([]);
// //   const [enums, setEnums] = useState({ categories: [], characteristics: [] });
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   // Preia enum-urile și produsele din backend
// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         setLoading(true);

// //         // Preia enum-urile
// //         const enumsResponse = await productService.getProductEnums();
// //         setEnums({
// //           categories: enumsResponse.data.categories || [],
// //           characteristics: enumsResponse.data.characteristics || [],
// //         });

// //         // Preia produsele
// //         const fetchedProducts = await productService.getProductsMinimal();
// //         setProducts(fetchedProducts);
// //       } catch (err) {
// //         setError('Eroare la încărcarea datelor: ' + err.message);
// //         console.error(err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, []);

// //   // Formatează datele pentru a se potrivi cu structura așteptată de useProducts
// //   const formattedProducts = products.map(product => ({
// //     _id: product._id,
// //     name: product.name || '',
// //     category: product.category || 'Fără categorie',
// //     price: Number(product.price) || 0,
// //     priceDisplay: `${Number(product.price) || 0} lei`,
// //     rating: Number(product.rating) || 4.5,
// //     image: product.image || 'https://via.placeholder.com/600',
// //     description: product.description || 'Descriere indisponibilă',
// //     tags: Array.isArray(product.characteristics) ? product.characteristics : [],
// //   }));

// //   // Use the combined hook for product management
// //   const {
// //     filteredProducts,
// //     paginatedProducts,
// //     priceRange,
// //     selectedCategories,
// //     selectedTags,
// //     sortOption,
// //     searchQuery,
// //     activeFilterCount,
// //     currentPage,
// //     itemsPerPage,
// //     totalPages,
// //     setPriceRange,
// //     setSortOption,
// //     setSearchQuery,
// //     handleCategoryChange,
// //     handleTagChange,
// //     resetFilters,
// //     goToPreviousPage,
// //     goToNextPage,
// //     handleItemsPerPageChange,
// //   } = useProducts(formattedProducts, 6);

// //   // Handle filter changes
// //   const handleFilterChange = (type, value) => {
// //     switch (type) {
// //       case 'priceRange':
// //         setPriceRange(value);
// //         break;
// //       case 'searchQuery':
// //         setSearchQuery(value);
// //         break;
// //       case 'categoryToggle':
// //         handleCategoryChange(value);
// //         break;
// //       case 'tagToggle':
// //         handleTagChange(value);
// //         break;
// //       default:
// //         console.warn('Unknown filter type:', type);
// //     }
// //   };

// //   // Render empty state when no products match filters
// //   const renderEmptyState = () => (
// //     <div className="bg-white rounded-lg shadow-md p-8 text-center">
// //       <p className="text-gray-600">Nu am găsit produse care să corespundă filtrelor selectate.</p>
// //       <Button onClick={resetFilters} className="mt-4 justify-center">
// //         Resetează filtrele
// //       </Button>
// //     </div>
// //   );

// //   // Render product grid
// //   const renderProductGrid = () => (
// //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //       {paginatedProducts.map((product) => (
// //         <ProductCard key={product.id} product={product} isAdmin={false} />
// //       ))}
// //     </div>
// //   );

// //   // Gestionarea stării de încărcare și erorilor
// //   if (loading) return <div className="text-center py-8">Se încarcă...</div>;
// //   if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

// //   return (
// //     <MainLayout>
// //       <div className="bg-gray-50">
// //         <div className="container mx-auto p-4">
// //           <h1 className="text-4xl font-sans font-light mt-10 tracking-wide text-center my-8 text-gray-800">
// //             Produse
// //           </h1>

// //           <div className="flex flex-col lg:flex-row gap-8">
// //             {/* Sidebar with filters */}
// //             <div className="lg:w-1/4">
// //               <ProductFilters
// //                 filters={{
// //                   priceRange,
// //                   selectedCategories,
// //                   selectedTags,
// //                   searchQuery,
// //                   categories: enums.categories,
// //                   allTags: enums.characteristics,
// //                   activeFilterCount,
// //                 }}
// //                 onFilterChange={handleFilterChange}
// //                 onResetFilters={resetFilters}
// //                 isMobile={true}
// //               />
// //             </div>

// //             {/* Main content */}
// //             <div className="lg:w-3/4">
// //               {/* Products header with sort and items per page */}
        
// //               <ProductListHeader
// //               productCount={filteredProducts.length}
// //               sortOption={sortOption}
// //               onSortChange={(value) => setSortOption(value)}
// //               itemsPerPage={itemsPerPage}
// //               onItemsPerPageChange={(e) => handleItemsPerPageChange(e.target.value)}/>

// //               {/* Product grid or empty state */}
// //               {filteredProducts.length === 0 ? renderEmptyState() : renderProductGrid()}

// //               {/* Pagination controls */}
// //               {filteredProducts.length > 0 && (
// //                 <ProductPagination
// //                   currentPage={currentPage}
// //                   totalPages={totalPages}
// //                   onPreviousPage={goToPreviousPage}
// //                   onNextPage={goToNextPage}
// //                 />
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </MainLayout>
// //   );
// // };

// // export default ProdusePage;


// import React, { useState, useEffect } from 'react';
// import MainLayout from '../layouts/MainLayout';
// import { ProductCard } from '../components/ProductCard';
// import ProductFilters from '../components/ProductFilters';
// import ProductListHeader from '../components/ProductListHeader';
// import ProductPagination from '../components/ProductPagination';
// import useProducts from '../hooks/useProducts';
// import { Button } from '../components/ui/Button';
// import { productService } from '../services/productService';

// const ProdusePage = () => {
//   const [products, setProducts] = useState([]);
//   const [enums, setEnums] = useState({ categories: [], characteristics: [] });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Preia enum-urile și produsele din backend
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         // Preia enum-urile
//         const enumsResponse = await productService.getProductEnums();
//         setEnums({
//           categories: enumsResponse.data.categories || [],
//           characteristics: enumsResponse.data.characteristics || [],
//         });

//         // Preia produsele
//         const fetchedProducts = await productService.getProductsMinimal();
//         setProducts(fetchedProducts);
//       } catch (err) {
//         setError('Eroare la încărcarea datelor: ' + err.message);
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Formatează datele pentru a se potrivi cu structura așteptată de useProducts
//   const formattedProducts = products.map(product => ({
//     _id: product._id,
//     name: product.name || '',
//     category: product.category || 'Fără categorie',
//     price: Number(product.price) || 0,
//     priceDisplay: `${Number(product.price) || 0} lei`,
//     rating: Number(product.rating) || 4.5,
//     image: product.image || 'https://via.placeholder.com/600',
//     description: product.description || 'Descriere indisponibilă',
//     tags: Array.isArray(product.characteristics) ? product.characteristics : [],
//   }));

//   // Use the combined hook for product management
//   const {
//     filteredProducts,
//     paginatedProducts,
//     priceRange,
//     selectedCategories,
//     selectedTags,
//     sortOption,
//     searchQuery,
//     activeFilterCount,
//     currentPage,
//     itemsPerPage,
//     totalPages,
//     setPriceRange,
//     setSortOption,
//     setSearchQuery,
//     handleCategoryChange,
//     handleTagChange,
//     resetFilters,
//     goToPreviousPage,
//     goToNextPage,
//     handleItemsPerPageChange,
//   } = useProducts(formattedProducts, 6);

//   // Handle filter changes
//   const handleFilterChange = (type, value) => {
//     switch (type) {
//       case 'priceRange':
//         setPriceRange(value);
//         break;
//       case 'searchQuery':
//         setSearchQuery(value);
//         break;
//       case 'categoryToggle':
//         handleCategoryChange(value);
//         break;
//       case 'tagToggle':
//         handleTagChange(value);
//         break;
//       default:
//         console.warn('Unknown filter type:', type);
//     }
//   };

//   // Render empty state when no products match filters
//   const renderEmptyState = () => (
//     <div className="bg-white rounded-lg shadow-md p-8 text-center">
//       <p className="text-gray-600">Nu am găsit produse care să corespundă filtrelor selectate.</p>
//       <Button onClick={resetFilters} className="mt-4 justify-center">
//         Resetează filtrele
//       </Button>
//     </div>
//   );

//   // Render product grid
//   const renderProductGrid = () => (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {paginatedProducts.map((product) => (
//         <ProductCard key={product.id} product={product} isAdmin={false} />
//       ))}
//     </div>
//   );

//   // Dacă încă se încarcă, nu afișăm nimic
//   if (loading) return null;

//   // Gestionarea erorii
//   if (error) return (
//     <MainLayout>
//       <div className="text-red-500 text-center py-8">{error}</div>
//     </MainLayout>
//   );

//   return (
//     <MainLayout>
//       <div className="bg-gray-50">
//         <div className="container mx-auto p-4">
//           <h1 className="text-4xl font-sans font-light mt-10 tracking-wide text-center my-8 text-gray-800">
//             Produse
//           </h1>

//           <div className="flex flex-col lg:flex-row gap-8">
//             {/* Sidebar with filters */}
//             <div className="lg:w-1/4">
//               <ProductFilters
//                 filters={{
//                   priceRange,
//                   selectedCategories,
//                   selectedTags,
//                   searchQuery,
//                   categories: enums.categories,
//                   allTags: enums.characteristics,
//                   activeFilterCount,
//                 }}
//                 onFilterChange={handleFilterChange}
//                 onResetFilters={resetFilters}
//                 isMobile={true}
//               />
//             </div>

//             {/* Main content */}
//             <div className="lg:w-3/4">
//               {/* Products header with sort and items per page */}
        
//               <ProductListHeader
//               productCount={filteredProducts.length}
//               sortOption={sortOption}
//               onSortChange={(value) => setSortOption(value)}
//               itemsPerPage={itemsPerPage}
//               onItemsPerPageChange={(e) => handleItemsPerPageChange(e.target.value)}/>

//               {/* Product grid or empty state */}
//               {filteredProducts.length === 0 ? renderEmptyState() : renderProductGrid()}

//               {/* Pagination controls */}
//               {filteredProducts.length > 0 && (
//                 <ProductPagination
//                   currentPage={currentPage}
//                   totalPages={totalPages}
//                   onPreviousPage={goToPreviousPage}
//                   onNextPage={goToNextPage}
//                 />
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default ProdusePage;

// import React, { useState, useEffect } from 'react';
// import MainLayout from '../layouts/MainLayout';
// import { ProductCard } from '../components/ProductCard';
// import ProductFilters from '../components/ProductFilters';
// import ProductListHeader from '../components/ProductListHeader';
// import ProductPagination from '../components/ProductPagination';
// import useProducts from '../hooks/useProducts';
// import { Button } from '../components/ui/Button';
// import { productService } from '../services/productService';

// const ProdusePage = () => {
//   const [products, setProducts] = useState([]);
//   const [enums, setEnums] = useState({ categories: [], characteristics: [] });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Preia enum-urile și produsele din backend
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         // Preia enum-urile
//         const enumsResponse = await productService.getProductEnums();
//         setEnums({
//           categories: enumsResponse.data.categories || [],
//           characteristics: enumsResponse.data.characteristics || [],
//         });

//         // Preia produsele
//         const fetchedProducts = await productService.getProductsMinimal();
//         setProducts(fetchedProducts);
//       } catch (err) {
//         setError('Eroare la încărcarea datelor: ' + err.message);
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Formatează datele pentru a se potrivi cu structura așteptată de useProducts
//   const formattedProducts = products.map(product => ({
//     _id: product._id,
//     name: product.name || '',
//     category: product.category || 'Fără categorie',
//     price: Number(product.price) || 0,
//     priceDisplay: `${Number(product.price) || 0} lei`,
//     rating: Number(product.rating) || 4.5,
//     image: product.image || 'https://via.placeholder.com/600',
//     description: product.description || 'Descriere indisponibilă',
//     tags: Array.isArray(product.characteristics) ? product.characteristics : [],
//   }));

//   // Use the combined hook for product management
//   const {
//     filteredProducts,
//     paginatedProducts,
//     priceRange,
//     selectedCategories,
//     selectedTags,
//     sortOption,
//     searchQuery,
//     activeFilterCount,
//     currentPage,
//     itemsPerPage,
//     totalPages,
//     setPriceRange,
//     setSortOption,
//     setSearchQuery,
//     handleCategoryChange,
//     handleTagChange,
//     resetFilters,
//     goToPreviousPage,
//     goToNextPage,
//     handleItemsPerPageChange,
//   } = useProducts(formattedProducts, 6);

//   // Handle filter changes
//   const handleFilterChange = (type, value) => {
//     switch (type) {
//       case 'priceRange':
//         setPriceRange(value);
//         break;
//       case 'searchQuery':
//         setSearchQuery(value);
//         break;
//       case 'categoryToggle':
//         handleCategoryChange(value);
//         break;
//       case 'tagToggle':
//         handleTagChange(value);
//         break;
//       default:
//         console.warn('Unknown filter type:', type);
//     }
//   };

//   // Render empty state when no products match filters
//   const renderEmptyState = () => (
//     <div className="bg-white rounded-lg shadow-md p-8 text-center">
//       <p className="text-gray-600">Nu am găsit produse care să corespundă filtrelor selectate.</p>
//       <Button onClick={resetFilters} className="mt-4 justify-center">
//         Resetează filtrele
//       </Button>
//     </div>
//   );

//   // Render product grid
//   const renderProductGrid = () => (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {paginatedProducts.map((product) => (
//         <ProductCard key={product.id} product={product} isAdmin={false} />
//       ))}
//     </div>
//   );

//   return (
//     <MainLayout>
//       <div className="bg-gray-50">
//         <div className="container mx-auto p-4">
//           <h1 className="text-4xl font-sans font-light mt-10 tracking-wide text-center my-8 text-gray-800">
//             Produse
//           </h1>

//           <div className="flex flex-col lg:flex-row gap-8">
//             {/* Sidebar with filters */}
//             <div className="lg:w-1/4">
//               <ProductFilters
//                 filters={{
//                   priceRange,
//                   selectedCategories,
//                   selectedTags,
//                   searchQuery,
//                   categories: enums.categories,
//                   allTags: enums.characteristics,
//                   activeFilterCount,
//                 }}
//                 onFilterChange={handleFilterChange}
//                 onResetFilters={resetFilters}
//                 isMobile={true}
//               />
//             </div>

//             {/* Main content */}
//             <div className="lg:w-3/4">
//               {/* Products header with sort and items per page */}
//               <ProductListHeader
//                 productCount={loading ? 0 : filteredProducts.length}
//                 sortOption={sortOption}
//                 onSortChange={(value) => setSortOption(value)}
//                 itemsPerPage={itemsPerPage}
//                 onItemsPerPageChange={(e) => handleItemsPerPageChange(e.target.value)}
//               />

//               {/* Product grid or empty state */}
//               {loading ? (
//                 <div className="min-h-[400px] flex items-center justify-center">
//                   <div className="animate-pulse text-gray-500">Se încarcă produsele...</div>
//                 </div>
//               ) : filteredProducts.length === 0 ? (
//                 renderEmptyState()
//               ) : (
//                 renderProductGrid()
//               )}

//               {/* Pagination controls */}
//               {!loading && filteredProducts.length > 0 && (
//                 <ProductPagination
//                   currentPage={currentPage}
//                   totalPages={totalPages}
//                   onPreviousPage={goToPreviousPage}
//                   onNextPage={goToNextPage}
//                 />
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// import React, { useState, useEffect } from 'react';
// import MainLayout from '../layouts/MainLayout';
// import { ProductCard } from '../components/ProductCard';
// import ProductFilters from '../components/ProductFilters';
// import ProductListHeader from '../components/ProductListHeader';
// import ProductPagination from '../components/ProductPagination';
// import useProducts from '../hooks/useProducts';
// import { Button } from '../components/ui/Button';
// import { productService } from '../services/productService';

// const ProdusePage = () => {
//   const [products, setProducts] = useState([]);
//   const [enums, setEnums] = useState({ categories: [], characteristics: [] });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Preia enum-urile și produsele din backend
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         // Preia enum-urile
//         const enumsResponse = await productService.getProductEnums();
//         setEnums({
//           categories: enumsResponse.data.categories || [],
//           characteristics: enumsResponse.data.characteristics || [],
//         });

//         // Preia produsele
//         const fetchedProducts = await productService.getProductsMinimal();
//         setProducts(fetchedProducts);
//       } catch (err) {
//         setError('Eroare la încărcarea datelor: ' + err.message);
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Formatează datele pentru a se potrivi cu structura așteptată de useProducts
//   const formattedProducts = products.map(product => ({
//     _id: product._id,
//     name: product.name || '',
//     category: product.category || 'Fără categorie',
//     price: Number(product.price) || 0,
//     priceDisplay: `${Number(product.price) || 0} lei`,
//     rating: Number(product.rating) || 4.5,
//     image: product.image || 'https://via.placeholder.com/600',
//     description: product.description || 'Descriere indisponibilă',
//     tags: Array.isArray(product.characteristics) ? product.characteristics : [],
//   }));

//   // Use the combined hook for product management
//   const {
//     filteredProducts,
//     paginatedProducts,
//     priceRange,
//     selectedCategories,
//     selectedTags,
//     sortOption,
//     searchQuery,
//     activeFilterCount,
//     currentPage,
//     itemsPerPage,
//     totalPages,
//     setPriceRange,
//     setSortOption,
//     setSearchQuery,
//     handleCategoryChange,
//     handleTagChange,
//     resetFilters,
//     goToPreviousPage,
//     goToNextPage,
//     handleItemsPerPageChange,
//   } = useProducts(formattedProducts, 6);

//   // Handle filter changes
//   const handleFilterChange = (type, value) => {
//     switch (type) {
//       case 'priceRange':
//         setPriceRange(value);
//         break;
//       case 'searchQuery':
//         setSearchQuery(value);
//         break;
//       case 'categoryToggle':
//         handleCategoryChange(value);
//         break;
//       case 'tagToggle':
//         handleTagChange(value);
//         break;
//       default:
//         console.warn('Unknown filter type:', type);
//     }
//   };

//   // Render empty state when no products match filters
//   const renderEmptyState = () => (
//     <div className="bg-white rounded-lg shadow-md p-8 text-center">
//       <p className="text-gray-600">Nu am găsit produse care să corespundă filtrelor selectate.</p>
//       <Button onClick={resetFilters} className="mt-4 justify-center">
//         Resetează filtrele
//       </Button>
//     </div>
//   );

//   // Render product grid
//   const renderProductGrid = () => (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {paginatedProducts.map((product) => (
//         <ProductCard key={product.id} product={product} isAdmin={false} />
//       ))}
//     </div>
//   );

//   return (
//     <MainLayout>
//       <div className="bg-gray-50">
//         <div className="container mx-auto p-4">
//           <h1 className="text-4xl font-sans font-light mt-10 tracking-wide text-center my-8 text-gray-800">
//             Produse
//           </h1>

//           <div className="flex flex-col lg:flex-row gap-8">
//             {/* Sidebar with filters */}
//             <div className="lg:w-1/4">
//               <ProductFilters
//                 filters={{
//                   priceRange,
//                   selectedCategories,
//                   selectedTags,
//                   searchQuery,
//                   categories: enums.categories,
//                   allTags: enums.characteristics,
//                   activeFilterCount,
//                 }}
//                 onFilterChange={handleFilterChange}
//                 onResetFilters={resetFilters}
//                 isMobile={true}
//               />
//             </div>

//             {/* Main content */}
//             <div className="lg:w-3/4">
//               {/* Products header with sort and items per page */}
//               <ProductListHeader
//                 productCount={loading ? 0 : filteredProducts.length}
//                 sortOption={sortOption}
//                 onSortChange={(value) => setSortOption(value)}
//                 itemsPerPage={itemsPerPage}
//                 onItemsPerPageChange={(e) => handleItemsPerPageChange(e.target.value)}
//               />

//               {/* Product grid or empty state */}
//               {loading ? (
//                 <div className="min-h-[400px] flex items-center justify-center">
//                   <div className="animate-pulse text-gray-500">Se încarcă produsele...</div>
//                 </div>
//               ) : filteredProducts.length === 0 ? (
//                 renderEmptyState()
//               ) : (
//                 renderProductGrid()
//               )}

//               {/* Pagination controls */}
//               {!loading && filteredProducts.length > 0 && (
//                 <ProductPagination
//                   currentPage={currentPage}
//                   totalPages={totalPages}
//                   onPreviousPage={goToPreviousPage}
//                   onNextPage={goToNextPage}
//                 />
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default ProdusePage;

import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import { ProductCard } from '../components/ProductCard';
import ProductFilters from '../components/ProductFilters';
import ProductListHeader from '../components/ProductListHeader';
import ProductPagination from '../components/ProductPagination';
import useProducts from '../hooks/useProducts';
import { Button } from '../components/ui/Button';
import { productService } from '../services/productService';

const ProdusePage = () => {
  const [products, setProducts] = useState([]);
  const [enums, setEnums] = useState({ categories: [], characteristics: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Preia enum-urile și produsele din backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Preia enum-urile
        const enumsResponse = await productService.getProductEnums();
        setEnums({
          categories: enumsResponse.data.categories || [],
          characteristics: enumsResponse.data.characteristics || [],
        });

        // Preia produsele
        const fetchedProducts = await productService.getProductsMinimal();
        setProducts(fetchedProducts);
      } catch (err) {
        setError('Eroare la încărcarea datelor: ' + err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Formatează datele pentru a se potrivi cu structura așteptată de useProducts
  const formattedProducts = products.map(product => ({
    _id: product._id,
    name: product.name || '',
    category: product.category || 'Fără categorie',
    price: Number(product.price) || 0,
    priceDisplay: `${Number(product.price) || 0} lei`,
    rating: Number(product.rating) || 4.5,
    image: product.image || 'https://via.placeholder.com/600',
    description: product.description || 'Descriere indisponibilă',
    tags: Array.isArray(product.characteristics) ? product.characteristics : [],
  }));

  // Use the combined hook for product management
  const {
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
    setPriceRange,
    setSortOption,
    setSearchQuery,
    handleCategoryChange,
    handleTagChange,
    resetFilters,
    goToPreviousPage,
    goToNextPage,
    handleItemsPerPageChange,
  } = useProducts(formattedProducts, 6);

  // Asigură scroll în sus la schimbarea paginii
  useEffect(() => {
    console.log('Scrolling to top due to page change:', currentPage);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [currentPage]);

  // Handle filter changes
  const handleFilterChange = (type, value) => {
    switch (type) {
      case 'priceRange':
        setPriceRange(value);
        break;
      case 'searchQuery':
        setSearchQuery(value);
        break;
      case 'categoryToggle':
        handleCategoryChange(value);
        break;
      case 'tagToggle':
        handleTagChange(value);
        break;
      default:
        console.warn('Unknown filter type:', type);
    }
  };

  // Render empty state when no products match filters
  const renderEmptyState = () => (
    <div className="bg-white rounded-lg shadow-md p-8 text-center">
      <p className="text-gray-600">Nu am găsit produse care să corespundă filtrelor selectate.</p>
      <Button onClick={resetFilters} className="mt-4 justify-center">
        Resetează filtrele
      </Button>
    </div>
  );

  // Render product grid
  const renderProductGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {paginatedProducts.map((product) => (
        <ProductCard key={product._id} product={product} isAdmin={false} />
      ))}
    </div>
  );

  return (
    <MainLayout>
      <div className="bg-gray-50">
        <div className="container mx-auto p-4">
          <h1 className="text-4xl font-sans font-light mt-10 tracking-wide text-center my-8 text-gray-800">
            Produse
          </h1>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar with filters */}
            <div className="lg:w-1/4">
              <ProductFilters
                filters={{
                  priceRange,
                  selectedCategories,
                  selectedTags,
                  searchQuery,
                  categories: enums.categories,
                  allTags: enums.characteristics,
                  activeFilterCount,
                }}
                onFilterChange={handleFilterChange}
                onResetFilters={resetFilters}
                isMobile={true}
              />
            </div>

            {/* Main content */}
            <div className="lg:w-3/4">
              {/* Products header with sort and items per page */}
              <ProductListHeader
                productCount={loading ? 0 : filteredProducts.length}
                sortOption={sortOption}
                onSortChange={(value) => setSortOption(value)}
                itemsPerPage={itemsPerPage}
                onItemsPerPageChange={(e) => handleItemsPerPageChange(e.target.value)}
              />

              {/* Product grid or empty state */}
              {loading ? (
                <div className="min-h-[400px] flex items-center justify-center">
                  <div className="animate-pulse text-gray-500">Se încarcă produsele...</div>
                </div>
              ) : filteredProducts.length === 0 ? (
                renderEmptyState()
              ) : (
                renderProductGrid()
              )}

              {/* Pagination controls */}
              {!loading && filteredProducts.length > 0 && (
                <ProductPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPreviousPage={goToPreviousPage}
                  onNextPage={goToNextPage}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProdusePage;