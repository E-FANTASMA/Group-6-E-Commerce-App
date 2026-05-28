import { apiRequest } from "./http";

const TOKEN_STORAGE_KEY = "auth_token";

export function getAuthToken() {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function setAuthToken(token: string) {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
}

export function clearAuthToken() {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
}

type AuthResponse = {
  success: boolean;
  message?: string;
  token?: string | null; // sometimes top-level
  data?: { token?: string } & Record<string, unknown>;
};

export async function signup(payload: {
  fullName: string;
  email: string;
  password: string;
  phoneNumber?: string;
}) {
  return apiRequest<AuthResponse>("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({
      fullName: payload.fullName,
      email: payload.email,
      password: payload.password,
      confirmPassword: payload.password,
      phoneNumber: payload.phoneNumber,
    }),
  });
}

export async function login(payload: { email: string; password: string }) {
  return apiRequest<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function extractToken(response: AuthResponse) {
  return response.token || response.data?.token || null;
}
