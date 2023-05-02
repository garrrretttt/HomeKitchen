export interface Account {
    uid: string;
    isChef: boolean;
    first: string;
    last: string;
    dietaryRestrictions: string[];
    bio: string;
    profilePicture: string;
    ratings: {'Diner': number[], 'Chef': number[]};
    username: string;
    password: string;
    mealsBooked: string[]; //stored by id
    mealsCreated: string[];
}