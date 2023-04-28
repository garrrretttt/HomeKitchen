import { Component, Input, OnInit } from '@angular/core';
import { Meal } from '../meal';
import { MealService } from '../meal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.css'],
})
export class MealListComponent implements OnInit {
  @Input() meals: Meal[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private mealService: MealService,
    private location: Location,
    private router: Router
  ) {
    console.log(this.meals);
  }

  ngOnInit(): void {
    console.log(this.meals);
    if (this.meals) {
      console.log('true');
    }
  }
}
