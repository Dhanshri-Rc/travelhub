/**
 * destinationSlice — Redux Toolkit slice for destinations state
 * Manages: destinations list, featured subsets, filters, loading, error
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Destination, DestinationState } from '../types';
import { fetchDestinationsApi, fetchDestinationByIdApi } from '../api/destinationApi';

// ─── Initial State ────────────────────────────────────────────────────────────

const initialState: DestinationState = {
  destinations:         [],
  featuredHotels:       [],
  featuredRestaurants:  [],
  featuredAttractions:  [],
  selectedDestination:  null,
  loading:              false,
  error:                null,
  filters: {
    category:     'all',
    search:       '',
    womenFriendly: false,
    minPrice:     null,
    maxPrice:     null,
    sort:         '',
  },
};

// ─── Async Thunks ─────────────────────────────────────────────────────────────

export const fetchDestinations = createAsyncThunk(
  'destinations/fetchAll',
  async (filters: Partial<DestinationState['filters']> = {}, { rejectWithValue }) => {
    try {
      const data = await fetchDestinationsApi(filters);
      return data.destinations;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch destinations';
      return rejectWithValue(message);
    }
  }
);

export const fetchDestinationById = createAsyncThunk(
  'destinations/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const data = await fetchDestinationByIdApi(id);
      return data.destination;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch destination';
      return rejectWithValue(message);
    }
  }
);

// Fetch featured destinations (3 of each category for the home page)
export const fetchFeaturedDestinations = createAsyncThunk(
  'destinations/fetchFeatured',
  async (_, { rejectWithValue }) => {
    try {
      const [hotelsRes, restaurantsRes, attractionsRes] = await Promise.all([
        fetchDestinationsApi({ category: 'hotel' }),
        fetchDestinationsApi({ category: 'restaurant' }),
        fetchDestinationsApi({ category: 'attraction' }),
      ]);

      return {
        hotels:      hotelsRes.destinations.slice(0, 3),
        restaurants: restaurantsRes.destinations.slice(0, 3),
        attractions: attractionsRes.destinations.slice(0, 3),
      };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch featured destinations';
      return rejectWithValue(message);
    }
  }
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const destinationSlice = createSlice({
  name: 'destinations',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Partial<DestinationState['filters']>>) {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters(state) {
      state.filters = initialState.filters;
    },
    clearSelectedDestination(state) {
      state.selectedDestination = null;
    },
    clearDestinationError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // ── fetchDestinations ──
    builder
      .addCase(fetchDestinations.pending, (state) => {
        state.loading = true;
        state.error   = null;
      })
      .addCase(fetchDestinations.fulfilled, (state, action: PayloadAction<Destination[]>) => {
        state.loading      = false;
        state.destinations = action.payload;
      })
      .addCase(fetchDestinations.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload as string;
      });

    // ── fetchDestinationById ──
    builder
      .addCase(fetchDestinationById.pending, (state) => {
        state.loading = true;
        state.error   = null;
      })
      .addCase(fetchDestinationById.fulfilled, (state, action: PayloadAction<Destination>) => {
        state.loading             = false;
        state.selectedDestination = action.payload;
      })
      .addCase(fetchDestinationById.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload as string;
      });

    // ── fetchFeaturedDestinations ──
    builder
      .addCase(fetchFeaturedDestinations.pending, (state) => {
        state.loading = true;
        state.error   = null;
      })
      .addCase(fetchFeaturedDestinations.fulfilled, (state, action) => {
        state.loading             = false;
        state.featuredHotels      = action.payload.hotels;
        state.featuredRestaurants = action.payload.restaurants;
        state.featuredAttractions = action.payload.attractions;
      })
      .addCase(fetchFeaturedDestinations.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload as string;
      });
  },
});

export const { setFilters, clearFilters, clearSelectedDestination, clearDestinationError } =
  destinationSlice.actions;
export default destinationSlice.reducer;
