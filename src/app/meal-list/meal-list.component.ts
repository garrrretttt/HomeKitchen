import { Component, OnInit } from '@angular/core';
import { Meal } from '../meal';
import { MealService } from '../meal.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

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
    private location: Location,) { }

  ngOnInit(): void {
    this.getMeals();
  }

  async getMeals(){
    this.meals = await this.mealService.getMeals();
  }
}
