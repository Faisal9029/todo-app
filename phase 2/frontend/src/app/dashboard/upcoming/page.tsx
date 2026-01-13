'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import Layout from '../../../components/Layout';
import TaskList from '../../../components/TaskList';
import AddTaskInput from '../../../components/AddTaskInput';
import { Task } from '../../../types';
import { apiClient } from '../../../lib/api';
import { authClient } from '../../../lib/auth';

const UpcomingPage: React.FC = () => {
  const { theme } = useTheme();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Get current user
  const currentUser = authClient.getCurrentUser();
  const userId = currentUser?.id;

  useEffect(() => {
    if (!userId) {
      setError('User not authenticated');
      setLoading(false);
      return;
    }

    const fetchTasks = async () => {
      try {
        setLoading(true);
        const tasksData = await apiClient.getTasks(userId);
        // For "Upcoming" view, we'll show incomplete tasks with due dates
        const upcomingTasks = tasksData.filter(task =>
          !task.completed && task.due_date && new Date(task.due_date) > new Date()
        );
        setTasks(upcomingTasks);
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [userId]);

  const handleAddTask = async (taskData: any) => {
    if (!userId) return;

    try {
      const newTask = await apiClient.createTask(userId, taskData);
      setTasks(prev => [newTask, ...prev]);
    } catch (err) {
      console.error('Error creating task:', err);
    }
  };

  const handleToggleComplete = async (taskId: number, completed: boolean) => {
    if (!userId) return;

    try {
      const updatedTask = await apiClient.toggleTaskCompletion(userId, taskId, completed);
      setTasks(prev =>
        prev.map(task =>
          task.id === taskId ? updatedTask : task
        )
      );
    } catch (err) {
      console.error('Error toggling task completion:', err);
    }
  };

  const handleEditTask = async (task: Task) => {
    if (!userId) return;

    try {
      const updatedTask = await apiClient.updateTask(userId, task.id, task);
      setTasks(prev =>
        prev.map(t =>
          t.id === task.id ? updatedTask : t
        )
      );
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    if (!userId) return;

    try {
      await apiClient.deleteTask(userId, taskId);
      setTasks(prev => prev.filter(task => task.id !== taskId));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  if (error) {
    return (
      <Layout>
        <div className="p-6">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-300">
            Error: {error}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="h-full flex flex-col">
        {/* Page Header */}
        <header className="border-b border-zinc-200 dark:border-zinc-800 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Upcoming</h1>
            <div className="text-sm text-zinc-500 dark:text-zinc-400">
              {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4">
          <div className="max-w-4xl mx-auto w-full">
            {/* Add Task Input */}
            <div className="mb-6">
              <AddTaskInput onAddTask={handleAddTask} loading={loading} />
            </div>

            {/* Task List */}
            <TaskList
              tasks={tasks}
              loading={loading}
              onToggleComplete={handleToggleComplete}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />

            {/* Empty State */}
            {tasks.length === 0 && !loading && (
              <div className="text-center py-12">
                <div className="mx-auto h-24 w-24 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-1">No upcoming tasks</h3>
                <p className="text-zinc-500 dark:text-zinc-400">All caught up! No upcoming tasks to show.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default UpcomingPage;