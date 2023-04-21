import { Time } from "@angular/common";
import { Account } from "./account";

export interface Meal {
    id: number;
    dishName: string;
    partySize: number;
    AmountBooked: number;
    tags: string[];
    dietaryRestrictions: string[];
    cost: number;
    location: string;
    timeStart: string;
    picture: string;
    chef: Account;
    // Dish 
    // Party Size 
    // People that have booked 
    // Children / Pet tags 
    // Dietary Restrictions 
    // Price 
    // Location 
    // Time 
    // Picture of Meal 
    // Chef 
}