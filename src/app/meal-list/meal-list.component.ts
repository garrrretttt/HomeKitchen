import { Component, OnInit } from '@angular/core';
import { Meal } from '../meal';
import { MealService } from '../meal.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AccountService } from '../account.service';

@Component({
  selector: 'meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.css']
})
export class MealListComponent implements OnInit {
  meals?: Meal[];

  constructor(
    private route: ActivatedRoute,
    private mealService: MealService,
    private accountService: AccountService,
    private location: Location,) { }

  ngOnInit(): void {
    this.getMeals();
  }

  async getMeals() {
    let pickMeals: number = 0 // 0 = all meals ; 1 = created meals ; 2 = booked meals ; do whatever you want, I just made it like this to show you how to use the services.
    let meals: Meal[] = [];
    if(pickMeals == 0){
      meals = await this.mealService.getMeals();
    }
    else if( pickMeals == 1){
      let mealIds: string[] = await this.accountService.getCreatedMeals();
      meals = await this.mealService.getMealsById(mealIds);
    }
    else {
    let mealIds: string[] = await this.accountService.getBookedMeals();
    meals = await this.mealService.getMealsById(mealIds);
    }
    this.meals = meals;
  }
}
