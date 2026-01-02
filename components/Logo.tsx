
import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => {
  return (
    <div className={`relative flex items-center justify-center rounded-full bg-blue-600 shadow-lg ${className}`}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-2/3 h-2/3 text-white" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
      <div className="absolute inset-0 border-2 border-white/20 rounded-full animate-pulse"></div>
    </div>
  );
};

export default Logo;
