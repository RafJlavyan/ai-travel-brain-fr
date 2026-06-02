import { type AxiosRequestConfig } from "axios";
import { publicApi } from "src/shared/api/api";

export async function getHotel(id: number, config?: AxiosRequestConfig) {
  const response = await publicApi.get(`/hotels/${id}`, config);
  return response.data;
}
