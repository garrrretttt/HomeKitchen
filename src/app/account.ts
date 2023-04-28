import { Meal } from './meal';

export interface Account {
  id: number;
  isChef: boolean;
  name: string;
  dietaryRestrictions: string[];
  bio: string;
  profilePicture: string;
  ratings: { Diner: number[]; Chef: number[] };
  username: string;
  password: string;
  mealsCreated: number[];
  mealsBooked: number[]; //stored by id
  // Name
  // Dietary Restrictions
  // Bio
  // Link to picture
  // Ratings
  // Username & password
  // Other stats
}
