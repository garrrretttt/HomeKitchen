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
  @Input() id?: number;
  meal?: Meal;
  details: boolean = false;
  hover: boolean = false;
  onHover: string = 'box-shadow: 5px 5px 5px gray;';
  isChef: boolean = true;
  isEdit: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private mealService: MealService,
    private location: Location,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getMeal();
  }

  getMeal(): void {
    if (typeof this.id !== 'undefined') {
      this.mealService.getMeal(this.id)
        .subscribe(meal => this.meal = meal);
    }
    else {
      this.details = true;
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.mealService.getMeal(id)
        .subscribe(meal => this.meal = meal);
    }
  }

  goBack(): void {
    this.location.back();
  }

  cardClick(id: number): void {
    this.router.navigate([`/meal/view/${id}`])
  }

  bookMeal() { }

  toggleMeal() {
    if (this.isEdit == false) {
      this.isEdit = true;
    }
    else {
      this.isEdit = false
      // this is clicking the save button
      // call update meal function
      this.updateMeal();
    }
  }

  updateMeal() { }
}