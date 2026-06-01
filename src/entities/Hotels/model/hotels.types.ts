export interface Hotel {
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
}

export interface HotelsFilterState {
  stars: number | null;
  budgetRange: "BUDGET" | "MID_RANGE" | "LUXURY" | null;
  tags: string[];
}
