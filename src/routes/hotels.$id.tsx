import { useParams } from "react-router-dom";
import { useGetHotel } from "src/entities/HotelDetails/queries/useGetHotel";
import { useGetHotelReviews } from "src/entities/HotelDetails/queries/useGetHotelReviews";
import { HotelDetailsHeader } from "src/entities/HotelDetails/ui/HotelDetailsHeader";
import { HotelDetailsReviews } from "src/entities/HotelDetails/ui/HotelDetailsReviews";

export default function HotelDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const hotelId = Number(id);

  const { data: hotel, isLoading: isHotelLoading, error: hotelError } = useGetHotel(hotelId);
  const { data: reviewsData, isLoading: isReviewsLoading } = useGetHotelReviews(hotelId);

  const isLoading = isHotelLoading || isReviewsLoading;
  const error = hotelError ? "Could not retrieve hotel specifics. Please verify connection credentials." : null;

  if (isLoading) {
    return (
      <div style={{ padding: "4rem", textAlign: "center", color: "#94a3b8" }}>
        <p>Analyzing parameters... Loading properties...</p>
      </div>
    );
  }

  if (error || !hotel) {
    return (
      <div style={{ padding: "4rem", textAlign: "center", color: "#fb7185" }}>
        <p>{error || "The requested property profile could not be located."}</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "2rem 1rem" }}>
      <HotelDetailsHeader
        hotel={{
          ...hotel,
          reviewsCount:
            reviewsData?.meta?.total || reviewsData?.data.length || 0,
        }}
      />
      <HotelDetailsReviews
        hotelId={hotel.id}
        reviews={reviewsData?.data || []}
        onLike={() => undefined}
      />
    </div>
  );
}
