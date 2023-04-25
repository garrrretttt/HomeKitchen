import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Meal } from '../meal';
import { MealService } from '../meal.service';
import { Account } from '../account';
import { AccountService } from '../account.service';

@Component({
  selector: 'meal-detail',
  templateUrl: './meal-detail.component.html',
  styleUrls: ['./meal-detail.component.css']
})
export class MealDetailComponent implements OnInit {
  @Input() id?: number;
  meal?: Meal;
  user?: Account = {
    id: 0, isChef: true, name: 'Master', dietaryRestrictions: ['None'],
    bio: 'I am master chef', profilePicture: '',
    ratings: { 'Diner': [5], 'Chef': [4, 5, 4] }, username: 'master', password: 'account'
  };
  details: boolean = false;
  hover: boolean = false;
  onHover: string = '';
  isChef: boolean = true;
  edit: boolean = false;
  restriction: string = '';
  tag: string = '';
  newMeal: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private mealService: MealService,
    private accountService: AccountService,
    private location: Location,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getMeal();
  }

  ngOnDestroy(): void {
    if (!this.isValidMeal()) {
      if (this.newMeal) {
        this.deleteMeal();
      }
    }
  }

  getUser() {
    // get active user here
  }

  getMeal(): void {
    if (typeof this.id != 'undefined') {
      this.mealService.getMeal(this.id)
        .subscribe(meal => this.meal = meal);
    }
    else if (this.router.url.match('/meal/view')) {
      this.details = true;
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.mealService.getMeal(id)
        .subscribe(meal => this.meal = meal);
    }
    else if (this.router.url.match('/meal/create')) {
      this.mealService.addMeal({
        dishName: '', partySize: 0,
        AmountBooked: 0, tags: [],
        dietaryRestrictions: [], cost: 0,
        location: '',
        startDate: new Date(), duration: 0,
        picture: 'https://i.imgur.com/e76p3L3.png',
        chef: this.user, ratings: []
      } as unknown as Meal).subscribe(meal => {
        this.meal = meal;
        this.details = true;
        this.edit = true;
        this.newMeal = true;
      });
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
      this.isValidMeal();
      this.edit = true;
    }
    else { // save the meal
      if (this.meal) {
        if (this.isValidMeal()) {
          this.edit = false
          this.updateMeal();
        }
      }
    }
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

  updateMeal() {
    if (this.meal) {
      this.mealService.updateMeal(this.meal).subscribe(meal => {
        if (this.meal && this.newMeal) {
          this.newMeal = false;
          this.router.navigate(['/meal/view', this.meal.id]);
        }
      });
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
