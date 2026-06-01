import type { Climate, TravelStyle, BudgetRange, GroupType } from "./enums";

export interface RegisterFormData {
  // Step 1 — Account
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;

  // Step 2 — Preferences
  preferredClimate: Climate;
  travelStyle: TravelStyle;
  preferredActivities: string[];
  preferredRegions: string[];
  groupType: GroupType;

  // Step 3 — Finances
  budgetRange: BudgetRange;
  currency: string;
  homeCountry: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  };
  accessToken: string;
  refreshToken: string;
}
