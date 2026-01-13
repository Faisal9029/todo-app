'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import Layout from '../../components/Layout';
import TaskList from '../../components/TaskList';
import AddTaskInput from '../../components/AddTaskInput';
import TaskForm from '../../components/TaskForm';
import { Task } from '../../types';
import { apiClient } from '../../lib/api';
import { authClient } from '../../lib/auth';

const DashboardPage: React.FC = () => {
  const { theme } = useTheme();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null); // Track task being edited

  // Get current user - only after client-side mount
  const [userId, setUserId] = useState<string | null | undefined>(undefined); // undefined = not determined yet, null = no user

  useEffect(() => {
    setIsClient(true);
    const currentUser = authClient.getCurrentUser();
    setUserId(currentUser?.id || null);
  }, []);

  useEffect(() => {
    if (!userId) {
      if (userId === null) { // Only set error if we've determined there's no user
        setError('User not authenticated');
      }
      setLoading(false);
      return;
    }

    const fetchTasks = async () => {
      try {
        setLoading(true);
        const tasksData = await apiClient.getTasks(userId);
        setTasks(tasksData);
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
      // In a real app, you might want to show a user-friendly error message
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
      // Revert optimistic update if needed
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  // Function to save edited task
  const handleSaveEditedTask = async (taskData: Omit<Task, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!userId || !editingTask) return;

    try {
      // Prepare the update data - only include fields that have changed
      const updateData: Partial<Task> = {
        title: taskData.title,
        description: taskData.description,
        priority: taskData.priority,
        updated_at: new Date().toISOString()
      };

      const updatedTask = await apiClient.updateTask(userId, editingTask.id, updateData);

      // Update the task in the list
      setTasks(prev =>
        prev.map(t =>
          t.id === updatedTask.id ? updatedTask : t
        )
      );

      // Close the edit form
      setEditingTask(null);
    } catch (err) {
      console.error('Error saving edited task:', err);
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

  // Function to cancel editing
  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  // Show loading state during initial client-side render
  if (!isClient) {
    return (
      <Layout>
        <div className="p-6">
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <span className="ml-3 text-zinc-600 dark:text-zinc-400">Loading...</span>
          </div>
        </div>
      </Layout>
    );
  }

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
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Today</h1>
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

            {/* Task Form for editing - shown when editingTask is not null */}
            {editingTask && (
              <div className="mb-6 linear-card p-4">
                <h3 className="text-lg font-medium mb-3">Edit Task</h3>
                <TaskForm
                  userId={userId!}
                  initialTask={editingTask}
                  isEditing={true}
                  onSubmit={handleSaveEditedTask}
                  onCancel={handleCancelEdit}
                />
              </div>
            )}

            {/* Task List */}
            <TaskList
              tasks={tasks.filter(task => !task.completed)}
              loading={loading}
              onToggleComplete={handleToggleComplete}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />

            {/* Completed Tasks Section */}
            {tasks.some(task => task.completed) && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-zinc-700 dark:text-zinc-300 mb-3">Completed</h2>
                <TaskList
                  tasks={tasks.filter(task => task.completed)}
                  loading={loading}
                  onToggleComplete={handleToggleComplete}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                />
              </div>
            )}

            {/* Empty State */}
            {tasks.length === 0 && !loading && (
              <div className="text-center py-12">
                <div className="mx-auto h-24 w-24 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-1">No tasks yet</h3>
                <p className="text-zinc-500 dark:text-zinc-400">Get started by adding a new task above.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default DashboardPage;