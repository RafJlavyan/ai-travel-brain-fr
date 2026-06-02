import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "src/shared/api/api";

export const useSubmitReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      hotelId,
      rating,
      review,
    }: {
      hotelId: number;
      rating: number;
      review: string;
    }) => {
      const response = await api.post("/hotel-reviews", {
        hotelId,
        rating,
        review,
      });
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["hotel", variables.hotelId] });
      queryClient.invalidateQueries({ queryKey: ["hotelReviews", variables.hotelId] });
    },
  });
};

