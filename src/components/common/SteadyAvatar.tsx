import React from 'react';

interface SteadyAvatarProps {
  char: string;
  bg?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'squircle';
  className?: string;
}

export const SteadyAvatar: React.FC<SteadyAvatarProps> = ({
  char,
  bg = '#1E3A8A', // 默认经典深藏青
  size = 'md',
  shape = 'circle',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-11 h-11 text-sm font-semibold',
    lg: 'w-14 h-14 text-base font-bold',
    xl: 'w-18 h-18 text-xl font-bold',
  }[size];

  const roundedClass = shape === 'circle' ? 'rounded-full' : 'rounded-[18px]';

  // Display only first 1 or 2 characters
  const displayChar = char.slice(0, 1);

  return (
    <div
      className={`inline-flex items-center justify-center text-white shrink-0 shadow-xs select-none ring-1 ring-black/5 transition-transform ${sizeClasses} ${roundedClass} ${className}`}
      style={{ backgroundColor: bg }}
      aria-label={`头像: ${char}`}
    >
      <span className="leading-none tracking-tight">{displayChar}</span>
    </div>
  );
};
