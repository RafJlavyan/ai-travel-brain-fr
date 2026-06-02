import { publicApi } from "src/shared/api/api";
import type {
  RegisterFormData,
  AuthResponse,
  AuthTokens,
} from "../model/auth.types";

export const authApi = {
  register: async (
    data: Omit<RegisterFormData, "confirmPassword">
  ): Promise<AuthResponse> => {
    const response = await publicApi.post<AuthResponse>("/auth/register", data);
    return response.data;
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await publicApi.post<AuthResponse>("/auth/login", {
      email,
      password,
    });
    return response.data;
  },

  refresh: async (refreshToken: string): Promise<AuthTokens> => {
    const response = await publicApi.post<AuthTokens>(
      "/auth/refresh",
      {},
      {
        headers: { Authorization: `Bearer ${refreshToken}` },
      }
    );
    return response.data;
  },

  logout: async (accessToken: string): Promise<void> => {
    await publicApi.post(
      "/auth/logout",
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  },
};
