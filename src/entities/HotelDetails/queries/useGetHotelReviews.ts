import { type AxiosRequestConfig } from "axios";
import { publicApi } from "src/shared/api/api";

export async function getHotelReviews(id: number, config?: AxiosRequestConfig) {
  const response = await publicApi.get(`/hotels/${id}/reviews`, config);
  return response.data;
}
