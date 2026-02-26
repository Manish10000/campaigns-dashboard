'use client';

import React from 'react';

interface SeedrailLogoProps {
  className?: string;
  size?: number;
  mobileSize?: number;
}

export function SeedrailLogo({ className = '', size = 32, mobileSize }: SeedrailLogoProps) {
  const logoSize = mobileSize || size;
  return (
    <div 
      className={`relative ${className}`}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        className="animate-spin hidden sm:block"
        style={{ animationDuration: '3s' }}
      >
        {/* Black background circle */}
        <circle cx="16" cy="16" r="14" fill="#000000" />
        
        {/* 8 rectangular segments - 2 red, 6 grey */}
        {/* Red segments at top and bottom */}
        <rect x="14" y="2" width="4" height="8" fill="#EF4444" rx="1" />
        <rect x="14" y="22" width="4" height="8" fill="#EF4444" rx="1" />
        
        {/* Grey segments */}
        <rect x="22" y="14" width="8" height="4" fill="#D1D5DB" rx="1" />
        <rect x="2" y="14" width="8" height="4" fill="#D1D5DB" rx="1" />
        
        {/* Diagonal segments */}
        <rect x="20" y="6" width="6" height="3" fill="#D1D5DB" rx="1" transform="rotate(45 23 7.5)" />
        <rect x="6" y="6" width="6" height="3" fill="#D1D5DB" rx="1" transform="rotate(-45 9 7.5)" />
        <rect x="20" y="23" width="6" height="3" fill="#D1D5DB" rx="1" transform="rotate(-45 23 24.5)" />
        <rect x="6" y="23" width="6" height="3" fill="#D1D5DB" rx="1" transform="rotate(45 9 24.5)" />
      </svg>
      <svg
        width={logoSize}
        height={logoSize}
        viewBox="0 0 32 32"
        className="animate-spin sm:hidden"
        style={{ animationDuration: '3s' }}
      >
        {/* Black background circle */}
        <circle cx="16" cy="16" r="14" fill="#000000" />
        
        {/* 8 rectangular segments - 2 red, 6 grey */}
        {/* Red segments at top and bottom */}
        <rect x="14" y="2" width="4" height="8" fill="#EF4444" rx="1" />
        <rect x="14" y="22" width="4" height="8" fill="#EF4444" rx="1" />
        
        {/* Grey segments */}
        <rect x="22" y="14" width="8" height="4" fill="#D1D5DB" rx="1" />
        <rect x="2" y="14" width="8" height="4" fill="#D1D5DB" rx="1" />
        
        {/* Diagonal segments */}
        <rect x="20" y="6" width="6" height="3" fill="#D1D5DB" rx="1" transform="rotate(45 23 7.5)" />
        <rect x="6" y="6" width="6" height="3" fill="#D1D5DB" rx="1" transform="rotate(-45 9 7.5)" />
        <rect x="20" y="23" width="6" height="3" fill="#D1D5DB" rx="1" transform="rotate(-45 23 24.5)" />
        <rect x="6" y="23" width="6" height="3" fill="#D1D5DB" rx="1" transform="rotate(45 9 24.5)" />
      </svg>
    </div>
  );
}
