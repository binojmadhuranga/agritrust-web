import axiosInstance from './axiosConfig';

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  role: string;
}

export interface RegisterResponse {
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  role: string;
  expiresAt: string;
}

export const authService = {
  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    console.log('Attempting registration with data:', data);
    console.log('API URL:', axiosInstance.defaults.baseURL + '/auth/register');
    try {
      const response = await axiosInstance.post<RegisterResponse>('/auth/register', data);
      console.log('Registration successful:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('authService.register error:', error);
      throw error;
    }
  },

  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await axiosInstance.post<LoginResponse>('/auth/login', data);
    
    // Store token, role and expiry in localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('tokenExpiry', response.data.expiresAt);
      localStorage.setItem('role', response.data.role);
    }
    
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiry');
    localStorage.removeItem('role');
  },

  getToken: (): string | null => {
    return localStorage.getItem('token');
  },

  getRole: (): string | null => {
    return localStorage.getItem('role');
  },

  isAuthenticated: (): boolean => {
    const token = localStorage.getItem('token');
    const expiry = localStorage.getItem('tokenExpiry');
    
    if (!token || !expiry) return false;
    
    // Check if token is expired
    return new Date(expiry) > new Date();
  },
};
