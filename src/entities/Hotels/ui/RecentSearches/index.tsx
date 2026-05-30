import { Clock3, MapPin } from "lucide-react";
import type { HotelSearchHistoryItem } from "../../queries/useHotelSearchHistory";
import styles from "./styles.module.scss";
import { Link } from "react-router";

interface RecentSearchesProps {
  items: HotelSearchHistoryItem[];
}

export const RecentSearches = ({ items }: RecentSearchesProps) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className={styles.wrapper} aria-label="Recent hotel searches">
      <div className={styles.header}>
        <Clock3 size={18} />
        <h2>Recent searches</h2>
      </div>

      <div className={styles.list}>
        {Array.from(items)
          .slice(0, 5)
          .map((item) => (
            <Link
              key={item.id}
              to={`/hotels/${item.hotel?.id}`}
              className={styles.item}
            >
              {item.hotel?.image && (
                <img
                  src={item.hotel.image}
                  alt=""
                  className={styles.thumbnail}
                  aria-hidden="true"
                />
              )}

              <span className={styles.content}>
                <span className={styles.query}>{item.query}</span>
                {item.hotel && (
                  <span className={styles.location}>
                    <MapPin size={13} />
                    {item.hotel.city}, {item.hotel.country}
                  </span>
                )}
              </span>
            </Link>
          ))}
      </div>
    </section>
  );
};
