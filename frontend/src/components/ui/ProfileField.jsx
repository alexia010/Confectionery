import React from 'react';

export const ProfileField = ({ label, value }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-500 mb-1">{label}</label>
      <p className="text-gray-800">{value}</p>
    </div>
  );
};