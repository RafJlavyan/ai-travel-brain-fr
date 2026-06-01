import { useState, useEffect, useMemo } from "react";
import { getRecommendedHotels } from "../queries/useGetRecomendedHotels";
import type { Hotel, HotelsFilterState } from "./hotels.types";

const PRICE_MAP = {
  BUDGET: [0, 100],
  MID_RANGE: [100, 300],
  LUXURY: [300, Infinity],
} as const;

export const useRecommendedHotels = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<HotelsFilterState>({
    stars: null,
    budgetRange: null,
    tags: [],
  });

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getRecommendedHotels.getRecommended(24);
        setHotels(data);
      } catch {
        setError("Failed to load recommendations");
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, []);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    hotels.forEach((h) => h.tags.forEach((t) => set.add(t)));
    return Array.from(set);
  }, [hotels]);

  const filtered = useMemo(() => {
    return hotels.filter((hotel) => {
      if (filters.stars !== null && hotel.stars !== filters.stars) return false;

      if (filters.budgetRange !== null) {
        const [min, max] = PRICE_MAP[filters.budgetRange];
        if (hotel.pricePerNight < min || hotel.pricePerNight > max)
          return false;
      }

      if (filters.tags.length > 0) {
        const hasTag = filters.tags.some((t) => hotel.tags.includes(t));
        if (!hasTag) return false;
      }

      return true;
    });
  }, [hotels, filters]);

  const updateFilter = (patch: Partial<HotelsFilterState>) => {
    setFilters((prev) => ({ ...prev, ...patch }));
  };

  const toggleTag = (tag: string) => {
    setFilters((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const clearFilters = () => {
    setFilters({ stars: null, budgetRange: null, tags: [] });
  };

  const hasActiveFilters =
    filters.stars !== null ||
    filters.budgetRange !== null ||
    filters.tags.length > 0;

  return {
    hotels: filtered,
    totalCount: hotels.length,
    isLoading,
    error,
    filters,
    allTags,
    updateFilter,
    toggleTag,
    clearFilters,
    hasActiveFilters,
  };
};
