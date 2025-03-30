import React from 'react';

export const Input = ({ type = 'text', className = '', ...props }) => {
  return (
    <input
      type={type}
      className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary ${className}`}
      {...props}
    />
  );
};
