import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Meal } from '../meal';
import { MealService } from '../meal.service';

@Component({
  selector: 'meal-detail',
  templateUrl: './meal-detail.component.html',
  styleUrls: ['./meal-detail.component.css']
})
export class MealDetailComponent implements OnInit {
  id: number = 0;
  meal?: Meal;
  details: boolean = false;
  hover: boolean = false;
  onHover: string = 'box-shadow: 5px 5px 5px gray;'

  constructor(
    private route: ActivatedRoute,
    private mealService: MealService,
    private location: Location,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getMeal();
    if (this.router.url == `/meal/view/${this.meal?.id}` || this.router.url == `/meal/edit/${this.meal?.id}`) {
      // this.details = true;
    }
  }

  getMeal(): void {
    if (this.id) {
      this.mealService.getMeal(0)
        .subscribe(meal => this.meal = meal);
    }
  }

  goBack(): void {
    this.location.back();
  }

  cardClick(id: number): void {
    this.router.navigate([`/meal/view/${id}`])
  }
}