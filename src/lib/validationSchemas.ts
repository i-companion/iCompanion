// lib/validationSchemas.ts

export interface Interests {
  valorant: boolean;
  leagueOfLegends: boolean;
  callOfDuty: boolean;
}

export interface Profile {
  firstName: string;
  lastName: string;
  discord: string;
  email: string;
  image: string;
  interests: Interests[]; // Updated to match the new structure
  description: string;
}
