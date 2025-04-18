

import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

const AdminUserTable = ({ 
  users, 
  sortConfig, 
  requestSort, 
  getSortIcon,
  onEdit, 
  onDelete
}) => {
  
  // Format date to be displayed
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('ro-RO', options);
  };

  // Map role to display name in Romanian
  const getRoleName = (role) => {
    switch (role) {
      case 'admin':
        return 'Administrator';
      case 'cofetar':
        return 'Cofetar';
      case 'user':
        return 'Utilizator';
      case 'guest':
        return 'Vizitator';
      default:
        return role || '-';
    }
  };

  // Get role badge color
  const getRoleBadgeClass = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'cofetar':
        return 'bg-green-100 text-green-800';
      case 'user':
        return 'bg-blue-100 text-blue-800';
      case 'guest':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 bg-white border border-gray-200 rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th
              onClick={() => requestSort('name')}
              className="group px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none"
            >
              <div className="flex items-center space-x-1">
                <span>Nume</span>
                <span className="text-gray-400">{getSortIcon('name')}</span>
              </div>
            </th>
            <th
              onClick={() => requestSort('email')}
              className="group px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none hidden sm:table-cell"
            >
              <div className="flex items-center space-x-1">
                <span>Email</span>
                <span className="text-gray-400">{getSortIcon('email')}</span>
              </div>
            </th>
            <th
              onClick={() => requestSort('phone')}
              className="group px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none hidden md:table-cell"
            >
              <div className="flex items-center space-x-1">
                <span>Telefon</span>
                <span className="text-gray-400">{getSortIcon('phone')}</span>
              </div>
            </th>
            <th
              onClick={() => requestSort('role')}
              className="group px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none"
            >
              <div className="flex items-center space-x-1">
                <span>Rol</span>
                <span className="text-gray-400">{getSortIcon('role')}</span>
              </div>
            </th>
            <th
              onClick={() => requestSort('lastLogin')}
              className="group px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none hidden lg:table-cell"
            >
              <div className="flex items-center space-x-1">
                <span>Ultima conectare</span>
                <span className="text-gray-400">{getSortIcon('lastLogin')}</span>
              </div>
            </th>
            <th
              onClick={() => requestSort('createdAt')}
              className="group px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none hidden md:table-cell"
            >
              <div className="flex items-center space-x-1">
                <span>Înregistrat</span>
                <span className="text-gray-400">{getSortIcon('createdAt')}</span>
              </div>
            </th>
            <th className="px-3 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acțiuni
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr 
              key={user._id} 
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="px-3 py-3">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-indigo-800 font-medium text-sm">
                      {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                    </span>
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900 line-clamp-1">
                      {user.name || 'Anonim'}
                    </div>
                    <div className="text-xs text-gray-500 sm:hidden">
                      {user.email || '-'}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-3 py-3 whitespace-nowrap hidden sm:table-cell">
                <div className="text-sm text-gray-900 truncate max-w-[150px]">{user.email || '-'}</div>
              </td>
              <td className="px-3 py-3 whitespace-nowrap hidden md:table-cell">
                <div className="text-sm text-gray-900">{user.phone || "-"}</div>
              </td>
              <td className="px-3 py-3 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  getRoleBadgeClass(user.role)
                }`}>
                  {getRoleName(user.role)}
                </span>
              </td>
              <td className="px-3 py-3 whitespace-nowrap hidden lg:table-cell">
                <div className="text-xs text-gray-500">
                  {formatDate(user.lastLogin)}
                </div>
              </td>
              <td className="px-3 py-3 whitespace-nowrap hidden md:table-cell">
                <div className="text-xs text-gray-500">
                  {formatDate(user.createdAt)}
                </div>
              </td>
              <td className="px-2 py-3 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center justify-end space-x-1">
                  <button
                    onClick={() => onEdit(user)}
                    className="p-1 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-100 rounded-full"
                    title="Editează"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(user)}
                    className="p-1 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-full"
                    title="Șterge"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserTable;