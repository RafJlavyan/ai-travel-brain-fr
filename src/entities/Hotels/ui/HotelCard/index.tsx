import React from "react";
import { Star, MapPin, Tag } from "lucide-react";
import styles from "./styles.module.scss";
import type { HotelProps } from "./types/hotel";

type HotelCardProps = {
  data: HotelProps;
  index?: number;
};

export const HotelCard: React.FC<HotelCardProps> = ({ data, index = 0 }) => {
  if (!data) return null;

  const {
    name,
    city,
    country,
    description,
    stars,
    pricePerNight,
    image,
    tags,
  } = data;

  const reviewsCount = (data as any)._count?.reviews ?? 0;

  const FALLBACK_GRADIENTS = [
    "linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)",
    "linear-gradient(135deg, #2d1b4e 0%, #0f172a 100%)",
    "linear-gradient(135deg, #1a3a2a 0%, #0f172a 100%)",
    "linear-gradient(135deg, #3a1a1a 0%, #0f172a 100%)",
  ];

  return (
    <article
      className={styles.card}
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      {/* ── Image ── */}
      <div className={styles.imageWrapper}>
        {image ? (
          <img src={image} alt={name} className={styles.image} />
        ) : (
          <div
            className={styles.imageFallback}
            style={{
              background: FALLBACK_GRADIENTS[index % FALLBACK_GRADIENTS.length],
            }}
          >
            <span className={styles.fallbackIcon}>🏨</span>
          </div>
        )}

        <div className={styles.starsOverlay}>
          {Array.from({ length: stars }).map((_, i) => (
            <Star key={i} size={11} fill="#fbbf24" stroke="none" />
          ))}
        </div>

        <div className={styles.priceOverlay}>
          <span className={styles.price}>${pricePerNight}</span>
          <span className={styles.priceUnit}>/night</span>
        </div>
      </div>

      {/* ── Body ── */}
      <div className={styles.body}>
        <h3 className={styles.name}>{name}</h3>

        <div className={styles.location}>
          <MapPin size={12} />
          <span>
            {city}, {country}
          </span>
        </div>

        <p className={styles.description}>{description}</p>

        {tags && tags.length > 0 && (
          <div className={styles.tags}>
            {tags.slice(0, 3).map((tag) => (
              <span key={tag} className={styles.tag}>
                <Tag size={10} />
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className={styles.tagMore}>+{tags.length - 3}</span>
            )}
          </div>
        )}

        {reviewsCount > 0 && (
          <span className={styles.reviews}>{reviewsCount} reviews</span>
        )}
      </div>
    </article>
  );
};
