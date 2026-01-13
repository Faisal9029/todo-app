// frontend/src/types/index.ts

// Task-related types
export interface Task {
  id: number;
  user_id: string;
  title: string;
  description?: string | null;
  completed: boolean;
  due_date?: string | null; // ISO 8600 format
  priority: 'low' | 'medium' | 'high';
  created_at: string; // ISO 8601 format
  updated_at: string; // ISO 8601 format
  display_options?: {
    show_due_date?: boolean;
    show_priority_badge?: boolean;
  };
}

export interface TaskFormData {
  title: string;
  description?: string;
  completed?: boolean;
  due_date?: string;
  priority?: 'low' | 'medium' | 'high';
}

export interface TaskListResponse {
  tasks: Task[];
  total: number;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

// User-related types
export interface User {
  id: string;
  username: string;
  email: string;
  created_at: string; // ISO 8601 format
  updated_at: string; // ISO 8601 format
}

// Theme-related types
export type ThemeType = 'light' | 'dark';

export interface ThemePreferences {
  theme_type: ThemeType;
  primary_color?: string;
  secondary_color?: string;
  background_color?: string;
  text_color?: string;
  updated_at: string;
}

export interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
  setTheme: (theme: ThemeType) => void;
}

// Navigation-related types
export type ViewType = 'today' | 'upcoming' | 'completed';

export interface NavigationState {
  view_type: ViewType;
  filter_active: boolean;
  sort_order: 'asc' | 'desc' | 'priority';
}

// UI state types
export interface TaskDisplayConfig {
  show_due_date: boolean;
  show_priority_badge: boolean;
  compact_view: boolean;
  group_by_date: boolean;
}

export interface SidebarState {
  collapsed: boolean;
  expanded_width: number;
  collapsed_width: number;
}

export interface TaskInteractionState {
  hovered_task_id: number | null;
  editing_task_id: number | null;
  show_actions: boolean;
}

// API response types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

// Component props types
export interface TaskItemProps {
  task: Task;
  onToggleComplete: (taskId: number, completed: boolean) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
}

export interface TaskListProps {
  tasks: Task[];
  loading?: boolean;
  onToggleComplete: (taskId: number, completed: boolean) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
}

export interface AddTaskInputProps {
  onAddTask: (taskData: TaskFormData) => void;
  loading?: boolean;
}

export interface NavigationItemProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

export interface ThemeToggleProps {
  size?: 'sm' | 'md' | 'lg';
}