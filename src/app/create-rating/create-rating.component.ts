import { Component } from '@angular/core';
import { AccountService } from '../account.service';
import { Account } from '../account';
import { ActivatedRoute, Router } from '@angular/router';
import { RatingService } from '../rating.service';
import { Rating } from '../rating';
import { MealService } from '../meal.service';
import { Meal } from '../meal';

@Component({
  selector: 'app-create-rating',
  templateUrl: './create-rating.component.html',
  styleUrls: ['./create-rating.component.css']
})
export class CreateRatingComponent {

  rateAccount?: Account;
  meal?: Meal;
  review: string = '';
  rating: number = 0;

  constructor(
    private accountService: AccountService,
    private mealService: MealService,
    private ratingService: RatingService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getRateAccount()
  }

  async getRateAccount() {
    const uid = String(this.route.snapshot.paramMap.get('id'));
    this.rateAccount = await this.accountService.getAccountByUid(uid);
    const mealId = String(this.route.snapshot.paramMap.get('meal'));
    this.meal = await this.mealService.getMeal(mealId);
  }

  onSubmit() {
    if (this.rating != 0 && this.meal && this.rateAccount) {
      let rating: Rating = {
        id: '',
        raterUid: this.accountService.getUid(),
        ratedUid: String(this.route.snapshot.paramMap.get('id')),
        rating: this.rating,
        review: this.review,
        date: new Date(),
        mealId: this.meal.id
      };
      this.ratingService.createRating(rating);
      this.router.navigate(['/account/view/', this.rateAccount.uid]);
    }
  }

}
