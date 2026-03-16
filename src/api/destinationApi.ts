/**
 * Destination API Service
 * Handles all destination-related HTTP calls to the backend
 */

import { Destination } from '../types';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface DestinationsResponse {
  success: boolean;
  count: number;
  destinations: Destination[];
}

interface DestinationResponse {
  success: boolean;
  destination: Destination;
}

interface FetchFilters {
  category?: string;
  search?: string;
  womenFriendly?: boolean;
  minPrice?: number | null;
  maxPrice?: number | null;
  sort?: string;
}

// ─── Get All Destinations (with optional filters) ─────────────────────────────

export const fetchDestinationsApi = async (filters: FetchFilters = {}): Promise<DestinationsResponse> => {
  const params = new URLSearchParams();

  if (filters.category && filters.category !== 'all') params.append('category', filters.category);
  if (filters.search)       params.append('search',       filters.search);
  if (filters.womenFriendly) params.append('womenFriendly', 'true');
  if (filters.minPrice != null) params.append('minPrice', String(filters.minPrice));
  if (filters.maxPrice != null) params.append('maxPrice', String(filters.maxPrice));
  if (filters.sort)         params.append('sort',         filters.sort);

  const url = `${BASE_URL}/destinations${params.toString() ? '?' + params.toString() : ''}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) throw new Error(data.message || 'Failed to fetch destinations');
  return data;
};

// ─── Get Single Destination ───────────────────────────────────────────────────

export const fetchDestinationByIdApi = async (id: string): Promise<DestinationResponse> => {
  const response = await fetch(`${BASE_URL}/destinations/${id}`);
  const data = await response.json();

  if (!response.ok) throw new Error(data.message || 'Failed to fetch destination');
  return data;
};

// ─── Create Destination ───────────────────────────────────────────────────────

export const createDestinationApi = async (
  payload: Partial<Destination>
): Promise<DestinationResponse> => {
  const response = await fetch(`${BASE_URL}/destinations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to create destination');
  return data;
};
