export interface Meal {
    id: string;
    dishName: string;
    partySize: number;
    tags: string[];
    dietaryRestrictions: string[];
    cost: number;
    location: string;
    startDate: Date;
    duration: number;
    picture: string;
    chefId: string;
    ratings: number[];
    accountsBooked: number[]; //stored by id
}