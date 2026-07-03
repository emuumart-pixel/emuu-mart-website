import React from 'react';

const Badge = ({ type }) => {
  if (!type) return null;

  const badgeStyles = {
    'Sale': 'bg-primary text-white',
    'New': 'bg-success text-white',
    'Hot': 'bg-accent text-white',
    'Best': 'bg-blue-600 text-white',
    'Sold Out': 'bg-gray-800 text-white',
  };

  const style = badgeStyles[type] || 'bg-gray-500 text-white';

  return (
    <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-sm ${style}`}>
      {type}
    </span>
  );
};

export default Badge;
