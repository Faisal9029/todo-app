'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '../context/ThemeContext';
import Logo from './Logo';
import NavigationItem from './NavigationItem';
import UserProfile from './UserProfile';
import ThemeToggle from './ThemeToggle';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const pathname = usePathname();
  const { theme } = useTheme();

  // Determine if we're on a dashboard view
  const isDashboardView = pathname?.startsWith('/dashboard');

  return (
    <aside
      className={`
        fixed left-0 top-0 z-30 h-screen flex flex-col
        bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800
        transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-16' : 'w-60'}
        ${theme}
      `}
    >
      {/* Header with Logo */}
      <div className={`flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800 ${isCollapsed ? 'justify-center' : ''}`}>
        {!isCollapsed && <Logo />}
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-zinc-600 dark:text-zinc-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d={isCollapsed
                ? "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                : "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              }
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      {!isCollapsed && (
        <nav className="flex-1 py-4">
          <ul className="space-y-1 px-2">
            <li>
              <NavigationItem
                href="/dashboard"
                label="Today"
                isActive={pathname === '/dashboard' || pathname === '/dashboard/today'}
              />
            </li>
            <li>
              <NavigationItem
                href="/dashboard/upcoming"
                label="Upcoming"
                isActive={pathname === '/dashboard/upcoming'}
              />
            </li>
            <li>
              <NavigationItem
                href="/dashboard/completed"
                label="Completed"
                isActive={pathname === '/dashboard/completed'}
              />
            </li>
          </ul>
        </nav>
      )}

      {/* Collapsed Navigation - Icons only */}
      {isCollapsed && (
        <nav className="flex-1 py-4 flex flex-col items-center space-y-4">
          <Link
            href="/dashboard"
            className={`p-2 rounded-lg transition-colors duration-200 ${
              pathname === '/dashboard' || pathname === '/dashboard/today'
                ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
                : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
            }`}
            title="Today"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 4a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
          </Link>
          <Link
            href="/dashboard/upcoming"
            className={`p-2 rounded-lg transition-colors duration-200 ${
              pathname === '/dashboard/upcoming'
                ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
                : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
            }`}
            title="Upcoming"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 4a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              <path d="M3 11h14v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6z" />
            </svg>
          </Link>
          <Link
            href="/dashboard/completed"
            className={`p-2 rounded-lg transition-colors duration-200 ${
              pathname === '/dashboard/completed'
                ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
                : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
            }`}
            title="Completed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </Link>
        </nav>
      )}

      {/* Footer with User Profile and Theme Toggle */}
      <div className={`p-3 border-t border-zinc-200 dark:border-zinc-800 ${isCollapsed ? 'flex justify-center' : 'flex items-center justify-between'}`}>
        {!isCollapsed ? (
          <>
            <UserProfile />
            <ThemeToggle size="sm" />
          </>
        ) : (
          <ThemeToggle size="sm" />
        )}
      </div>
    </aside>
  );
};

export default Sidebar;