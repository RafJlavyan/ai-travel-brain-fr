import axios from "axios";
import type { RegisterFormData, AuthResponse } from "../model/auth.types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
});

export const authApi = {
  register: async (
    data: Omit<RegisterFormData, "confirmPassword">
  ): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/register", data);
    return response.data;
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/login", {
      email,
      password,
    });
    return response.data;
  },

  refresh: async (refreshToken: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(
      "/auth/refresh",
      {},
      {
        headers: { Authorization: `Bearer ${refreshToken}` },
      }
    );
    return response.data;
  },

  logout: async (accessToken: string): Promise<void> => {
    await api.post(
      "/auth/logout",
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  },
};
