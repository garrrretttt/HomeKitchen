import { Component, Input, OnInit } from '@angular/core';
import { Account } from '../account';
import { Meal } from '../meal';
import { MealService } from '../meal.service';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  account: Account = {
    id: 1,
    isChef: false,
    name: 'Alan Turing',
    dietaryRestrictions: ['None'],
    bio: 'I like to eat',
    profilePicture: '',
    mealsBooked: [],
    mealsCreated: [],
    ratings: { Diner: [5, 3, 3], Chef: [] },
    username: 'Alan',
    password: 'Turing',
  };

  created: Meal[] = [];
  booked: Meal[] = [];
  createdHistory: Meal[] = [];
  bookedHistory: Meal[] = [];
  done: boolean = false;

  constructor(private mealService: MealService) {}

  ngOnInit(): void {
    this.getMeals();
  }

  getMeals() {
    this.mealService.getMeals().subscribe((meals) => {
      console.log('Retrieving meals for calendar page...');
      for (const meal of meals) {
        if (meal.chefId == this.account?.id) {
          if (meal.startDate >= new Date()) {
            this.created?.push(meal);
          } else {
            this.createdHistory?.push(meal);
          }
        } else if (meal.accountsBooked.includes(this.account.id)) {
          if (new Date(meal.startDate) >= new Date()) {
            this.booked?.push(meal);
          } else {
            this.bookedHistory?.push(meal);
          }
        }
        console.log(this.booked?.at(0));
      }
      this.done = true;
      console.log('All meals retrieved.');
    });
  }
}
