import React from 'react';
import Link from 'next/link';
import { NavigationItemProps } from '../types';

const NavigationItem: React.FC<NavigationItemProps> = ({
  href,
  label,
  icon,
  isActive = false,
  onClick
}) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200
        ${isActive
          ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
          : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
        }
      `}
    >
      {icon && <span>{icon}</span>}
      <span className="font-medium">{label}</span>
    </Link>
  );
};

export default NavigationItem;