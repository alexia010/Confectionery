import React from 'react';

const StatCard = ({ title, value, icon, changeValue, changeText }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 transition-all hover:shadow-md">
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-full ${icon.bgColor} flex items-center justify-center`}>
          {icon.svg}
        </div>
      </div>
      {changeValue && (
        <div className="flex items-center mt-4">
          <span className={`text-xs px-2 py-1 rounded-full ${changeValue.includes('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} font-medium`}>
            {changeValue}
          </span>
          <span className="text-xs text-gray-500 ml-2">{changeText || 'față de luna trecută'}</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
