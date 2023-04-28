import { Component, Input } from '@angular/core';
import { Meal } from '../meal';
import { ActivatedRoute, Router } from '@angular/router';
import { MealService } from '../meal.service';
import { AccountService } from '../account.service';
import { Location } from '@angular/common';

@Component({
  selector: 'meal-card',
  templateUrl: './meal-card.component.html',
  styleUrls: ['./meal-card.component.css']
})
export class MealCardComponent {

  @Input() id?: number;
  @Input() manage: boolean = false;
  selected: boolean = false;
  meal?: Meal;

  constructor(
    private route: ActivatedRoute,
    private mealService: MealService,
    private accountService: AccountService,
    private location: Location,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getMeal();
  }

  cardClick(id: number): void {
    if (!this.manage) {
      this.router.navigate([`/meal/view/${id}`])
    }
    else {
      this.toggleSelected();
    }
  }

  toggleSelected(){
    this.selected = !this.selected;
  }

  getMeal(): void {
    if (typeof this.id != 'undefined') {
      this.mealService.getMeal(this.id)
        .subscribe(meal => this.meal = meal);
    }
  }

}