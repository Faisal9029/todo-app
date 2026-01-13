'use client';

import { useState } from 'react';

export default function TestCssPage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Tailwind CSS Test Page</h1>
          <button
            onClick={toggleTheme}
            className={`px-4 py-2 rounded-md ${
              theme === 'dark'
                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            } transition-colors duration-200`}
          >
            Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Test basic Tailwind utilities */}
          <div className="p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Basic Utilities</h2>
            <div className="space-y-2">
              <div className="bg-blue-500 text-white p-3 rounded">Blue Background</div>
              <div className="bg-green-500 text-white p-3 rounded">Green Background</div>
              <div className="bg-purple-500 text-white p-3 rounded">Purple Background</div>
            </div>
          </div>

          {/* Test spacing and sizing */}
          <div className="p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Spacing & Sizing</h2>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-red-500 rounded-lg"></div>
              <div className="w-24 h-24 bg-yellow-500 rounded-xl"></div>
              <div className="w-32 h-32 bg-indigo-500 rounded-2xl"></div>
            </div>
          </div>

          {/* Test typography */}
          <div className="p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Typography</h2>
            <div className="space-y-2">
              <p className="text-xs text-gray-600 dark:text-gray-300">Extra small text (xs)</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Small text (sm)</p>
              <p className="text-base text-gray-600 dark:text-gray-300">Base text (base)</p>
              <p className="text-lg text-gray-600 dark:text-gray-300">Large text (lg)</p>
              <p className="text-xl text-gray-600 dark:text-gray-300">Extra large text (xl)</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">2XL Bold Text</p>
            </div>
          </div>

          {/* Test flex/grid */}
          <div className="p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Flexbox/Grid</h2>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-2 rounded">
                <span>Item 1</span>
                <span>Item 2</span>
              </div>
              <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-2 rounded">
                <span>Item 3</span>
                <span>Item 4</span>
              </div>
            </div>
          </div>

          {/* Test custom components */}
          <div className="p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Custom Components</h2>
            <div className="space-y-3">
              <button className="linear-button">Linear Button</button>
              <button className="linear-button-secondary">Secondary Button</button>
              <div className="linear-card p-4">
                <p className="text-sm">This is a card using linear-card class</p>
              </div>
            </div>
          </div>

          {/* Test dark mode */}
          <div className="p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Dark Mode</h2>
            <div className="space-y-2">
              <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded">
                Gray (changes with theme)
              </div>
              <div className="bg-blue-200 dark:bg-blue-700 p-2 rounded">
                Blue (changes with theme)
              </div>
              <div className="bg-green-200 dark:bg-green-700 p-2 rounded">
                Green (changes with theme)
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Linear-inspired Components</h2>
          <div className="space-y-4">
            <div className="linear-input w-full">
              <input
                type="text"
                placeholder="Linear input style..."
                className="w-full bg-transparent outline-none"
              />
            </div>

            <div className="linear-card p-4">
              <h3 className="font-medium mb-2">Linear Card</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">This is styled with the linear-card class</p>
            </div>

            <div className="flex space-x-3">
              <button className="linear-button">Primary Action</button>
              <button className="linear-button-secondary">Secondary Action</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}