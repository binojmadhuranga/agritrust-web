export interface AuthState {
  user: User | null;
  token: string | null;
  tokenExpiry: string | null;
  role: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export interface User {
  email: string;
  fullName?: string;
  role?: string;
}
