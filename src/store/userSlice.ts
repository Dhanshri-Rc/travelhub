/**
 * userSlice — Redux Toolkit slice for user profile and bookings
 * Manages: profile data, bookings list, loading, error
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Booking, User } from '../types';
import { fetchProfileApi, updateProfileApi, fetchBookingsApi, cancelBookingApi } from '../api/userApi';
import { setUser } from './authSlice';

// ─── State Interface ──────────────────────────────────────────────────────────

interface UserState {
  profile:  User | null;
  bookings: Booking[];
  loadingProfile:  boolean;
  loadingBookings: boolean;
  updatingProfile: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile:         null,
  bookings:        [],
  loadingProfile:  false,
  loadingBookings: false,
  updatingProfile: false,
  error:           null,
};

// ─── Async Thunks ─────────────────────────────────────────────────────────────

export const fetchProfile = createAsyncThunk(
  'user/fetchProfile',
  async (token: string, { rejectWithValue }) => {
    try {
      const data = await fetchProfileApi(token);
      return data.user;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch profile';
      return rejectWithValue(message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (
    { token, payload }: { token: string; payload: Partial<User> },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const data = await updateProfileApi(token, payload);
      // Also update the user in authSlice so the header/nav updates immediately
      dispatch(setUser(data.user));
      return data.user;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to update profile';
      return rejectWithValue(message);
    }
  }
);

export const fetchBookings = createAsyncThunk(
  'user/fetchBookings',
  async (token: string, { rejectWithValue }) => {
    try {
      const data = await fetchBookingsApi(token);
      return data.bookings;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch bookings';
      return rejectWithValue(message);
    }
  }
);

export const cancelBooking = createAsyncThunk(
  'user/cancelBooking',
  async ({ token, bookingId }: { token: string; bookingId: string }, { rejectWithValue }) => {
    try {
      const data = await cancelBookingApi(token, bookingId);
      return data.booking;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to cancel booking';
      return rejectWithValue(message);
    }
  }
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserError(state) {
      state.error = null;
    },
    resetUserState(state) {
      state.profile  = null;
      state.bookings = [];
      state.error    = null;
    },
  },
  extraReducers: (builder) => {
    // ── fetchProfile ──
    builder
      .addCase(fetchProfile.pending,  (state) => { state.loadingProfile = true;  state.error = null; })
      .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<User>) => {
        state.loadingProfile = false;
        state.profile        = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loadingProfile = false;
        state.error          = action.payload as string;
      });

    // ── updateProfile ──
    builder
      .addCase(updateProfile.pending,  (state) => { state.updatingProfile = true;  state.error = null; })
      .addCase(updateProfile.fulfilled, (state, action: PayloadAction<User>) => {
        state.updatingProfile = false;
        state.profile         = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.updatingProfile = false;
        state.error           = action.payload as string;
      });

    // ── fetchBookings ──
    builder
      .addCase(fetchBookings.pending,  (state) => { state.loadingBookings = true;  state.error = null; })
      .addCase(fetchBookings.fulfilled, (state, action: PayloadAction<Booking[]>) => {
        state.loadingBookings = false;
        state.bookings        = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loadingBookings = false;
        state.error           = action.payload as string;
      });

    // ── cancelBooking ──
    builder
      .addCase(cancelBooking.fulfilled, (state, action: PayloadAction<Booking>) => {
        const id = action.payload._id;
        const idx = state.bookings.findIndex((b) => b._id === id);
        if (idx !== -1) state.bookings[idx] = action.payload;
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { clearUserError, resetUserState } = userSlice.actions;
export default userSlice.reducer;
