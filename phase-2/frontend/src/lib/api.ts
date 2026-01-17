// frontend/src/lib/api.ts
import { Task, TaskListResponse, ApiResponse, TokenResponse } from '../types';
import { authClient } from './auth'; // Our auth client
import { joinUrl } from '../utils/url';

interface RequestOptions extends RequestInit {
  retries?: number;
}

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
  }

  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    // Default to 1 retry for network failures
    const retries = options.retries ?? 1;

    // Use new URL construction method to prevent double slashes
    const url = new URL(endpoint, this.baseUrl).toString();

    const config: RequestOptions = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add JWT token to headers if available
    const token = authClient.getToken();
    if (token) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${token}`,
      };
    }

    let lastError: Error | null = null;

    // Retry mechanism for network failures
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const response = await fetch(url, config);

        // Handle different status codes
        if (response.status === 401) {
          // Token might be expired, redirect to login
          authClient.removeToken();
          window.location.href = '/login';
          throw new Error('Unauthorized. Please log in again.');
        }

        if (response.status === 404) {
          throw new Error(`API endpoint not found. Please check the URL: ${url}`);
        }

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.detail || `HTTP error! status: ${response.status} - ${url}`);
        }

        // Some endpoints (like DELETE) may not return JSON
        if (response.status === 204) {
          return {} as T;
        }

        return await response.json();
      } catch (error) {
        lastError = error as Error;

        // Type guard to check if error is an Error object
        const isErrorObject = error instanceof Object && 'message' in error;
        const errorMessage = isErrorObject ? (error as Error).message : String(error);

        // Only retry on network errors, not HTTP errors
        if (attempt < retries && (error instanceof TypeError || errorMessage.includes('fetch'))) {
          // Exponential backoff: wait 1s, 2s, 4s, etc.
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
          continue;
        }

        // If it's not a network error or we've exhausted retries, rethrow
        throw error;
      }
    }

    // This should never be reached, but TypeScript requires it
    throw lastError!;
  }

  // Task endpoints - these need to include the user ID in the path as expected by the backend
  async getTasks(userId: string): Promise<Task[]> {
    const response = await this.request<TaskListResponse>(`/api/${userId}/tasks`);
    // Backend returns { tasks: Task[], total: number }, extract the tasks array
    return response.tasks || [];
  }

  async createTask(userId: string, taskData: Omit<Task, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<Task> {
    return this.request(`/api/${userId}/tasks`, {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  }

  async getTask(userId: string, taskId: number): Promise<Task> {
    return this.request(`/api/${userId}/tasks/${taskId}`);
  }

  async updateTask(userId: string, taskId: number, taskData: Partial<Task>): Promise<Task> {
    return this.request(`/api/${userId}/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    });
  }

  async deleteTask(userId: string, taskId: number): Promise<void> {
    await this.request(`/api/${userId}/tasks/${taskId}`, {
      method: 'DELETE',
    });
    // DELETE returns a success message, not a Task object
    return;
  }

  async toggleTaskCompletion(userId: string, taskId: number, completed: boolean): Promise<Task> {
    return this.request(`/api/${userId}/tasks/${taskId}/complete?completed=${completed}`, {
      method: 'PATCH',
    });
  }

  // Additional endpoints for the Linear-inspired UI
  async getThemePreferences(userId: string): Promise<any> {
    return this.request(`/api/${userId}/theme`);
  }

  async updateThemePreferences(userId: string, themeData: any): Promise<any> {
    return this.request(`/api/${userId}/theme`, {
      method: 'PUT',
      body: JSON.stringify(themeData),
    });
  }

  async getUIPreferences(userId: string): Promise<any> {
    return this.request(`/api/${userId}/ui-preferences`);
  }

  async updateUIPreferences(userId: string, preferences: any): Promise<any> {
    return this.request(`/api/${userId}/ui-preferences`, {
      method: 'PUT',
      body: JSON.stringify(preferences),
    });
  }
}

export const apiClient = new ApiClient();