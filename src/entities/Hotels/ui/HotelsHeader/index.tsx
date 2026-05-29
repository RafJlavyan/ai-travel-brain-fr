// HotelsHeader.tsx
import { useState, useEffect } from "react";
import {
  Search,
  SlidersHorizontal,
  X,
  MapPin,
  DollarSign,
  Star,
} from "lucide-react";
import axios from "axios";
import styles from "./styles.module.scss";

interface HeaderProps {
  onSearchSubmit: (filters: {
    search: string;
    country: string;
    maxPrice: number;
    minRating: number;
  }) => void;
  currentFilters: {
    country?: string;
    maxPrice?: number;
    minRating?: number;
  };
}

export const HotelsHeader = ({
  onSearchSubmit,
  currentFilters,
}: HeaderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [suggestion, setSuggestion] = useState("");

  const [country, setCountry] = useState(currentFilters.country || "");
  const [maxPrice, setMaxPrice] = useState(currentFilters.maxPrice || 1000);
  const [minRating, setMinRating] = useState(currentFilters.minRating || 0);

  useEffect(() => {
    const trimmedInput = inputValue.trim();
    if (trimmedInput.length < 2) {
      setSuggestion("");
      return;
    }

    const delayDebounce = setTimeout(() => {
      axios
        .get(`http://localhost:3000/hotels/autocomplete?q=${trimmedInput}`)
        .then((response) => {
          const backendMatches: string[] = response.data;

          if (backendMatches && backendMatches.length > 0) {
            const firstMatch = backendMatches[0];

            const remainingPart = firstMatch.slice(trimmedInput.length);
            setSuggestion(inputValue + remainingPart);
          } else {
            setSuggestion("");
          }
        })
        .catch(() => setSuggestion(""));
    }, 150);

    return () => clearTimeout(delayDebounce);
  }, [inputValue]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      (e.key === "Tab" || e.key === "ArrowRight") &&
      suggestion &&
      suggestion !== inputValue
    ) {
      e.preventDefault();
      setInputValue(suggestion);
    }
    if (e.key === "Enter") {
      handleExecuteSearch();
    }
  };

  const handleExecuteSearch = () => {
    let finalizedSearchText = inputValue.trim();

    if (suggestion) {
      finalizedSearchText = suggestion;
      setInputValue(suggestion);
      setSuggestion("");
    }

    onSearchSubmit({
      search: finalizedSearchText,
      country,
      maxPrice: maxPrice || 1000,
      minRating: minRating || 0,
    });
  };

  const handleApplyModal = () => {
    setIsModalOpen(false);
    handleExecuteSearch();
  };

  return (
    <header className={styles.headerContainer}>
      <div className={styles.searchBarWrapper}>
        <div className={styles.inputGroup}>
          <Search size={18} className={styles.inputIcon} />

          {/* New positioning structure to stack inputs */}
          <div className={styles.inputPositioner}>
            {suggestion && <div className={styles.ghostText}>{suggestion}</div>}
            <input
              type="text"
              placeholder="Where are you going? (e.g. Dilijan...)"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className={styles.textInput}
            />
          </div>
        </div>

        <button
          className={styles.filterTrigger}
          onClick={() => setIsModalOpen(true)}
        >
          <SlidersHorizontal size={16} />
          <span>Filters</span>
          {(country || minRating > 0 || maxPrice < 1000) && (
            <span className={styles.badge} />
          )}
        </button>

        <button className={styles.searchButton} onClick={handleExecuteSearch}>
          Search
        </button>
      </div>

      {/* Modern Filter Modal Backdrop */}
      {isModalOpen && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h3>Filters</h3>
              <button
                className={styles.closeButton}
                onClick={() => setIsModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.filterSection}>
                <label>
                  <MapPin size={14} /> Destination Country
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className={styles.selectInput}
                >
                  <option value="">All Countries</option>
                  <option value="France">France</option>
                  <option value="Italy">Italy</option>
                  <option value="USA">United States</option>
                </select>
              </div>

              <div className={styles.filterSection}>
                <div className={styles.sectionRow}>
                  <label>
                    <DollarSign size={14} /> Max Budget
                  </label>
                  <span className={styles.valueDisplay}>
                    Up to ${maxPrice} / night
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1000"
                  step="25"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className={styles.rangeInput}
                />
              </div>

              <div className={styles.filterSection}>
                <label>
                  <Star size={14} /> Minimum Rating
                </label>
                <div className={styles.ratingGrid}>
                  {[0, 3, 4, 5].map((stars) => (
                    <button
                      key={stars}
                      type="button"
                      className={`${styles.ratingChip} ${minRating === stars ? styles.activeChip : ""}`}
                      onClick={() => setMinRating(stars)}
                    >
                      {stars === 0 ? "Any" : `${stars}★ & up`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button
                className={styles.clearBtn}
                onClick={() => {
                  setCountry("");
                  setMaxPrice(1000);
                  setMinRating(0);
                }}
              >
                Clear all
              </button>
              <button className={styles.applyBtn} onClick={handleApplyModal}>
                Show Results
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
