import { publicApi } from "src/shared/api/api";

export async function getHotels(config?: {
  signal?: AbortSignal;
  search?: string;
  country?: string;
  location?: string;
  minRating?: number;
  maxPrice?: number;
}) {
  const response = await publicApi.get("/hotels/", {
    params: {
      search: config?.search,
      country: config?.country,
      minRating: config?.minRating,
      maxPrice: config?.maxPrice,
    },
    signal: config?.signal,
  });
  return response.data;
}
