export interface Rating {
    id: string;
    raterUid: string;
    ratedUid: string;
    mealId: string;
    rating: number,
    review: string,
    date: Date
}