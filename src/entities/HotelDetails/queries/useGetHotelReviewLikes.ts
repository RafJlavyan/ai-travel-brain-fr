import axios, { type AxiosRequestConfig } from "axios";

export async function useGetHotelReviewLikes(
  reviewId: number,
  config?: AxiosRequestConfig,
) {
  const response = await axios.get(
    `http://localhost:3000/hotel-review-likes/${reviewId}`,
    config,
  );
  return response.data;
}
