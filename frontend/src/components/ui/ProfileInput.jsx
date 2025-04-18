import React from 'react';

export const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={`
        flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 
        text-sm text-gray-900 placeholder:text-gray-500 
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
        ${className || ''}
      `}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = 'Input';