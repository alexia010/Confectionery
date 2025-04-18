import React from 'react';

const AuthInput = ({
  id,
  name,
  type,
  label,
  value,
  onChange,
  error,
  placeholder
}) => {
  // Adăugăm un stil inline pentru a gestiona textul alb în autofill
  const inputStyle = {
    WebkitTextFillColor: '#7B4D2B', // Forțează culoarea textului în autofill
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-[#7B4D2B] mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={type === 'password' ? 'current-password' : type === 'email' ? 'email' : name}
          className={`block w-full px-4 py-2 border ${
            error ? 'border-red-500' : 'border-[#D7BFA8]/70'
          } rounded-lg shadow-sm placeholder-gray-100 focus:outline-none focus:ring-2 focus:ring-[#FFB6B9] focus:border-[#FFB6B9] bg-[#FFF8F5] text-[#7B4D2B] text-sm transition-all duration-300
          [&:-webkit-autofill]:bg-[#FFF8F5] [&:-webkit-autofill]:text-[#7B4D2B] [&:-webkit-autofill]:shadow-[0_0_0_40px_#FFEBEB_inset]`}
          style={inputStyle}
        />
        {error && (
          <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#A35D3A]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-[#A35D3A] font-light">{error}</p>
      )}
    </div>
  );
};

export default AuthInput;