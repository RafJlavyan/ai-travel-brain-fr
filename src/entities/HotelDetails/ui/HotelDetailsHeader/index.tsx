import { Star, MapPin, Tag } from "lucide-react";
import styles from "./styles.module.scss";

type HotelData = {
  name: string;
  city: string;
  country: string;
  description: string;
  stars: number;
  pricePerNight: number;
  image?: string | null;
  tags: string[];
  reviewsCount: number;
};

export const HotelDetailsHeader = ({ hotel }: { hotel: HotelData }) => (
  <div className={styles.wrapper}>
    {/* ── Left: Hero Image ── */}
    <div className={styles.heroSection}>
      <img
        src={
          hotel.image ??
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"
        }
        alt={hotel.name}
        className={styles.heroImage}
      />
      <div className={styles.imageOverlay} />

      <div className={styles.priceFloatingBadge}>
        <span className={styles.badgeLabel}>per night</span>
        <span className={styles.badgeValue}>${hotel.pricePerNight}</span>
      </div>

      <div className={styles.starsOverlay}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={12}
            className={i < hotel.stars ? styles.starFilled : styles.starEmpty}
          />
        ))}
      </div>
    </div>

    {/* ── Right: Info ── */}
    <div className={styles.infoContainer}>
      <div className={styles.top}>
        <h1 className={styles.hotelName}>{hotel.name}</h1>

        <div className={styles.metaRow}>
          <div className={styles.locationPill}>
            <MapPin size={13} className={styles.pinIcon} />
            <span>
              {hotel.city}, {hotel.country}
            </span>
          </div>
          <span className={styles.reviewsBadge}>
            {hotel.reviewsCount} reviews
          </span>
        </div>
      </div>

      <p className={styles.description}>{hotel.description}</p>

      {/* ── Tags ── */}
      {hotel.tags.length > 0 && (
        <div className={styles.tagsSection}>
          <span className={styles.tagsLabel}>
            <Tag size={11} />
            Atmosphere
          </span>
          <div className={styles.tagsRow}>
            {hotel.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);
