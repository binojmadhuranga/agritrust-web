export interface AuthState {
  user: User | null;
  token: string | null;
  tokenExpiry: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export interface User {
  email: string;
  fullName?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  role: string;
}
