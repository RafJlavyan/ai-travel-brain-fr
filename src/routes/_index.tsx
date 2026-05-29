// HomePage.tsx
import { useState, useEffect } from "react";
import { HotelsHeader } from "src/entities/Hotels/ui/HotelsHeader";
import { HotelsTable } from "src/entities/Hotels/ui/HotelsTable";
import { getHotels } from "src/entities/Hotels/queries/useGetHotels";

interface FilterState {
  location?: string;
  country?: string;
  maxPrice?: number;
  minRating?: number;
}

export default function HomePage() {
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchKeyword, setSearchKeyword] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    country: "",
    maxPrice: 1000,
    minRating: 0,
  });

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchKeyword }));
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchKeyword]);

  // Fetch data automatically on structured filter state changes
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

  // Explicit handlers passed down to UI
  const handleTextChange = (text: string) => {
    setSearchKeyword(text);
  };

  const handleModalApply = (modalFilters: Omit<FilterState, "location">) => {
    setFilters((prev) => ({
      ...prev,
      ...modalFilters,
    }));
  };

  return (
    <section
      style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}
    >
      <HotelsHeader
        searchValue={searchKeyword}
        onSearchChange={handleTextChange}
        onModalApply={handleModalApply}
      />
      <HotelsTable hotels={hotels} loading={isLoading} />
    </section>
  );
}
