import { Component } from '@angular/core';
import { AccountService } from '../account.service';
import { Account } from '../account';
import { ActivatedRoute, Router } from '@angular/router';
import { MealService } from '../meal.service';
import { Meal } from '../meal';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent {

  account?: Account;
  user?: Account;
  createdHistory: Meal[] = [];
  bookedHistory: Meal[] = [];
  done: boolean = false;

  constructor(
    private accountService: AccountService,
    private mealService: MealService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  async ngOnInit() {
    this.user = await this.accountService.getAccount();
    const id = String(this.route.snapshot.paramMap.get('id'));
    if (id != 'null') {
      this.account = await this.accountService.getAccount(id);
    }
    else {
      this.account = await this.accountService.getAccount();
    }
    this.getHistoryMeals();
  }

  onEdit() {
    this.router.navigate(['/account/edit'])
  }

  averageRatings(ratings: number[]): number {
    let total: number = 0;
    for (let rating of ratings) {
      total += rating;
    }
    return total / ratings.length;
  }

  getHistoryMeals() {
    this.mealService.getMeals().then((meals) => {
      for (const meal of meals) {
        if (this.account && meal.chefId == this.account.uid) {
          if (new Date(meal.startDate) < new Date()) {
            this.createdHistory.push(meal);
          }
        } else if (this.account && meal.accountsBooked.includes(this.account.uid)) {
          if (new Date(meal.startDate) < new Date()) {
            this.bookedHistory.push(meal);
          }
        }
      }
      this.done = true;
    });
  }
}
