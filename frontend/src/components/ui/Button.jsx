import React from 'react';

export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'px-6 py-3 rounded-md font-medium transition-all duration-300 inline-flex items-center gap-2';
  
  // Create an object for styles that will override the default button styles
  const variantStyles = {
    primary: { backgroundColor: '#F5A9B8', color: '#F5F5F5', outline: 'none'},
    secondary: { backgroundColor: '#F5A9B8', color: '#FFFFFF' },
    outline: { backgroundColor: 'transparent', color: '#A35D3A', borderColor: '#A35D3A', borderWidth: '2px' },
    link: { backgroundColor: 'transparent', color: '#A35D3A',border: 'none',outline: 'none' }
  };
  
  // Get the appropriate style for the selected variant
  const style = variantStyles[variant] || variantStyles.primary;
  
  // Add hover effects using Tailwind classes
  const hoverClasses = {
    primary: 'hover:bg-gray-600 shadow-md hover:shadow-lg',
    secondary: 'hover:bg-[#E68FA3] shadow-sm hover:shadow-md',
    outline: 'hover:text-[#F5F5F5] hover:bg-[#A35D3A]',
    link: 'hover:text-[#C39074] underline-offset-4 hover:underline'
  };
  
  return (
    <button
      className={`${baseClasses} ${hoverClasses[variant] || ''} ${className}`}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
};