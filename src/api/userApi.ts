/**
 * User API Service
 * Handles profile and booking HTTP calls — all routes are protected (need JWT)
 */

import { Booking, User } from '../types';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// ─── Helper: build auth headers ──────────────────────────────────────────────

const authHeaders = (token: string) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
});

// ─── Get Profile ──────────────────────────────────────────────────────────────

export const fetchProfileApi = async (token: string): Promise<{ success: boolean; user: User }> => {
  const response = await fetch(`${BASE_URL}/user/profile`, {
    headers: authHeaders(token),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to fetch profile');
  return data;
};

// ─── Update Profile ───────────────────────────────────────────────────────────

export const updateProfileApi = async (
  token: string,
  payload: Partial<User>
): Promise<{ success: boolean; user: User }> => {
  const response = await fetch(`${BASE_URL}/user/profile`, {
    method: 'PUT',
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to update profile');
  return data;
};

// ─── Get Bookings ─────────────────────────────────────────────────────────────

export const fetchBookingsApi = async (
  token: string
): Promise<{ success: boolean; count: number; bookings: Booking[] }> => {
  const response = await fetch(`${BASE_URL}/user/bookings`, {
    headers: authHeaders(token),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to fetch bookings');
  return data;
};

// ─── Create Booking ───────────────────────────────────────────────────────────

export const createBookingApi = async (
  token: string,
  payload: { destinationId: string; date: string; guests?: number; notes?: string }
): Promise<{ success: boolean; booking: Booking }> => {
  const response = await fetch(`${BASE_URL}/user/bookings`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to create booking');
  return data;
};

// ─── Cancel Booking ───────────────────────────────────────────────────────────

export const cancelBookingApi = async (
  token: string,
  bookingId: string
): Promise<{ success: boolean; booking: Booking }> => {
  const response = await fetch(`${BASE_URL}/user/bookings/${bookingId}/cancel`, {
    method: 'PUT',
    headers: authHeaders(token),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to cancel booking');
  return data;
};
