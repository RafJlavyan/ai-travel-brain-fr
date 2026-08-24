import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "src/shared/api/api";

export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ reviewId }: { reviewId: number; hotelId: number }) => {
      const response = await api.delete(`/hotel-reviews/${reviewId}`);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["hotel", variables.hotelId] });
      queryClient.invalidateQueries({
        queryKey: ["hotelReviews", variables.hotelId],
      });
    },
  });
};
