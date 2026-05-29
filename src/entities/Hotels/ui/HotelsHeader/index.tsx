// HotelsHeader.tsx
import { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  X,
  MapPin,
  DollarSign,
  Star,
} from "lucide-react";
import styles from "./styles.module.scss";

interface HeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onModalApply: (filters: {
    country: string;
    maxPrice: number;
    minRating: number;
  }) => void;
}

export const HotelsHeader = ({
  searchValue,
  onSearchChange,
  onModalApply,
}: HeaderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [maxPrice, setMaxPrice] = useState(1000);
  const [minRating, setMinRating] = useState(0);

  const handleApplyFilters = () => {
    onModalApply({ country, maxPrice, minRating });
    setIsModalOpen(false);
  };

  const handleClearFilters = () => {
    setCountry("");
    setMaxPrice(1000);
    setMinRating(0);
  };

  return (
    <header className={styles.headerContainer}>
      <div className={styles.searchBarWrapper}>
        <div className={styles.inputGroup}>
          <Search size={18} className={styles.inputIcon} />
          <input
            type="text"
            placeholder="Search by hotel name, city or country..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className={styles.textInput}
          />
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
      </div>

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
              <button className={styles.clearBtn} onClick={handleClearFilters}>
                Clear all
              </button>
              <button className={styles.applyBtn} onClick={handleApplyFilters}>
                Show Results
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
