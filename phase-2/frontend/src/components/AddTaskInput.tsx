import React, { useState, KeyboardEvent } from 'react';
import { AddTaskInputProps } from '../types';

const AddTaskInput: React.FC<AddTaskInputProps> = ({ onAddTask, loading = false }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    if (inputValue.trim()) {
      onAddTask({ title: inputValue.trim(), completed: false });
      setInputValue('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a new task..."
        disabled={loading}
        className={`
          w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800
          bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100
          placeholder:text-zinc-500 dark:placeholder:text-zinc-400
          focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
          disabled:opacity-50
        `}
      />
      <button
        onClick={handleSubmit}
        disabled={loading || !inputValue.trim()}
        className={`
          absolute right-2 top-1/2 transform -translate-y-1/2
          px-3 py-1.5 text-sm rounded-md
          bg-indigo-600 hover:bg-indigo-700 text-white
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors duration-200
        `}
      >
        {loading ? (
          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          'Add'
        )}
      </button>
    </div>
  );
};

export default AddTaskInput;