import { Component } from '@angular/core';
import { Meal } from '../meal';
import { MealService } from '../meal.service';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent {

  meals: Meal[] = [];

  constructor(private mealService: MealService, private accountService: AccountService) {}

  ngOnInit(): void {
    this.getMeals();
  }

  getMeals() {
    this.mealService.getMeals().then((meals) => {
      for (let meal of meals) {
        if (meal.chefId != this.accountService.getUid()) {
          if (new Date(meal.startDate) >= new Date()) {
            this.meals.push(meal);
          }
        }
      }
    });
  }
}
