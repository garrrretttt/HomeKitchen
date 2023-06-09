import { Component } from '@angular/core';
import { Meal } from '../meal';
import { MealService } from '../meal.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AccountService } from '../account.service';

@Component({
  selector: 'edit-meal',
  templateUrl: './edit-meal.component.html',
  styleUrls: ['./edit-meal.component.css']
})
export class EditMealComponent {

  meal?: Meal;
  restriction: string = '';
  tag: string = '';

  constructor(
    private route: ActivatedRoute,
    private mealService: MealService,
    private accountService: AccountService,
    private location: Location,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getMeal().then((meal: Meal) =>{
      this.meal = meal;
      if(!this.accountService.isMealChef(meal.id)){
        this.router.navigate(['/meal/view', meal.id]);
      }
    });
  }

  async getMeal(): Promise<Meal> {
    const id = String(this.route.snapshot.paramMap.get('id'));
    return this.mealService.getMeal(id);
  }

  goBack(): void {
    this.location.back();
  }

  onSave() {
    if (this.meal) {
      if (this.mealService.isValidMeal(this.meal)) {
        this.updateMeal();
      }
    }
  }

  updateMeal() {
    if (this.meal) {
      this.mealService.updateMeal(this.meal.id, this.meal);
      this.goBack();
    }
  }

  onDelete() {
    this.deleteMeal();
  }

  deleteMeal() {
    if (this.meal) {
      this.mealService.deleteMeal(this.meal.id);
      this.accountService.deleteMeal(this.meal.id);
      this.router.navigate(['/meal/list']);
    }
  }

  changeStartTime(time: string) {
    if (this.meal) {
      let split = time.split(':');
      let date = new Date(this.meal.startDate);
      date.setHours(parseInt(split[0]));
      date.setMinutes(parseInt(split[1]));
      this.meal.startDate = date;
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
