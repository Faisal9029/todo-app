'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import { useTheme } from '../context/ThemeContext';
import { shouldCollapseSidebarByDefault } from '../lib/responsive';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);

  const pathname = usePathname();
  const { theme } = useTheme();

  // Set client state and initialize sidebar state after mount
  useEffect(() => {
    setIsClient(true);
    setIsSidebarCollapsed(shouldCollapseSidebarByDefault());
  }, []);

  // Reset sidebar state when navigating between views
  useEffect(() => {
    if (isClient) {
      setIsSidebarCollapsed(shouldCollapseSidebarByDefault());
    }
  }, [pathname, isClient]);

  // Listen for window resize to adjust sidebar state on mobile
  useEffect(() => {
    if (!isClient) return;

    const handleResize = () => {
      setIsSidebarCollapsed(shouldCollapseSidebarByDefault());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isClient]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className={`flex h-screen bg-white dark:bg-zinc-900 transition-colors duration-200 ${theme}`}>
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isClient ? isSidebarCollapsed : true} // Default to collapsed during SSR
        onToggle={toggleSidebar}
      />

      {/* Main Content */}
      <main
        className={`flex-1 overflow-auto transition-all duration-300 ease-in-out ${
          isClient && !isSidebarCollapsed ? 'ml-60' : 'ml-16'
        }`}
      >
        <div className="h-full">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;