import React from 'react';

const Notification = ({ show, message, type = 'success' }) => {
  if (!show) return null;

  const isError = type === 'error';

  return (
    <div
      className={`fixed top-20 left-1/2 transform -translate-x-1/2 
                  ${isError ? 'bg-white text-red-600 border-red-200' : 'bg-white text-green-600 border-green-200'}
                  border shadow-lg rounded-md p-4 z-50 flex items-center`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 mr-2"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        {isError ? (
          // Error "X" path
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        ) : (
          // Default success checkmark path
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 11.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        )}
      </svg>
      {message}
    </div>
  );
};

export default Notification;
