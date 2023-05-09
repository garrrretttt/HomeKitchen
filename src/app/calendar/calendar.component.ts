import { Component, Input, OnInit } from '@angular/core';
import { Meal } from '../meal';
import { MealService } from '../meal.service';
import { AccountService } from '../account.service';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {

  created: Meal[] = [];
  booked: Meal[] = [];
  done: boolean = false;

  constructor(private mealService: MealService, private accountService: AccountService) {}

  ngOnInit(): void {
    this.getMeals();
  }

  getMeals() {
    this.mealService.getMeals().then((meals) => {
      for (const meal of meals) {
        if (meal.chefId == this.accountService.getUid()) {
          if (new Date(meal.startDate) >= new Date()) {
            this.created.push(meal);
          }
        } else if (meal.accountsBooked.includes(this.accountService.getUid())) {
          if (new Date(meal.startDate) >= new Date()) {
            this.booked.push(meal);
          }
        }
      }
      this.done = true;
    });
  }
}
