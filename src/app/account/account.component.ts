import { Component } from '@angular/core';
import { AccountService } from '../account.service';
import { Account } from '../account';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { MealService } from '../meal.service';
import { Meal } from '../meal';
import { RatingService } from '../rating.service';
import { Rating } from '../rating';
import { Location } from '@angular/common';

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
  ratings: Rating[] = [];
  averageRating: number = 0;
  done: boolean = false;
  id?: string;

  constructor(
    private accountService: AccountService,
    private mealService: MealService,
    private ratingService: RatingService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if(event.url.includes('/account/view/')){
          
        }
      }
    });
  }

  async ngOnInit() {
    this.user = await this.accountService.getAccount();
    this.id = String(this.route.snapshot.paramMap.get('id'));
    if (this.id != 'null') {
      this.account = await this.accountService.getAccount(this.id);
    }
    else {
      this.account = await this.accountService.getAccount();
    }
    this.getHistoryMeals();
    this.getRatings();
  }

  onEdit() {
    this.router.navigate(['/account/edit'])
  }

  averageRatings(ratings: Rating[]) {
    let total: number = 0;
    for (let rating of ratings) {
      total = total + parseInt(rating.rating.toString());
    }
    this.averageRating = total / ratings.length;
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

  getRatings(){
    this.ratingService.getRatings().then(ratings => {
      this.ratings = ratings;
      this.averageRatings(ratings);
    })
  }

}
