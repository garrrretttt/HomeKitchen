import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Meal } from './meal';
import { Account } from './account';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const accounts: Account[] = [
      {
        id: 0, isChef: true, name: 'Master', dietaryRestrictions: ['None'],
        bio: 'I am master chef', profilePicture: '', mealsBooked: [],
        ratings: { 'Diner': [5], 'Chef': [4, 5, 4] }, username: 'master', password: 'account'
      },

      {
        id: 1, isChef: false, name: 'Alan Turing', dietaryRestrictions: ['None'],
        bio: 'I like to eat', profilePicture: '', mealsBooked: [],
        ratings: { 'Diner': [5, 3, 3], 'Chef': [] }, username: 'Alan', password: 'Turing'
      }
    ]
    const meals: Meal[] = [
      {
        id: 0, dishName: 'Spaghetti', partySize: 4,
        accountsBooked: [], tags: ['Child-Friendly', 'Pets Present'],
        dietaryRestrictions: [], cost: 12,
        location: '1234 56th St S Fargo, ND',
        startDate: new Date(2023, 5, 5, 17, 30), duration: 1,
        picture: 'https://i.imgur.com/e76p3L3.png',
        chefId: 0, ratings: [4, 4, 4]
      },
      {
        id: 1, dishName: 'Noodles with Tomato Sauces', partySize: 4,
        accountsBooked: [], tags: ['Child-Friendly', 'Pets Present'],
        dietaryRestrictions: ['None'], cost: 12,
        location: '1234 56th St S Fargo, ND',
        startDate: new Date(2023, 5, 5, 17, 30), duration: 1,
        picture: 'https://i.imgur.com/e76p3L3.png',
        chefId: 0, ratings: [4, 4, 4]
      },
      {
        id: 2, dishName: 'Red Sauce with Wormy Stuff', partySize: 4,
        accountsBooked: [], tags: ['Child-Friendly', 'Pets Present'],
        dietaryRestrictions: ['None'], cost: 12,
        location: '1234 56th St S Fargo, ND',
        startDate: new Date(2023, 5, 5, 17, 30), duration: 1,
        picture: 'https://i.imgur.com/e76p3L3.png',
        chefId: 0, ratings: [4, 4, 4]
      },
      {
        id: 3, dishName: 'Red Sauce with Wormy Stuff asdflkjasdf ;lkjasdf;lkj', partySize: 4,
        accountsBooked: [], tags: ['Child-Friendly', 'Pets Present'],
        dietaryRestrictions: ['None'], cost: 12,
        location: '1234 56th St S Fargo, ND',
        startDate: new Date(2023, 5, 5, 17, 30), duration: 1,
        picture: 'https://i.imgur.com/e76p3L3.png',
        chefId: 0, ratings: [4, 4, 4]
      },
      {
        id: 4, dishName: 'Red Sauce with Wormy Stuff', partySize: 4,
        accountsBooked: [], tags: ['Child-Friendly', 'Pets Present'],
        dietaryRestrictions: ['None'], cost: 12,
        location: '1234 56th St S Fargo, ND',
        startDate: new Date(2023, 5, 5, 17, 30), duration: 1,
        picture: 'https://i.imgur.com/e76p3L3.png',
        chefId: 0, ratings: [4, 4, 4]
      },
      {
        id: 5, dishName: 'Red Sauce with Wormy Stuff', partySize: 4,
        accountsBooked: [], tags: ['Child-Friendly', 'Pets Present'],
        dietaryRestrictions: ['None'], cost: 12,
        location: '1234 56th St S Fargo, ND',
        startDate: new Date(2023, 5, 5, 17, 30), duration: 1,
        picture: 'https://i.imgur.com/e76p3L3.png',
        chefId: 0, ratings: [4, 4, 4]
      },
      {
        id: 6, dishName: 'Red Sauce with Wormy Stuff', partySize: 4,
        accountsBooked: [], tags: ['Child-Friendly', 'Pets Present'],
        dietaryRestrictions: ['None'], cost: 12,
        location: '1234 56th St S Fargo, ND',
        startDate: new Date(2023, 5, 5, 17, 30), duration: 1,
        picture: 'https://i.imgur.com/e76p3L3.png',
        chefId: 0, ratings: [4, 4, 4]
      }
    ];
    return { meals, accounts };
    
  }
  
}