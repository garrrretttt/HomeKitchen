export interface Account {
    id: number
    isChef: boolean;
    name: string;
    dietaryRestrictions: string[];
    bio: string;
    profilePicture: string;
    ratings: {'Service': number[], 'Meal Quality': number[]};
    username: string;
    password: string;
    // Name 
    // Dietary Restrictions 
    // Bio 
    // Link to picture 
    // Ratings 
    // Username & password 
    // Other stats 
}