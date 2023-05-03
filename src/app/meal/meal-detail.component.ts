import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Meal } from '../meal';
import { MealService } from '../meal.service';
import { AccountService } from '../account.service';
import { Account } from '../account';

@Component({
  selector: 'meal-detail',
  templateUrl: './meal-detail.component.html',
  styleUrls: ['./meal-detail.component.css'],
})
export class MealDetailComponent implements OnInit {
  @Input() id?: string;
  meal?: Meal;
  chef?: Account;
  restriction: string = '';
  tag: string = '';
  isBooked: boolean = false;
  userIsMealChef = false;
  isHistory = false;

  constructor(
    private route: ActivatedRoute,
    private mealService: MealService,
    public accountService: AccountService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.id) {
      this.getMeal(this.id).then(async (meal: Meal) => {
        this.meal = meal;
        if (this.accountService.isMealChef(meal.id)) {
          this.userIsMealChef = true;
        }
        else {
          this.isBooked = await this.accountService.hasBookedMeal(meal.id);
        }
        this.accountService.getAccountByUid(this.meal.chefId).then((chef: Account) => {
          this.chef = chef;
        })
        if(new Date(meal.startDate) < new Date()){
          this.isHistory = true
        }
      });
    }
  }

  async getMeal(id: string): Promise<Meal> {
    return await this.mealService.getMeal(id);
  }

  goBack(): void {
    this.location.back();
  }

  bookMeal() {
    if (this.meal) {
      this.accountService.bookMeal(this.meal.id);
      this.mealService.bookMeal(this.meal, this.accountService.getUid())
      this.isBooked = true;
    }
  }

  unbookMeal() {
    if (this.meal) {
      this.accountService.unbookMeal(this.meal.id);
      this.mealService.unbookMeal(this.meal, this.accountService.getUid())
      this.isBooked = false;
    }
  }

  updateMeal() {
    if (this.meal) {
      this.mealService.updateMeal(this.meal.id, this.meal);
      this.router.navigate(['/meal/view', this.meal.id]);
    }
  }

}
