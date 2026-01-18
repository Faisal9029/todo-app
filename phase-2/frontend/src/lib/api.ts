// frontend/src/lib/api.ts

import { Task, TaskListResponse } from '../types';
import { authClient } from './auth';
import { api } from './apiHelper';

interface RequestOptions extends RequestInit {
  retries?: number;
}

class ApiClient {
  /**
   * Core request handler
   */
  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const retries = options.retries ?? 1;
    const url = api(endpoint);

    const config: RequestOptions = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    };

    // Attach JWT if present
    const token = authClient.getToken();
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    let lastError: unknown;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const response = await fetch(url, config);

        // 🔐 Unauthorized
        if (response.status === 401) {
          authClient.removeToken();
          window.location.href = '/login';
          throw new Error('Unauthorized – session expired');
        }

        // 🚫 Not Found
        if (response.status === 404) {
          throw new Error(`API endpoint not found: ${url}`);
        }

        // ❌ Other HTTP errors
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.detail || `HTTP ${response.status} – ${url}`
          );
        }

        // 🗑️ No content
        if (response.status === 204) {
          return {} as T;
        }

        return (await response.json()) as T;
      } catch (error) {
        lastError = error;

        const isNetworkError =
          error instanceof TypeError ||
          (error instanceof Error && error.message.includes('fetch'));

        if (attempt < retries && isNetworkError) {
          // ⏳ exponential backoff
          await new Promise(res =>
            setTimeout(res, Math.pow(2, attempt) * 1000)
          );
          continue;
        }

        throw error;
      }
    }

    throw lastError;
  }

  /* =======================
     TASK ENDPOINTS
     ======================= */

  async getTasks(userId: string): Promise<Task[]> {
    const res = await this.request<TaskListResponse>(
      `api/${userId}/tasks`
    );
    return res.tasks ?? [];
  }

  async createTask(
    userId: string,
    taskData: Omit<Task, 'id' | 'user_id' | 'created_at' | 'updated_at'>
  ): Promise<Task> {
    return this.request<Task>(`api/${userId}/tasks`, {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  }

  async getTask(userId: string, taskId: number): Promise<Task> {
    return this.request<Task>(`api/${userId}/tasks/${taskId}`);
  }

  async updateTask(
    userId: string,
    taskId: number,
    taskData: Partial<Task>
  ): Promise<Task> {
    return this.request<Task>(`api/${userId}/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    });
  }

  async deleteTask(userId: string, taskId: number): Promise<void> {
    await this.request<void>(`api/${userId}/tasks/${taskId}`, {
      method: 'DELETE',
    });
  }

  async toggleTaskCompletion(
    userId: string,
    taskId: number,
    completed: boolean
  ): Promise<Task> {
    return this.request<Task>(
      `api/${userId}/tasks/${taskId}/complete?completed=${completed}`,
      { method: 'PATCH' }
    );
  }

  /* =======================
     UI / PREFERENCES
     ======================= */

  async getThemePreferences(userId: string): Promise<any> {
    return this.request(`api/${userId}/theme`);
  }

  async updateThemePreferences(
    userId: string,
    data: any
  ): Promise<any> {
    return this.request(`api/${userId}/theme`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async getUIPreferences(userId: string): Promise<any> {
    return this.request(`api/${userId}/ui-preferences`);
  }

  async updateUIPreferences(
    userId: string,
    data: any
  ): Promise<any> {
    return this.request(`api/${userId}/ui-preferences`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }
}

export const apiClient = new ApiClient();
