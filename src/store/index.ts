/**
 * Redux Store
 * Combines authSlice, destinationSlice, and userSlice
 */

import { configureStore } from '@reduxjs/toolkit';
import authReducer        from './authSlice';
import destinationReducer from './destinationSlice';
import userReducer        from './userSlice';

// Also keep a uiSlice for dark mode / global UI state
import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    darkMode: localStorage.getItem('travelhub_dark') === 'true',
  },
  reducers: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
      localStorage.setItem('travelhub_dark', String(state.darkMode));
    },
  },
});

export const { toggleDarkMode } = uiSlice.actions;

export const store = configureStore({
  reducer: {
    auth:         authReducer,
    destinations: destinationReducer,
    user:         userReducer,
    ui:           uiSlice.reducer,
  },
});

// TypeScript types for useSelector / useDispatch
export type RootState   = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
