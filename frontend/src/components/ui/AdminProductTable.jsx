


import React from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';
import ProductReviews from './AdminProductReviews';

const ProductTable = ({
  products,
  sortConfig,
  requestSort,
  onEdit,
  onDelete,
  onToggleVisibility,
  expandedReviews,
  toggleReviews,
  deleteReview,
  breakpoint = 1300 // Valoare implicită
}) => {
  return (
    <div className="bg-white rounded-lg shadow">
      {/* Table View */}
      <div className="table-view overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-white border-b border-gray-100">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('name')}
              >
                Nume {sortConfig.key === 'name' && (
                  <span className="ml-1">{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                )}
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('price')}
              >
                Preț {sortConfig.key === 'price' && (
                  <span className="ml-1">{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                )}
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('category')}
              >
                Categorie {sortConfig.key === 'category' && (
                  <span className="ml-1">{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                )}
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Vizibilitate
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Acțiuni
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <React.Fragment key={product._id}>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-md object-cover"
                          src={product.image || "/placeholder.png"}
                          alt={product.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {product.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.price} lei</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs rounded-md ${
                        product.visible
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }`}
                      onClick={() => onToggleVisibility(product._id)}
                      style={{ cursor: 'pointer' }}
                    >
                      {product.visible ? "Vizibil" : "Ascuns"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex justify-center space-x-3">
                      <Button
                        variant="link"
                        onClick={() => toggleReviews(product._id)}
                        className={`${
                          expandedReviews === product._id
                            ? "!text-[#D76C8F]"
                            : "!text-[#F5A9B8]"
                        } hover:!text-[#D76C8F]`}
                        title="Reviews"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill={expandedReviews === product._id ? "currentColor" : "none"}
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                      </Button>
                      <Button
                        variant="link"
                        onClick={() => onEdit(product)}
                        className="!text-green-600 hover:!text-green-800"
                        title="Editează"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </Button>
                      <Button
                        variant="link"
                        onClick={() => onDelete(product)}
                        className="!text-red-500 !hover:text-red-700"
                        title="Șterge produs"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
                {expandedReviews === product._id && (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                      <ProductReviews product={product} deleteReview={deleteReview} />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card View */}
      <div className="card-view space-y-4 p-4">
        {products.map((product) => (
          <div key={product._id} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 h-12 w-12">
                <img
                  className="h-12 w-12 rounded-md object-cover"
                  src={product.image || "/placeholder.png"}
                  alt={product.name}
                />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                {/* <div className="text-sm text-gray-500 truncate">{product.description}</div> */}
                <div className="text-sm text-gray-500 line-clamp-2 max-w-full">
                  {product.description}
                </div>
              </div>
            </div>
            <div className="mt-3 space-y-2">
              <div className="text-sm text-gray-900">
                <span className="font-medium">Preț:</span> {product.price} lei
              </div>
              <div className="text-sm text-gray-900">
                <span className="font-medium">Categorie:</span> {product.category}
              </div>
              <div className="text-sm">
                <span className="font-medium text-gray-900">Vizibilitate:</span>{' '}
                <span
                  className={`inline-flex px-2 py-1 text-xs rounded-md ${
                    product.visible ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                  }`}
                  onClick={() => onToggleVisibility(product._id)}
                  style={{ cursor: 'pointer' }}
                >
                  {product.visible ? 'Vizibil' : 'Ascuns'}
                </span>
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <div className="flex space-x-3">
                <Button
                  variant="link"
                  onClick={() => toggleReviews(product._id)}
                  className={`${
                    expandedReviews === product._id ? '!text-[#D76C8F]' : '!text-[#F5A9B8]'
                  } hover:!text-[#D76C8F]`}
                  title="Reviews"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill={expandedReviews === product._id ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </Button>
                <Button
                  variant="link"
                  onClick={() => onEdit(product)}
                  className="!text-green-600 hover:!text-green-800"
                  title="Editează"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </Button>
                <Button
                  variant="link"
                  onClick={() => onDelete(product)}
                  className="!text-red-500 !hover:text-red-700"
                  title="Șterge produs"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            {expandedReviews === product._id && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <ProductReviews product={product} deleteReview={deleteReview} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Stiluri dinamice pentru breakpoint */}
      <style jsx>{`
        .table-view {
          display: none;
        }

        .card-view {
          display: block;
        }

        @media (min-width: ${breakpoint}px) {
          .table-view {
            display: block;
          }

          .card-view {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductTable;