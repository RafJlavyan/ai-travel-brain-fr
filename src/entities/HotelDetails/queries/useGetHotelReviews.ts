import { useQuery } from "@tanstack/react-query";
import { publicApi } from "src/shared/api/api";
import type { ReviewsResponse } from "src/shared/types";

export const useGetHotelReviews = (id: number) => {
  return useQuery<ReviewsResponse>({
    queryKey: ["hotelReviews", id],
    queryFn: async ({ signal }) => {
      const response = await publicApi.get<ReviewsResponse>(`/hotels/${id}/reviews`, { signal });
      return response.data;
    },
    enabled: !isNaN(id),
  });
};

