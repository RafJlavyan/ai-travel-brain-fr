// HomePage.tsx
import { useState, useEffect } from "react";
import { HotelsHeader } from "src/entities/Hotels/ui/HotelsHeader";
import { HotelsTable } from "src/entities/Hotels/ui/HotelsTable";
import { getHotels } from "src/entities/Hotels/queries/useGetHotels";

interface FilterState {
  search?: string;
  country?: string;
  maxPrice?: number;
  minRating?: number;
}

export default function HomePage() {
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Structural filters state
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    country: "",
    maxPrice: 1000,
    minRating: 0,
  });

  // Fetch data ONLY when the centralized filters object updates
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

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

  // Executed ONLY when clicking the Search button or Applying the modal
  const handleSearchSubmit = (finalFilters: FilterState) => {
    setFilters((prev) => ({
      ...prev,
      ...finalFilters,
    }));
  };

  return (
    <section
      style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}
    >
      <HotelsHeader
        onSearchSubmit={handleSearchSubmit}
        currentFilters={filters}
      />
      <HotelsTable hotels={hotels} loading={isLoading} />
    </section>
  );
}
