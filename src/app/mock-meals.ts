import { Meal } from "./meal";
import { Time } from "@angular/common";
import { ACCOUNTS } from "./mock-accounts";

export const MEALS: Meal[] = [
    { id: 0, dishName: 'Spaghetti', partySize: 4, AmountBooked: 0, tags: ['Child-Friendly', 'Pets Present'], dietaryRestrictions: ['None'], cost: 12, location: '1234 56th St S Fargo, ND', timeStart: '6:00', picture: '', chef: ACCOUNTS[0] }
]