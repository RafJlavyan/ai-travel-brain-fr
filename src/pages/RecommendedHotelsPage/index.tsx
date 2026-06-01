import React from "react";
import { Loader2, Hotel, AlertCircle } from "lucide-react";
import { RecommendedHotelCard } from "src/entities/Hotels/ui/RecommendedHotels/index";
import { HotelsFilter } from "src/entities/Hotels/ui/HotelsFilter/index";
import { useRecommendedHotels } from "src/entities/Hotels/model/useRecommendedHotels";
import styles from "./styles.module.scss";

export const RecommendedHotelsPage: React.FC = () => {
  const {
    hotels,
    totalCount,
    isLoading,
    error,
    filters,
    allTags,
    hasActiveFilters,
    updateFilter,
    toggleTag,
    clearFilters,
  } = useRecommendedHotels();

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <p className={styles.heroEyebrow}>Curated for you</p>
        <h1 className={styles.heroTitle}>Your Recommended Hotels</h1>
        <p className={styles.heroSubtitle}>
          Matched to your travel style, budget, and preferences
        </p>
      </div>

      <div className={styles.layout}>
        <HotelsFilter
          filters={filters}
          allTags={allTags}
          hasActiveFilters={hasActiveFilters}
          onUpdateFilter={updateFilter}
          onToggleTag={toggleTag}
          onClear={clearFilters}
        />

        <main className={styles.main}>
          <div className={styles.resultsBar}>
            <span className={styles.resultsCount}>
              {isLoading
                ? "Loading..."
                : `${hotels.length} of ${totalCount} hotels`}
            </span>
            {hasActiveFilters && (
              <span className={styles.filtersBadge}>Filters active</span>
            )}
          </div>

          {isLoading && (
            <div className={styles.stateWrapper}>
              <Loader2 size={32} className={styles.spinner} />
              <p className={styles.stateText}>Finding your perfect stays…</p>
            </div>
          )}

          {error && !isLoading && (
            <div className={styles.stateWrapper}>
              <AlertCircle size={32} className={styles.errorIcon} />
              <p className={styles.stateText}>{error}</p>
            </div>
          )}

          {!isLoading && !error && hotels.length === 0 && (
            <div className={styles.stateWrapper}>
              <Hotel size={32} className={styles.emptyIcon} />
              <p className={styles.stateText}>No hotels match your filters</p>
              <button className={styles.clearBtn} onClick={clearFilters}>
                Clear filters
              </button>
            </div>
          )}

          {!isLoading && !error && hotels.length > 0 && (
            <div className={styles.grid}>
              {hotels.map((hotel, index) => (
                <RecommendedHotelCard
                  key={hotel.id}
                  hotel={hotel}
                  index={index}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
