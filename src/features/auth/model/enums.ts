export const Climate = {
  TROPICAL: "TROPICAL",
  COLD: "COLD",
  DRY: "DRY",
  MODERATE: "MODERATE",
} as const;
export type Climate = (typeof Climate)[keyof typeof Climate];

export const TravelStyle = {
  ADVENTURE: "ADVENTURE",
  RELAXATION: "RELAXATION",
  CULTURAL: "CULTURAL",
  BUSINESS: "BUSINESS",
  NIGHTLIFE: "NIGHTLIFE",
} as const;
export type TravelStyle = (typeof TravelStyle)[keyof typeof TravelStyle];

export const BudgetRange = {
  BUDGET: "BUDGET",
  MID_RANGE: "MID_RANGE",
  LUXURY: "LUXURY",
} as const;
export type BudgetRange = (typeof BudgetRange)[keyof typeof BudgetRange];

export const GroupType = {
  SOLO: "SOLO",
  COUPLE: "COUPLE",
  FAMILY: "FAMILY",
  FRIENDS: "FRIENDS",
} as const;
export type GroupType = (typeof GroupType)[keyof typeof GroupType];

export const ACTIVITIES = [
  "Beach",
  "Hiking",
  "Museums",
  "Nightlife",
  "Shopping",
  "Spa",
  "Skiing",
  "Diving",
  "Cycling",
  "Photography",
  "Food Tours",
  "Concerts",
] as const;

export const REGIONS = [
  "Europe",
  "Asia",
  "Americas",
  "Middle East",
  "Africa",
  "Oceania",
  "Caribbean",
  "Scandinavia",
] as const;

export const CURRENCIES = ["USD", "EUR", "GBP", "AMD", "JPY", "AED"] as const;
