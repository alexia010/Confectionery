import React from 'react';

/**
 * Select component for dropdown selections
 */
const Select = ({ 
  id, 
  value, 
  onChange, 
  options, 
  label,
  className = "" 
}) => {
  return (
    <div className={`flex flex-col sm:flex-row items-start sm:items-center ${className}`}>
      {label && (
        <label htmlFor={id} className="mr-2 text-sm font-medium text-[#8B5E3B] whitespace-nowrap">
          {label}:
        </label>
      )}
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="p-2 border rounded focus:ring-[#8B5E3B] focus:border-[#8B5E3B] w-full"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;