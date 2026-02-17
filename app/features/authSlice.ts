import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from './authTypes';
import { loginUser, registerUser, logoutUser } from './authThunks';
import { authService } from '../services/authService';

const initialState: AuthState = {
  user: null,
  token: typeof window !== 'undefined' ? authService.getToken() : null,
  tokenExpiry: typeof window !== 'undefined' ? localStorage.getItem('tokenExpiry') : null,
  isLoading: false,
  error: null,
  isAuthenticated: typeof window !== 'undefined' ? authService.isAuthenticated() : false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<{ email: string; fullName?: string }>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload.token;
      state.tokenExpiry = action.payload.expiresAt;
      state.isAuthenticated = true;
      state.error = null;
      
      // Extract user info from token or set basic info
      state.user = {
        email: '', // You can decode JWT token to get email
      };
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
      state.isAuthenticated = false;
    });

    // Register
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Logout
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.token = null;
      state.tokenExpiry = null;
      state.isAuthenticated = false;
      state.error = null;
    });
  },
});

export const { clearError, setUser } = authSlice.actions;
export default authSlice.reducer;
