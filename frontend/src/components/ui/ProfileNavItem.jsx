import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from './Button';

export const ProfileNavItem = ({ 
  icon, 
  label, 
  onClick, 
  active = false,
  variant = 'default'
}) => {
  let className = 'flex items-center w-full p-3 rounded-md text-left';
  
  if (variant === 'danger') {
    className += ' !text-red-600 hover:bg-red-50';
  } else {
    className += active 
      ? ' !bg-blue-50 !text-blue-700' 
      : ' !text-black !hover:bg-gray-50';
  }
  
  return (
    <Button variant="link" onClick={onClick} className={className}>
      {icon}
      <span>{label}</span>
      {variant !== 'danger' && <ChevronRight className="ml-auto h-4 w-4" />}
    </Button>
  );
};