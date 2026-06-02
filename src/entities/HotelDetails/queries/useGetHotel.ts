import { useQuery } from "@tanstack/react-query";
import { publicApi } from "src/shared/api/api";
import type { Hotel } from "src/shared/types";

export const useGetHotel = (id: number) => {
  return useQuery<Hotel>({
    queryKey: ["hotel", id],
    queryFn: async ({ signal }) => {
      const response = await publicApi.get<Hotel>(`/hotels/${id}`, { signal });
      return response.data;
    },
    enabled: !isNaN(id),
  });
};

