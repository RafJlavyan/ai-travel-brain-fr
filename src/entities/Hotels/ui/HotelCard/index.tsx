import React from "react";
import styles from "./styles.module.scss";
import type { HotelProps } from "./types/hotel";

type HotelCardProps = { data: HotelProps };

export const HotelCard: React.FC<HotelCardProps> = ({ data }) => {
  if (!data) return null;
  const { name, city, country, description, stars, pricePerNight } = data;
  const reviewsCount = (data as any)._count?.reviews ?? 0;

  return (
    <div className={styles.card}>
      <div className={styles.imageSection}>
        <img src={data.image || undefined} alt={name} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.location}>
          {city}, {country}
        </p>
        <p className={styles.description}>{description}</p>
        <div className={styles.details}>
          <div className={styles.ratingGroup}>
            <span className={styles.stars}>★ {stars}</span>
            <span className={styles.reviews}>({reviewsCount} reviews)</span>
          </div>
          <span className={styles.price}>${pricePerNight} / night</span>
        </div>
      </div>
    </div>
  );
};
