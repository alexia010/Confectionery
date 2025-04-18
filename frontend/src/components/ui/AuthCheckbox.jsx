
import React from 'react';

const AuthCheckbox = ({ id, name, checked, onChange, label, error }) => {
  // Stilul pentru checkbox cu aspect personalizat
  const checkboxStyle = {
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    appearance: 'none',
    backgroundColor: 'white', // Întotdeauna alb
    borderColor: checked ? '#E9A8B9' : '#A35D3A',
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <div>
      <div className="flex items-center">
        <div className="relative w-4 h-4">
          <input
            id={id}
            name={name}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            style={checkboxStyle}
            className={`absolute inset-0 w-4 h-4 border-2 rounded cursor-pointer transition-all duration-200 
              ${checked ? "border-[#E9A8B9]" : "border-[#A35D3A]"} bg-white`}
          />
        </div>
        <label htmlFor={id} className="ml-2 block text-sm text-[#7B4D2B] font-medium">
          {label}
        </label>
      </div>
      {error && (
        <p className="mt-1 text-sm text-[#A35D3A] font-light">{error}</p>
      )}
    </div>
  );
}

export default AuthCheckbox;