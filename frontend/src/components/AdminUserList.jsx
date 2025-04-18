

import React from 'react';
import { Pencil, Trash2, Mail, Phone, Calendar, Shield, MapPin } from 'lucide-react';

const AdminUserList = ({ users, onEdit, onDelete }) => {
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {users.map((user) => (
        <div 
          key={user._id} 
          className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
        >
          <div className="p-3 sm:p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-indigo-800 font-medium text-lg">
                    {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-medium text-gray-900 line-clamp-1">
                    {user.name || 'Utilizator anonim'}
                  </h3>
                  <div className="flex items-center mt-1">
                    <span className={`px-1.5 py-0.5 inline-flex text-xs leading-4 font-medium rounded-full ${
                      getRoleBadgeClass(user.role)}`}>
                      {getRoleName(user.role)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={() => onEdit(user)}
                  className="p-1.5 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-100 rounded-md"
                  title="Editează"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => onDelete(user)}
                  className="p-1.5 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-md"
                  title="Șterge"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <div className="space-y-1.5">
              <div className="flex items-center text-xs sm:text-sm text-gray-600 truncate">
                <Mail size={14} className="mr-1.5 flex-shrink-0 text-gray-400" />
                <span className="truncate">{user.email || '-'}</span>
              </div>
              
              {user.phone && (
                <div className="flex items-center text-xs sm:text-sm text-gray-600">
                  <Phone size={14} className="mr-1.5 flex-shrink-0 text-gray-400" />
                  <span>{user.phone}</span>
                </div>
              )}
              
              {user.adress && (
                <div className="flex items-center text-xs sm:text-sm text-gray-600">
                  <MapPin size={14} className="mr-1.5 flex-shrink-0 text-gray-400" />
                  <span className="truncate">{user.adress}</span>
                </div>
              )}
              
              <div className="flex items-center text-xs sm:text-sm text-gray-600">
                <Calendar size={14} className="mr-1.5 flex-shrink-0 text-gray-400" />
                <span>Înreg: {formatDate(user.createdAt)}</span>
              </div>
              
              {user.lastLogin && (
                <div className="flex items-center text-xs sm:text-sm text-gray-600">
                  <Calendar size={14} className="mr-1.5 flex-shrink-0 text-gray-400" />
                  <span>Ultima: {formatDate(user.lastLogin)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminUserList;