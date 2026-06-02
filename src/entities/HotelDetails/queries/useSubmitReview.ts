import { api } from "src/shared/api/api";

export const useSubmitReview = () => {
  const submitReview = async (
    hotelId: number,
    rating: number,
    review: string
  ) => {
    await api.post(
      "/hotel-reviews",
      { hotelId, rating, review },
    );
  };

  return { submitReview };
};
