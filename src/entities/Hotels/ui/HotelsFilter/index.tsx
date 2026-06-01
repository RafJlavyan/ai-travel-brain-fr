import React from "react";
import { SlidersHorizontal, X } from "lucide-react";
import type { HotelsFilterState } from "../../model/hotels.types";
import styles from "./styles.module.scss";

interface HotelsFilterProps {
  filters: HotelsFilterState;
  allTags: string[];
  hasActiveFilters: boolean;
  onUpdateFilter: (patch: Partial<HotelsFilterState>) => void;
  onToggleTag: (tag: string) => void;
  onClear: () => void;
}

const STAR_OPTIONS = [5, 4, 3, 2, 1];

const BUDGET_OPTIONS: {
  value: HotelsFilterState["budgetRange"];
  label: string;
}[] = [
  { value: "BUDGET", label: "🎒 Budget" },
  { value: "MID_RANGE", label: "✈️ Mid-Range" },
  { value: "LUXURY", label: "💎 Luxury" },
];

export const HotelsFilter: React.FC<HotelsFilterProps> = ({
  filters,
  allTags,
  hasActiveFilters,
  onUpdateFilter,
  onToggleTag,
  onClear,
}) => (
  <aside className={styles.wrapper}>
    <div className={styles.header}>
      <div className={styles.title}>
        <SlidersHorizontal size={15} />
        <span>Filters</span>
      </div>
      {hasActiveFilters && (
        <button className={styles.clearBtn} onClick={onClear}>
          <X size={13} /> Clear
        </button>
      )}
    </div>

    <div className={styles.section}>
      <p className={styles.sectionTitle}>Star Rating</p>
      <div className={styles.starGrid}>
        {STAR_OPTIONS.map((star) => (
          <button
            key={star}
            className={`${styles.starBtn} ${filters.stars === star ? styles.active : ""}`}
            onClick={() =>
              onUpdateFilter({ stars: filters.stars === star ? null : star })
            }
          >
            {"★".repeat(star)}
          </button>
        ))}
      </div>
    </div>

    <div className={styles.section}>
      <p className={styles.sectionTitle}>Budget</p>
      <div className={styles.chipList}>
        {BUDGET_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            className={`${styles.chip} ${filters.budgetRange === opt.value ? styles.active : ""}`}
            onClick={() =>
              onUpdateFilter({
                budgetRange:
                  filters.budgetRange === opt.value ? null : opt.value,
              })
            }
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>

    {allTags.length > 0 && (
      <div className={styles.section}>
        <p className={styles.sectionTitle}>Tags</p>
        <div className={styles.chipList}>
          {allTags.map((tag) => (
            <button
              key={tag}
              className={`${styles.chip} ${filters.tags.includes(tag) ? styles.active : ""}`}
              onClick={() => onToggleTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    )}
  </aside>
);
