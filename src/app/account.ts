export interface Account {
    uid: string;
    isChef: boolean;
    first: string;
    last: string;
    dietaryRestrictions: string[];
    bio: string;
    profilePicture: string;
    ratings: string[]; // stored by id
    mealsCreated: string[]; // stored by id
    mealsBooked: string[]; //stored by id
}
