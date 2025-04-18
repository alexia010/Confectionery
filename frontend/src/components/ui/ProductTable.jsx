import React from 'react';
import { Edit, Trash2, Eye, EyeOff, ChevronUp, ChevronDown } from 'lucide-react';
import Badge from './Badge';

const ProductTable = ({ 
  products, 
  sortConfig, 
  requestSort, 
  onEdit, 
  onDelete, 
  onToggleVisibility 
}) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <TableHeader 
              label="ID" 
              sortKey="id" 
              sortConfig={sortConfig} 
              requestSort={requestSort} 
            />
            <TableHeader 
              label="Nume" 
              sortKey="name" 
              sortConfig={sortConfig} 
              requestSort={requestSort} 
            />
            <TableHeader 
              label="Preț" 
              sortKey="price" 
              sortConfig={sortConfig} 
              requestSort={requestSort} 
            />
            <TableHeader 
              label="Categorie" 
              sortKey="category" 
              sortConfig={sortConfig} 
              requestSort={requestSort} 
            />
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Caracteristici
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Vizibilitate
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acțiuni
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.length > 0 ? (
            products.map(product => (
              <tr key={product.id} className={!product.visible ? "bg-gray-50" : ""}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-full" src={product.image} alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.description.substring(0, 50)}...</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.price} lei
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex flex-wrap gap-1">
                    {product.characteristics.map((char, index) => (
                      <Badge key={index} variant="blue">{char}</Badge>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Badge variant={product.visible ? "green" : "red"}>
                    {product.visible ? 'Vizibil' : 'Ascuns'}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => onToggleVisibility(product.id)}
                      className="text-indigo-600 hover:text-indigo-900"
                      title={product.visible ? "Ascunde" : "Arată"}
                    >
                      {product.visible ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    <button 
                      onClick={() => onEdit(product)}
                      className="text-yellow-600 hover:text-yellow-900"
                      title="Editează"
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={() => onDelete(product)}
                      className="text-red-600 hover:text-red-900"
                      title="Șterge"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                Nu s-au găsit produse
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};