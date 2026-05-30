// HomePage.tsx
import { useState, useEffect } from "react";
import { HotelsHeader } from "src/entities/Hotels/ui/HotelsHeader";
import { HotelsTable } from "src/entities/Hotels/ui/HotelsTable";
import { getHotels } from "src/entities/Hotels/queries/useGetHotels";
import {
  getRecentHotelSearches,
  saveHotelSearch,
  type HotelSearchHistoryItem,
} from "src/entities/Hotels/queries/useHotelSearchHistory";
import { RecentSearches } from "src/entities/Hotels/ui/RecentSearches";

interface FilterState {
  search?: string;
  country?: string;
  maxPrice?: number;
  minRating?: number;
}

export default function HomePage() {
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [recentSearches, setRecentSearches] = useState<
    HotelSearchHistoryItem[]
  >([]);

  const [filters, setFilters] = useState<FilterState>({
    search: "",
    country: "",
    maxPrice: 1000,
    minRating: 0,
  });

  useEffect(() => {
    let isMounted = true;

    getHotels(filters)
      .then((data) => {
        if (isMounted) {
          setHotels(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error updating hotel list:", err);
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [filters]);

  const loadRecentSearches = () => {
    getRecentHotelSearches()
      .then(setRecentSearches)
      .catch((err) => {
        console.error("Error loading recent hotel searches:", err);
      });
  };

  useEffect(() => {
    loadRecentSearches();
  }, []);

  // Executed ONLY when clicking the Search button or Applying the modal
  const handleSearchSubmit = (finalFilters: FilterState) => {
    setIsLoading(true);
    setFilters((prev) => ({
      ...prev,
      ...finalFilters,
    }));

    if (finalFilters.search?.trim()) {
      saveHotelSearch(finalFilters.search)
        .then(() => loadRecentSearches())
        .catch((err) => {
          console.error("Error saving hotel search:", err);
        });
    }
  };

  return (
    <section
      style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}
    >
      <RecentSearches items={recentSearches} />
      <HotelsHeader
        onSearchSubmit={handleSearchSubmit}
        currentFilters={filters}
      />
      <HotelsTable hotels={hotels} loading={isLoading} />
    </section>
  );
}
