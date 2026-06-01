import React from "react";
import { MapPin, Star, Tag } from "lucide-react";
import type { Hotel } from "../../model/hotels.types";
import styles from "./styles.module.scss";

interface HotelCardProps {
  hotel: Hotel;
  index: number;
}

const FALLBACK_GRADIENTS = [
  "linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)",
  "linear-gradient(135deg, #2d1b4e 0%, #0f172a 100%)",
  "linear-gradient(135deg, #1a3a2a 0%, #0f172a 100%)",
  "linear-gradient(135deg, #3a1a1a 0%, #0f172a 100%)",
];

export const RecommendedHotelCard: React.FC<HotelCardProps> = ({
  hotel,
  index,
}) => {
  const gradient = FALLBACK_GRADIENTS[index % FALLBACK_GRADIENTS.length];

  return (
    <article
      className={styles.card}
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      <div className={styles.imageWrapper}>
        {hotel.image ? (
          <img src={hotel.image} alt={hotel.name} className={styles.image} />
        ) : (
          <div
            className={styles.imageFallback}
            style={{ background: gradient }}
          >
            <span className={styles.fallbackIcon}>🏨</span>
          </div>
        )}
        <div className={styles.starsOverlay}>
          {Array.from({ length: hotel.stars }).map((_, i) => (
            <Star key={i} size={11} fill="#fbbf24" stroke="none" />
          ))}
        </div>
        <div className={styles.priceOverlay}>
          <span className={styles.price}>${hotel.pricePerNight}</span>
          <span className={styles.priceUnit}>/night</span>
        </div>
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{hotel.name}</h3>

        <div className={styles.location}>
          <MapPin size={12} />
          <span>
            {hotel.city}, {hotel.country}
          </span>
        </div>

        <p className={styles.description}>{hotel.description}</p>

        {hotel.tags.length > 0 && (
          <div className={styles.tags}>
            {hotel.tags.slice(0, 3).map((tag) => (
              <span key={tag} className={styles.tag}>
                <Tag size={10} />
                {tag}
              </span>
            ))}
            {hotel.tags.length > 3 && (
              <span className={styles.tagMore}>+{hotel.tags.length - 3}</span>
            )}
          </div>
        )}
      </div>
    </article>
  );
};
