import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MealService } from '../meal.service';
import { AccountService } from '../account.service';
import { Location } from '@angular/common';
import { Meal } from '../meal';

@Component({
  selector: 'meal-card',
  templateUrl: './meal-card.component.html',
  styleUrls: ['./meal-card.component.css']
})
export class MealCardComponent {

  @Input() id?: string;
  meal?: Meal;

  constructor(
    private route: ActivatedRoute,
    private mealService: MealService,
    private accountService: AccountService,
    private location: Location,
    private router: Router,
  ) { }

  async ngOnInit(): Promise<void> {
    if (this.id) {
      this.meal = await this.getMeal(this.id);
    }
  }

  cardClick(id: string): void {
    this.router.navigate([`/meal/view/${id}`])
  }

  async getMeal(id: string): Promise<Meal> {
    let meal = await this.mealService.getMeal(id);
    return meal;
  }

}
