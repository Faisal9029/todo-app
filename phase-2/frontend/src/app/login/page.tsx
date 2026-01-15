'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '../../lib/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Use backend API for login
      const response = await authClient.login({ email, password });
      authClient.setToken(response.access_token);

      // Redirect to dashboard after successful login
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto h-12 w-12 rounded-lg bg-indigo-600 flex items-center justify-center mb-4">
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Welcome back</h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Sign in to your account to continue
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
              <div className="flex">
                <div className="flex-shrink-0 pt-0.5">
                  <svg className="h-5 w-5 text-red-500 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="linear-input w-full"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Password
                </label>
                <a href="#" className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="linear-input w-full"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-zinc-300 dark:border-zinc-700 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-zinc-700 dark:text-zinc-300">
                Remember me
              </label>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="linear-button w-full"
            >
              Sign in
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
          <p>
            Don't have an account?{' '}
            <a
              href="/signup"
              className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}