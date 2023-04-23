import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Meal } from './meal';
import { Account } from './account';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const accounts = [
      {id : 0,    isChef : true,  name : 'Master',    dietaryRestrictions : ['None'], 
    bio : 'I am master chef', profilePicture : '', 
    ratings : {'Diner': [5], 'Chef': [4, 5, 4]},    username: 'master',     password: 'account'},

    {id : 1,    isChef : false,  name : 'Alan Turing',    dietaryRestrictions : ['None'], 
    bio : 'I like to eat', profilePicture : '', 
    ratings : {'Diner': [5, 3, 3], 'Chef': []},    username: 'Alan',     password: 'Turing'}
    ]
    const meals = [
      { id: 0, dishName: 'Spaghetti', partySize: 4,
    AmountBooked: 0, tags: ['Child-Friendly', 'Pets Present'], 
    dietaryRestrictions: ['None'], cost: 12, 
    location: '1234 56th St S Fargo, ND', timeStart: '6:00', 
    picture: 'https://i.imgur.com/e76p3L3.png', 
    chef: accounts[0], ratings: [4, 4, 4] }
    ];
    return { meals };
  }

  genMealId(meals: Meal[]): number {
    return meals.length > 0 ? Math.max(...meals.map(meal => meal.id)) + 1 : 11;
  }
  genAccountId(acounts: Account[]): number {
    return acounts.length > 0 ? Math.max(...acounts.map(acount => acount.id)) + 1 : 11;
  }
}