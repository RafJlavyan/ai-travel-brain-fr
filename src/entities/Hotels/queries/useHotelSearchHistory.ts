import axios from "axios";

export interface HotelSearchHistoryItem {
  id: number;
  query: string;
  createdAt: string;
  hotel?: {
    id: number;
    name: string;
    city: string;
    country: string;
    image?: string | null;
  } | null;
}

export async function getRecentHotelSearches() {
  const response = await axios.get<HotelSearchHistoryItem[]>(
    "http://localhost:3000/hotels/search-history/recent",
  );

  return response.data;
}

export async function saveHotelSearch(query: string) {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return null;
  }

  const response = await axios.post(
    "http://localhost:3000/hotels/search-history",
    { query: trimmedQuery },
  );

  return response.data;
}
