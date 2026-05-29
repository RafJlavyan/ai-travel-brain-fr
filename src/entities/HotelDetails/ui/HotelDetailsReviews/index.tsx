import { Star, MessageSquare, Heart } from "lucide-react";
import styles from "./styles.module.scss";
interface ReviewProps {
  id: number;
  rating: number;
  review: string;
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
  };
  likesCount: number;
}

export const HotelDetailsReviews = ({
  reviews,
}: {
  reviews: ReviewProps[];
}) => {
  return (
    <div className={styles.reviewsContainer}>
      <h2 className={styles.sectionTitle}>
        <MessageSquare size={22} className={styles.titleIcon} />
        Guest Reviews ({reviews.length})
      </h2>

      {reviews.length === 0 ? (
        <div className={styles.emptyState}>
          No reviews yet. Be the first to share your experience!
        </div>
      ) : (
        <div className={styles.reviewsList}>
          {reviews.map((item) => (
            <div key={item.id} className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <div className={styles.userProfile}>
                  <div className={styles.avatar}>
                    {item.user.firstName.charAt(0)}
                  </div>

                  <div>
                    <h4 className={styles.userName}>
                      {item.user.firstName} {item.user.lastName}
                    </h4>

                    <span className={styles.date}>
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className={styles.ratingBadge}>
                  <Star size={14} className={styles.badgeStar} />
                  <span>{item.rating}.0</span>
                </div>
              </div>

              <p className={styles.reviewBody}>{item.review}</p>

              <div className={styles.reviewFooter}>
                <button className={styles.likeButton}>
                  <Heart size={16} />
                  <span>{item.likesCount}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
