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
  user: Account = {
    id: 0, isChef: true, name: 'Master', dietaryRestrictions: ['None'],
    bio: 'I am master chef', profilePicture: '', mealsBooked: [],
    ratings: { 'Diner': [5], 'Chef': [4, 5, 4] }, username: 'master', password: 'account'
  };
  details: boolean = false;
  hover: boolean = false;
  onHover: string = '';
  edit: boolean = false;
  restriction: string = '';
  tag: string = '';
  newMeal: boolean = false;
  isBooked: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private mealService: MealService,
    public accountService: AccountService,
    private location: Location,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getMeal();
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
        .subscribe(meal => {
          this.meal = meal;
          if (this.meal.accountsBooked.includes(this.user.id)) {
            this.isBooked = true;
          }
        });
    }
  }

  goBack(): void {
    this.location.back();
  }

  cardClick(id: number): void {
    this.router.navigate([`/meal/view/${id}`])
  }

  bookMeal() {
    if (this.meal) {
      this.meal.accountsBooked.push(this.user.id);
      this.user.mealsBooked.push(this.meal.id);
      this.updateMeal();
      //this.updateAccount();
      this.isBooked = true;
    }
  }

  unbookMeal() {
    if (this.meal) {
      let userIndex = this.meal.accountsBooked.findIndex(id => id == this.user.id);
      this.meal.accountsBooked.splice(userIndex, 1);
      let mealIndex = this.user.mealsBooked.findIndex(id => id == this.meal?.id);
      this.user.mealsBooked.splice(mealIndex, 1);
      this.updateMeal();
      //this.updateAccount();
      this.isBooked = false;
    }
  }

  updateMeal() {
    if (this.meal) {
      this.mealService.updateMeal(this.meal).subscribe(meal => {
        if (this.meal) {
          this.newMeal = false;
          this.router.navigate(['/meal/view', this.meal.id]);
        }
      });
    }
  }

  updateAccount() {
    this.accountService.updateAccount(this.user).subscribe(user => this.user = user);
  }
}
