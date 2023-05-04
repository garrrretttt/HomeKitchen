import { Component, Input, OnInit } from '@angular/core';
import { Meal } from '../meal';
import { MealService } from '../meal.service';
import { AccountService } from '../account.service';
import { Query, getDocs } from 'firebase/firestore';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {

  created: Meal[] = [];
  booked: Meal[] = [];
  createdHistory: Meal[] = [];
  bookedHistory: Meal[] = [];
  done: boolean = false;

  constructor(private mealService: MealService, private accountService: AccountService) {}

  ngOnInit(): void {
    this.getMeals();
  }

  getMeals() {
    this.mealService.getMeals().then((meals) => {
      for (const meal of meals) {
        if (meal.chefId == this.accountService.getUid()) {
          if (new Date(meal.startDate) >= new Date()) {
            this.created.push(meal);
          } else {
            this.createdHistory.push(meal);
          }
        } else if (meal.accountsBooked.includes(this.accountService.getUid())) {
          if (new Date(meal.startDate) >= new Date()) {
            this.booked.push(meal);
          } else {
            this.bookedHistory.push(meal);
          }
        }
      }
      this.done = true;
    });
  }

  filterBookedHistory(): void {
    
  }

  async filterCreatedHistory(): Promise<void> {
   /* const dialogRef = this.dialog.open(ContactDialogComponent, {
      width: '300px',
      data: this.clone(contact),
    });

    dialogRef.afterClosed().subscribe((result: Query<Meal[]>) => {
      this.createdHistory = await(getDocs(result));
    }); 

    const querySnapshot = await getDocs(q);*/
  }

  filter(): void {

  }
}
