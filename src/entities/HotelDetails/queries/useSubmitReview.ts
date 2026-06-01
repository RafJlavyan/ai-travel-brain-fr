import axios from "axios";

export const useSubmitReview = () => {
  const submitReview = async (
    hotelId: number,
    rating: number,
    review: string
  ) => {
    const token = localStorage.getItem("accessToken");

    await axios.post(
      `${
        import.meta.env.VITE_API_URL ?? "http://localhost:3000"
      }/hotel-reviews`,
      { hotelId, rating, review },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  return { submitReview };
};
