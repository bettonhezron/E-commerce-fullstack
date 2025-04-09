import api from './index';

// Types for authentication
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phoneNumber: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    phoneNumber: string;
    roles: string[];
  };
}

// Authentication API calls
export const login = (credentials: LoginCredentials) => 
  api.post<AuthResponse>('/auth/login', credentials);

export const register = (userData: RegisterData) => 
  api.post<AuthResponse>('/auth/register', userData);

export const getCurrentUser = () => 
  api.get<AuthResponse['user']>('/auth/me');

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Helper functions for auth state
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token');
};

export const getUser = (): AuthResponse['user'] | null => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch (e) {
    return null;
  }
};

export const setAuthData = (data: AuthResponse) => {
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));
};