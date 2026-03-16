/**
 * Auth API Service
 * Handles all authentication-related HTTP calls to the backend
 */

const BASE_URL = import.meta.env.VITE_API_URL as string;

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    createdAt?: string;
  };
}

// ─── Register ─────────────────────────────────────────────────────────────────

export const registerApi = async (payload: RegisterPayload): Promise<AuthResponse> => {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Registration failed');
  }

  return data;
};

// ─── Login ────────────────────────────────────────────────────────────────────

export const loginApi = async (payload: LoginPayload): Promise<AuthResponse> => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }

  return data;
};
