
import React from 'react';
import { UserIcon, ClipboardListIcon, LogOutIcon } from 'lucide-react';

export const ProfileSidebar = ({ 
  userData, 
  activeTab, 
  setActiveTab, 
  handleLogout 
}) => {
  // Definim opțiunile pentru sidebar
  const sidebarOptions = [
    {
      id: 'account',
      label: 'Detalii Cont',
      icon: UserIcon
    },
    // Afișăm tabul de comenzi doar pentru utilizatorii care nu sunt admin
    ...(userData?.role !== 'admin' ? [{
      id: 'orders',
      label: 'Comenzile mele',
      icon: ClipboardListIcon
    }] : [])
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex flex-col space-y-2">
        {/* Afișăm informațiile utilizatorului */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-600 font-semibold">
              {userData?.name ? userData.name[0].toUpperCase() : ''}
            </span>
          </div>
          <div>
            <p className="font-medium text-gray-800">{userData?.name || 'Utilizator'}</p>
            <p className="text-sm text-gray-500">{userData?.email}</p>
          </div>
        </div>

        {/* Meniu opțiuni */}
        {sidebarOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => setActiveTab(option.id)}
            className={`
              flex items-center space-x-3 w-full p-3 rounded-lg transition-colors duration-200
              ${activeTab === option.id 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-100'}
            `}
          >
            <option.icon className="w-5 h-5" />
            <span className="text-sm">{option.label}</span>
          </button>
        ))}

        {/* Buton logout */}
        <button
          onClick={handleLogout}
          className="
            flex items-center space-x-3 w-full p-3 rounded-lg 
            text-gray-600 hover:bg-gray-100 transition-colors duration-200
          "
        >
          <LogOutIcon className="w-5 h-5" />
          <span className="text-sm">Deconectare</span>
        </button>
      </div>
    </div>
  );
};