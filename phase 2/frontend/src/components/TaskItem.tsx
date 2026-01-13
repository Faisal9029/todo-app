'use client';

import React, { useState } from 'react';
import { TaskItemProps } from '../types';

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleComplete,
  onEdit,
  onDelete
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggleComplete = () => {
    onToggleComplete(task.id, !task.completed);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(task.id);
    } catch (error) {
      console.error('Error deleting task:', error);
      setIsDeleting(false);
    }
  };

  return (
    <div
      className={`
        group flex items-center p-3 rounded-lg border border-zinc-200 dark:border-zinc-800
        transition-all duration-200 hover:shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700
        bg-white dark:bg-zinc-900
        ${task.completed ? 'opacity-70 dark:opacity-60' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Checkbox */}
      <button
        onClick={handleToggleComplete}
        className={`
          flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center
          transition-all duration-200 mr-3
          ${task.completed
            ? 'bg-indigo-500 border-indigo-500 text-white'
            : 'border-zinc-300 dark:border-zinc-700 hover:border-indigo-400'
          }
        `}
        aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {task.completed && (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      {/* Task Content */}
      <div className="flex-1 min-w-0">
        <p className={`
          truncate text-sm font-medium
          ${task.completed
            ? 'text-zinc-500 dark:text-zinc-500 line-through'
            : 'text-zinc-900 dark:text-zinc-100'
          }
        `}>
          {task.title}
        </p>
        {task.description && (
          <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate mt-1">
            {task.description}
          </p>
        )}
      </div>

      {/* Due Date and Priority */}
      <div className="flex items-center space-x-2 ml-2">
        {task.due_date && (
          <span className="text-xs text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
            {new Date(task.due_date).toLocaleDateString()}
          </span>
        )}
        {task.priority !== 'medium' && (
          <span className={`
            text-xs px-2 py-0.5 rounded-full
            ${task.priority === 'high'
              ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
            }
          `}>
            {task.priority}
          </span>
        )}
      </div>

      {/* Action Buttons - Only show when hovering or on mobile */}
      {(isHovered || isDeleting) && (
        <div className="flex items-center space-x-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 rounded-md text-zinc-500 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200"
            aria-label="Edit task"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={`
              p-1.5 rounded-md text-zinc-500 hover:text-red-600 dark:text-zinc-400 dark:hover:text-red-400
              hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200
              ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            aria-label="Delete task"
          >
            {isDeleting ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;