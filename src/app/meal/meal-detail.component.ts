import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Meal } from '../meal';
import { MealService } from '../meal.service';

@Component({
  selector: 'meal-detail',
  templateUrl: './meal-detail.component.html',
  styleUrls: [ './meal-detail.component.css' ]
})
export class MealDetailComponent implements OnInit {
  meal: Meal | undefined;

  constructor(
    private route: ActivatedRoute,
    private mealService: MealService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getMeal();
  }

  getMeal(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.mealService.getMeal(id)
      .subscribe(meal => this.meal = meal);
  }

  goBack(): void {
    this.location.back();
  }
}