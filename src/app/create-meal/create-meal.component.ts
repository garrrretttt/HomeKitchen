import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MealService } from '../meal.service';
import { Location } from '@angular/common';
import { Meal } from '../meal';
import { Account } from '../account';
import { AccountService } from '../account.service';

@Component({
  selector: 'create-meal',
  templateUrl: './create-meal.component.html',
  styleUrls: ['./create-meal.component.css']
})
export class CreateMealComponent {

  user?: Account; // get active user
  meal?: Meal;
  restriction: string = '';
  tag: string = '';

  dishName: string = '';
  partySize: number = 0;
  tags: string[] = [];
  dietaryRestrictions: string[] = [];
  cost: number = 0;
  mealLocation: string = '';
  startDate: Date = new Date();
  duration: number = 0;
  picture: string = 'https://i.imgur.com/e76p3L3.png';
  chef?: Account; // get chef id
  ratings: number[] = [];
  accountsBooked: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private mealService: MealService,
    private accountService: AccountService,
    private location: Location,
    private router: Router,
  ) { }

  async ngOnInit(){
    this.chef = await this.accountService.getAccount();
  }

  async createMeal(meal: Meal) {
    let id = await this.mealService.createMeal(meal);
    this.router.navigate([`/meal/view/${id}`])
  }

  goBack(): void {
    this.location.back();
  }

  isValidMeal(): boolean {
    if (this.meal) {
      if (this.meal?.dishName != '' && this.meal.cost != 0 && this.meal.partySize != 0
        && new Date(this.meal.startDate) >= new Date()
        && this.meal.duration != 0 && this.meal.location != '') {
        return true;
      }
    }
    return false;
  }

  onCreate() {
    let newMeal = {
      dishName: this.dishName, partySize: this.partySize,
      accountsBooked: this.accountsBooked, tags: this.tags,
      dietaryRestrictions: this.dietaryRestrictions, cost: this.cost,
      location: this.mealLocation,
      startDate: this.startDate, duration: this.duration,
      picture: this.picture,
      chefId: this.chef?.uid, ratings: this.ratings
    } as unknown as Meal;
    if (this.mealService.isValidMeal(newMeal)) {
      this.createMeal(newMeal);
    }

  }

  onDelete() {
    this.router.navigate(['/meal/list']);
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
