import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getHotel } from "src/entities/HotelDetails/queries/useGetHotel";
import { getHotelReviews } from "src/entities/HotelDetails/queries/useGetHotelReviews";
import { HotelDetailsHeader } from "src/entities/HotelDetails/ui/HotelDetailsHeader";
import { HotelDetailsReviews } from "src/entities/HotelDetails/ui/HotelDetailsReviews";

// Declare standard type mapping shapes reflecting backend Prisma layout properties
interface HotelState {
  id: number;
  name: string;
  city: string;
  country: string;
  description: string;
  stars: number;
  pricePerNight: number;
  image?: string | null;
  reviews: Array<{
    id: number;
    rating: number;
    review: string;
    createdAt: string;
    user: {
      firstName: string;
      lastName: string;
    };
  }>;
}

export default function HotelDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [hotel, setHotel] = useState<HotelState | null>(null);
  const [reviewsData, setReviewsData] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    // Set up network cancellation handling
    const controller = new AbortController();

    async function fetchHotelDetails() {
      try {
        setIsLoading(true);
        setError(null);

        // Pass signal directly inside Axios configuration parameter mapping block
        const data = await getHotel(Number(id), { signal: controller.signal });
        const reviews = await getHotelReviews(Number(id), {
          signal: controller.signal,
        });
        setReviewsData(reviews);
        setHotel(data);
      } catch (err: any) {
        if (err.name === "CanceledError" || err.name === "AbortError") return;
        console.error("Failed to load hotel profiles:", err);
        setError(
          "Could not retrieve hotel specifics. Please verify connection credentials.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchHotelDetails();

    // Clean up active browser network fetch cycles on component unmount
    return () => {
      controller.abort();
    };
  }, [id]);

  // Handle network loading state overlay rendering
  if (isLoading) {
    return (
      <div style={{ padding: "4rem", textAlign: "center", color: "#94a3b8" }}>
        <p>Analyzing parameters... Loading properties...</p>
      </div>
    );
  }

  // Handle fetch error state boundaries
  if (error || !hotel) {
    return (
      <div style={{ padding: "4rem", textAlign: "center", color: "#fb7185" }}>
        <p>{error || "The requested property profile could not be located."}</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "2rem 1rem" }}>
      {/* 1. Renders the main visual layout header element */}
      <HotelDetailsHeader hotel={hotel} />

      {/* 2. Renders the relational user guest evaluation list data grid block */}
      <HotelDetailsReviews reviews={reviewsData.data || []} />
    </div>
  );
}
