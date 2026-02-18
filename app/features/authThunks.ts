import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService, LoginRequest, RegisterRequest } from '../services/authService';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Login failed. Please try again.'
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: RegisterRequest, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData);
      return response;
    } catch (error: any) {
      // Log full error details
      console.error('Registration API Error - Full Error:', error);
      console.error('Registration API Error - Error Type:', error?.constructor?.name);
      console.error('Registration API Error - Details:', {
        message: error?.message,
        code: error?.code,
        response: error?.response?.data,
        status: error?.response?.status,
        statusText: error?.response?.statusText,
      });
      
      // Handle different error types
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error?.code === 'ERR_NETWORK') {
        errorMessage = 'Network error. Cannot connect to server. Please check if the backend is running.';
      } else if (error?.response) {
        // Server responded with error
        errorMessage = error.response.data?.message || 
                      error.response.data?.title ||
                      `Server error: ${error.response.status}`;
      } else if (error?.message) {
        errorMessage = error.message;
      }
      
      return rejectWithValue(errorMessage);
    }
  }
);

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  authService.logout();
});
