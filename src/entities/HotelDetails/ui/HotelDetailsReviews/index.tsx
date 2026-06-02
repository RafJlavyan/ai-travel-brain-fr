import { useState } from "react";
import { Star, MessageSquare, Heart, Send } from "lucide-react";
import styles from "./styles.module.scss";
import { useSubmitReview } from "../../queries/useSubmitReview";

import type { Review } from "src/shared/types";

interface HotelDetailsReviewsProps {
  hotelId: number;
  reviews: Review[];
  onLike: (reviewId: number) => void;
}

export const HotelDetailsReviews = ({
  hotelId,
  reviews,
  onLike,
}: HotelDetailsReviewsProps) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submitReviewMutation = useSubmitReview();
  const isSubmitting = submitReviewMutation.isPending;

  const handleSubmit = async () => {
    if (rating === 0) return setError("Please select a rating");
    if (reviewText.trim().length < 10)
      return setError("Review must be at least 10 characters");

    setError(null);
    try {
      await submitReviewMutation.mutateAsync({
        hotelId,
        rating,
        review: reviewText.trim(),
      });
      setRating(0);
      setReviewText("");
    } catch {
      setError("Failed to submit review. Please try again.");
    }
  };

  const activeRating = hoverRating || rating;

  return (
    <div className={styles.wrapper}>
      {/* ── Write a Review ── */}
      <div className={styles.writeSection}>
        <h3 className={styles.writeTitle}>Share your experience</h3>

        <div className={styles.ratingPicker}>
          <span className={styles.ratingPickerLabel}>Your rating</span>
          <div className={styles.starsInput}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={26}
                className={`${styles.starInput} ${
                  i < activeRating ? styles.starInputFilled : ""
                }`}
                // 🔒 Disable rating changes during submission transit
                onMouseEnter={() => !isSubmitting && setHoverRating(i + 1)}
                onMouseLeave={() => !isSubmitting && setHoverRating(0)}
                onClick={() => !isSubmitting && setRating(i + 1)}
              />
            ))}
          </div>
          {activeRating > 0 && (
            <span className={styles.ratingLabel}>
              {["", "Poor", "Fair", "Good", "Great", "Excellent"][activeRating]}
            </span>
          )}
        </div>

        <textarea
          className={styles.textarea}
          placeholder="What did you love? What could be improved? Share your honest thoughts…"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          rows={4}
          maxLength={500} // 🔒 Prevents client overflow bypass
          disabled={isSubmitting} // 🔒 Disables text changes during transit
        />

        <div className={styles.writeFooter}>
          {error && <span className={styles.errorMsg}>{error}</span>}
          <span className={styles.charCount}>{reviewText.length} / 500</span>
          <button
            className={styles.submitBtn}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            <Send size={15} />
            {isSubmitting ? "Posting…" : "Post Review"}
          </button>
        </div>
      </div>

      {/* ── Reviews List (remains unchanged and correct) ── */}
      <div className={styles.listHeader}>
        <h2 className={styles.sectionTitle}>
          <MessageSquare size={20} className={styles.titleIcon} />
          Guest Reviews
        </h2>
        <span className={styles.reviewCount}>{reviews.length}</span>
      </div>

      {reviews.length === 0 ? (
        <div className={styles.emptyState}>
          <MessageSquare size={32} className={styles.emptyIcon} />
          <p>No reviews yet — be the first to share your experience.</p>
        </div>
      ) : (
        <div className={styles.reviewsList}>
          {reviews.map((item, index) => (
            <div
              key={item.id}
              className={styles.reviewCard}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
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
                      {new Date(item.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                <div className={styles.ratingBadge}>
                  <Star size={12} className={styles.badgeStar} />
                  <span>{item.rating}.0</span>
                </div>
              </div>

              <p className={styles.reviewBody}>{item.review}</p>

              <div className={styles.reviewFooter}>
                <button
                  className={`${styles.likeButton} ${
                    item.likedByMe ? styles.liked : ""
                  }`}
                  onClick={() => onLike(item.id)}
                >
                  <Heart
                    size={14}
                    className={item.likedByMe ? styles.heartFilled : ""}
                  />
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
