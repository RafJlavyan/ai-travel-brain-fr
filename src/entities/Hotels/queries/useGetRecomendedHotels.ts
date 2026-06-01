import axios from "axios";
import type { Hotel } from "../model/hotels.types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3000",
});

export const getRecommendedHotels = {
  getRecommended: async (limit: number = 12): Promise<Hotel[]> => {
    const token = localStorage.getItem("accessToken");
    const response = await api.get<Hotel[]>(
      "/hotels/personalized/suggestions",
      {
        headers: { Authorization: `Bearer ${token}` },
        params: { limit },
      },
    );
    return response.data;
  },
};
