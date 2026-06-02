import { publicApi } from "src/shared/api/api";

export async function getSuggestions(query: string) {
  const response = await publicApi.get("/hotels/autocomplete", {
    params: { q: query },
  });
  return response.data;
}
