import axios, { type AxiosRequestConfig } from "axios";

export async function getHotel(id: number, config?: AxiosRequestConfig) {
  const response = await axios.get(
    `http://localhost:3000/hotels/${id}`,
    config,
  );
  return response.data;
}
