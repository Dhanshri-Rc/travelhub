/**
 * authSlice — Redux Toolkit slice for authentication state
 * Manages: user, token, isAuthenticated, loading, error
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '../types';
import { loginApi, registerApi } from '../api/authApi';

// ─── Initial State ────────────────────────────────────────────────────────────

// Rehydrate from localStorage on app start
const storedToken = localStorage.getItem('travelhub_token');
const storedUser  = localStorage.getItem('travelhub_user');

const initialState: AuthState = {
  user:            storedUser  ? JSON.parse(storedUser)  : null,
  token:           storedToken || null,
  isAuthenticated: !!storedToken,
  loading:         false,
  error:           null,
};

// ─── Async Thunks ─────────────────────────────────────────────────────────────

export const loginUser = createAsyncThunk(
  'auth/login',
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const data = await loginApi(payload);
      // Persist token + user to localStorage
      localStorage.setItem('travelhub_token', data.token);
      localStorage.setItem('travelhub_user',  JSON.stringify(data.user));
      return data;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Login failed';
      return rejectWithValue(message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (payload: { name: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const data = await registerApi(payload);
      localStorage.setItem('travelhub_token', data.token);
      localStorage.setItem('travelhub_user',  JSON.stringify(data.user));
      return data;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      return rejectWithValue(message);
    }
  }
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Synchronous logout — clears Redux state and localStorage
    logout(state) {
      state.user            = null;
      state.token           = null;
      state.isAuthenticated = false;
      state.error           = null;
      localStorage.removeItem('travelhub_token');
      localStorage.removeItem('travelhub_user');
    },
    // Clear any auth error (e.g., when user navigates away from login)
    clearAuthError(state) {
      state.error = null;
    },
    // Update user in state (e.g., after profile update)
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      localStorage.setItem('travelhub_user', JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    // ── Login ──
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error   = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading         = false;
        state.isAuthenticated = true;
        state.user            = action.payload.user as User;
        state.token           = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload as string;
      });

    // ── Register ──
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error   = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading         = false;
        state.isAuthenticated = true;
        state.user            = action.payload.user as User;
        state.token           = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload as string;
      });
  },
});

export const { logout, clearAuthError, setUser } = authSlice.actions;
export default authSlice.reducer;
