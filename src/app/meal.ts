import { Time } from "@angular/common";
import { Account } from "./account";

export interface Meal {
    id: number;
    dishName: string;
    partySize: number;
    tags: string[];
    dietaryRestrictions: string[];
    cost: number;
    location: string;
    startDate: Date;
    duration: number;
    picture: string;
    chefId: number;
    ratings: number[];
    accountsBooked: number[]; //stored by id
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