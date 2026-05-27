import axios from "axios";

export async function getHotels(config?: { signal?: AbortSignal }) {
  const response = await axios.get("http://localhost:3000/hotels/", {
    signal: config?.signal,
  });
  return response.data;
}
