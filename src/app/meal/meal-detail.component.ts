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
  onHover: string = '';
  isChef: boolean = true;
  edit: boolean = false;
  restriction: string = '';
  tag: string = '';

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
    if (this.edit == false) {
      this.edit = true;
    }
    else {
      this.edit = false
      // this is clicking the save button
      // call update meal function
      this.updateMeal();
    }
    console.log(this.meal?.startDate)
  }

  updateMeal() {
    if (this.meal) {
      this.mealService.updateMeal(this.meal).subscribe();
    }
  }

  deleteMeal() {
    if (this.meal) {
      this.mealService.deleteMeal(this.meal.id).subscribe();
      this.goBack();
    }
  }

  changeStartTime(time: string) {
    if (this.meal) {
      let split = time.split(':');
      let date = new Date(this.meal.startDate);
      date.setHours(parseInt(split[0]));
      date.setMinutes(parseInt(split[1]));
      this.meal.startDate = date;
      console.log(date);
    }
  }

  addRestriction() {
    if (this.meal) {
      if (!this.meal.dietaryRestrictions.includes(this.restriction) && this.restriction != '') {
        this.meal?.dietaryRestrictions.push(this.restriction);
        this.restriction = '';
      }
    }
  }

  deleteRestriction(id: number) {
    if (this.meal) {
      this.meal.dietaryRestrictions.splice(id, 1);
    }
  }

  addTag() {
    if (this.meal) {
      if (!this.meal.tags.includes(this.tag) && this.tag != '') {
        this.meal.tags.push(this.tag);
        this.tag = '';
      }
    }
  }

  deleteTag(id: number) {
    if (this.meal) {
      this.meal.tags.splice(id, 1);
    }
  }
}
