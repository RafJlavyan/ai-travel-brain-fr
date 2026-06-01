export type HotelProps = {
  id: number;
  name: string;
  city: string;
  country: string;
  description: string;
  stars: number;
  pricePerNight: number;
  image: string | null;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};
