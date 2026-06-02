import { api } from "src/shared/api/api";
import type { Hotel } from "src/entities/Hotels/model/hotels.types";

export const getRecommendedHotels = {
  getRecommended: async (limit: number = 12): Promise<Hotel[]> => {
    const response = await api.get<Hotel[]>(
      "/hotels/personalized/suggestions",
      {
        params: { limit },
      },
    );
    return response.data;
  },
};
