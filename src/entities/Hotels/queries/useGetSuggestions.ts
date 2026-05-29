import axios from "axios";

export async function getSuggestions(query: string) {
  const response = await axios.get(
    `http://localhost:3000/hotels/autocomplete?q=${query}`,
  );
  return response.data;
}
