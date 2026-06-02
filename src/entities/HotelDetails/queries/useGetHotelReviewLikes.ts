import { type AxiosRequestConfig } from "axios";
import { publicApi } from "src/shared/api/api";

export async function useGetHotelReviewLikes(
  reviewId: number,
  config?: AxiosRequestConfig,
) {
  const response = await publicApi.get(
    `/hotel-review-likes/${reviewId}`,
    config,
  );
  return response.data;
}
