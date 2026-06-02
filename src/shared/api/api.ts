import axios, {
  AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

type RetryRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export const publicApi = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

let refreshPromise: Promise<AuthTokens> | null = null;

const clearAuth = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

const refreshTokens = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    throw new Error("Missing refresh token");
  }

  const response = await publicApi.post<AuthTokens>(
    "/auth/refresh",
    {},
    {
      headers: { Authorization: `Bearer ${refreshToken}` },
    },
  );

  localStorage.setItem("accessToken", response.data.accessToken);
  localStorage.setItem("refreshToken", response.data.refreshToken);

  return response.data;
};

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryRequestConfig | undefined;
    const isAuthRequest = originalRequest?.url?.startsWith("/auth/");

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      isAuthRequest
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      refreshPromise ??= refreshTokens().finally(() => {
        refreshPromise = null;
      });

      const tokens = await refreshPromise;
      originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      clearAuth();

      if (window.location.pathname !== "/login") {
        window.location.assign("/login");
      }

      return Promise.reject(refreshError);
    }
  },
);
