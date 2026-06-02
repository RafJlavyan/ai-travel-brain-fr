export interface User {
  firstName: string;
  lastName: string;
  email: string;
  preferredClimate?: string;
  travelStyle?: string;
  preferredActivities?: string[];
  preferredRegions?: string[];
  budgetRange?: string;
  currency?: string;
  homeCountry?: string;
  groupType?: string;
}

export interface Hotel {
  id: number;
  name: string;
  city: string;
  country: string;
  description: string;
  stars: number;
  pricePerNight: number;
  image?: string | null;
  tags: string[];
  reviewsCount?: number;
}

export interface ReviewUser {
  firstName: string;
  lastName: string;
}

export interface Review {
  id: number;
  rating: number;
  review: string;
  createdAt: string;
  user: ReviewUser;
  likesCount: number;
  likedByMe?: boolean;
}

export interface ReviewsResponse {
  data: Review[];
  meta?: {
    total?: number;
  };
}
