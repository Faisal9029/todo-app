import React, { useState, useEffect } from 'react';
import { authClient } from '../lib/auth';

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setUser(authClient.getCurrentUser());
    setMounted(true);
  }, []);

  // Show nothing during SSR or until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200">
        <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-zinc-600 dark:text-zinc-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </div>
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 truncate max-w-[100px]">
          Loading...
        </span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200">
        <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-zinc-600 dark:text-zinc-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </div>
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 truncate max-w-[100px]">
          Guest
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200">
      <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
        <span className="text-xs font-semibold text-white">
          {user.username.charAt(0).toUpperCase()}
        </span>
      </div>
      <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 truncate max-w-[100px]">
        {user.username}
      </span>
    </div>
  );
};

export default UserProfile;