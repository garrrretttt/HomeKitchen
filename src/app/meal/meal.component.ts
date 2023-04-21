import { Component, Input } from '@angular/core';
import { Meal } from 'src/meal';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent {
  meal: Meal | undefined;

  ngOnInit(): void {
    this.getMeal();
  }

  getMeal(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.mealService.getMeal(id)
      .subscribe(meal => this.meal = meal);
  }
}
