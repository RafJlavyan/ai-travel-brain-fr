import { Star, MapPin } from "lucide-react";
import styles from "./styles.module.scss";

type HotelData = {
  name: string;
  city: string;
  country: string;
  description: string;
  stars: number;
  pricePerNight: number;
  image?: string | null;
} & { reviewsCount: number };

export const HotelDetailsHeader = ({ hotel }: { hotel: HotelData }) => {
  return (
    <div className={styles.headerWrapper}>
      {/* Hero Image Section */}
      <div className={styles.heroSection}>
        <img
          src={hotel.image || "https://unsplash.com"}
          alt={hotel.name}
          className={styles.heroImage}
        />
        <div className={styles.imageOverlay} />

        {/* Floating Stats Badge */}
        <div className={styles.priceFloatingBadge}>
          <span className={styles.label}>Price per night</span>
          <span className={styles.value}>${hotel.pricePerNight}</span>
        </div>
      </div>

      {/* Text Info Box */}
      <div className={styles.infoContainer}>
        <div className={styles.titleRow}>
          <h1 className={styles.hotelName}>{hotel.name}</h1>
          <div className={styles.starsRow}>
            {Array.from({ length: 5 }).map((_, idx) => (
              <Star
                key={idx}
                size={18}
                className={
                  idx < (hotel.stars || 5)
                    ? styles.starFilled
                    : styles.starEmpty
                }
              />
            ))}
            <span className={styles.reviewsCount}>
              {" "}
              ({hotel.reviewsCount} reviews)
            </span>
          </div>
        </div>

        <div className={styles.locationRow}>
          <MapPin size={16} className={styles.pinIcon} />
          <span>
            {hotel.city}, {hotel.country}
          </span>
        </div>

        <p className={styles.descriptionText}>{hotel.description}</p>
      </div>
    </div>
  );
};
