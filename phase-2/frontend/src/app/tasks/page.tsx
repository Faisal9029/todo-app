'use client';

import { useState, useEffect } from 'react';
import { Task } from '../../types';
import TaskForm from '../../components/TaskForm';
import TaskItem from '../../components/TaskItem';
import { apiClient } from '../../lib/api';
import ProtectedRoute from '../../components/ProtectedRoute';
import { authClient } from '../../lib/auth';

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Get user ID from token
  const userId = authClient.getCurrentUser()?.id || '';

  // Fetch tasks
  useEffect(() => {
    if (!userId) return;

    const fetchTasks = async () => {
      try {
        setLoading(true);
        const tasksData = await apiClient.getTasks(userId);
        setTasks(tasksData);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to load tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [userId]);

  const handleCreateTask = async (taskData: Omit<Task, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    try {
      if (!userId) return;

      const newTask = await apiClient.createTask(userId, taskData);
      setTasks([...tasks, newTask]);
      setShowForm(false);
    } catch (err: any) {
      setError(err.message || 'Failed to create task');
    }
  };

  const handleUpdateTask = async (taskData: Partial<Task>) => {
    if (!editingTask || !userId) return;

    try {
      const updatedTask = await apiClient.updateTask(userId, editingTask.id, taskData);
      setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
      setEditingTask(null);
    } catch (err: any) {
      setError(err.message || 'Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    if (!userId) return;

    try {
      await apiClient.deleteTask(userId, taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (err: any) {
      setError(err.message || 'Failed to delete task');
    }
  };

  const handleToggleComplete = async (taskId: number, completed: boolean) => {
    if (!userId) return;

    try {
      const updatedTask = await apiClient.toggleTaskCompletion(userId, taskId, completed);
      setTasks(tasks.map(task => task.id === taskId ? updatedTask : task));
    } catch (err: any) {
      setError(err.message || 'Failed to update task');
    }
  };

  const startEditing = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const cancelEditing = () => {
    setEditingTask(null);
    setShowForm(false);
  };

  // Logout function
  const handleLogout = async () => {
    authClient.logout();
    // Redirect to login page
    window.location.href = '/login';
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white">My Tasks</h1>
                  <p className="mt-1 text-indigo-200">Manage your tasks efficiently</p>
                </div>
                <div className="mt-4 sm:mt-0 flex space-x-3">
                  <a
                    href="/dashboard"
                    className="px-4 py-2 text-sm bg-indigo-700 text-white font-medium rounded-lg hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                  >
                    Dashboard
                  </a>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm bg-white text-indigo-600 font-medium rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors duration-200"
                  >
                    Logout
                  </button>
                  <button
                    onClick={() => setShowForm(!showForm)}
                    className="px-4 py-2 text-sm bg-white text-indigo-600 font-medium rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors duration-200"
                  >
                    {showForm ? 'Cancel' : 'Add Task'}
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            {showForm && (
              <TaskForm
                userId={userId}
                onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                onCancel={cancelEditing}
                initialTask={editingTask || undefined}
                isEditing={!!editingTask}
              />
            )}

            {loading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              </div>
            ) : tasks.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No tasks yet. Add a new task to get started!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {tasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggleComplete={handleToggleComplete}
                    onEdit={startEditing}
                    onDelete={handleDeleteTask}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}