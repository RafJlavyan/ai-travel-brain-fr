import axios, { type AxiosRequestConfig } from "axios";

export async function getHotelReviews(id: number, config?: AxiosRequestConfig) {
  const response = await axios.get(
    `http://localhost:3000/hotels/${id}/reviews`,
    config,
  );
  return response.data;
}
