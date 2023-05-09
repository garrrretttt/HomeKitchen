import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Meal } from '../meal';
import { MealService } from '../meal.service';
import { AccountService } from '../account.service';
import { Account } from '../account';
import { RatingService } from '../rating.service';
import { Rating } from '../rating';

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
  bookedAccounts: Account[] = [];
  ratingIndices: number[] = [];
  guestRatings: Rating[] = [];
  chefRating?: Rating;
  user?: Account;

  constructor(
    private route: ActivatedRoute,
    private mealService: MealService,
    public accountService: AccountService,
    private ratingService: RatingService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.id ? this.id : String(this.route.snapshot.paramMap.get('id'));
    this.accountService.getAccount().then(account => this.user = account);
    this.getMeal(this.id).then(async (meal: Meal) => {
      this.meal = meal;
      this.getBookedAccounts().then(() => {
        this.getRatings();
      });
      if (this.accountService.isMealChef(meal.id)) {
        this.userIsMealChef = true;
      }
      else {
        this.isBooked = await this.accountService.hasBookedMeal(meal.id);
      }
      this.accountService.getAccountByUid(this.meal.chefId).then((chef: Account) => {
        this.chef = chef;
      })
      if (new Date(meal.startDate) < new Date()) {
        this.isHistory = true
      }
    });
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

  async getBookedAccounts() {
    if (this.meal) {
      for (let uid of this.meal.accountsBooked) {
        this.bookedAccounts.push(await this.accountService.getAccountByUid(uid));
      }
    }
  }

  getRatings() {
    if (this.meal) {
      let meal = this.meal;
      for (let account of this.bookedAccounts) {
        this.ratingIndices.push(-1);
      }
      this.ratingService.getRatingByRater(meal.id).then(ratings => {
        for (let i = 0; i < ratings.length; i++) {
          if (ratings[i].ratedUid == meal.chefId && ratings[i].raterUid == this.user?.uid) {
            this.chefRating = ratings[i];
          }
          else for (let j = 0; j < this.bookedAccounts.length; j++) {
            if (ratings[i].ratedUid == this.bookedAccounts[j].uid) {
              this.guestRatings.push(ratings[i]);
              let ratingIndex = this.guestRatings.indexOf(ratings[i]);
              this.ratingIndices[j] = ratingIndex;
            }
          }
        }
      });
    }
  }

}
