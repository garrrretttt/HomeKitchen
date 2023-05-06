import { Component, Input, OnInit, inject } from '@angular/core';
import { Meal } from '../meal';
import { MealService } from '../meal.service';
import { AccountService } from '../account.service';
import { DocumentData, Firestore, Query, collection, getDocs, orderBy, query } from 'firebase/firestore';
import { MatDialog } from '@angular/material/dialog';
import { FilterDialogComponent, FilterDialogInput } from '../filter-dialog/filter-dialog.component';
import { filter } from 'rxjs';

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

  constructor(private mealService: MealService, private accountService: AccountService, public dialog: MatDialog) {}

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

  filterCreatedHistory(): void {
    this.createdHistory = [];
    let input: FilterDialogInput = {
      query: query(collection(inject(Firestore), "meals")),
      isExplore: false,
    };
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      width: '500px',
      data: input,
    });

    dialogRef.afterClosed().subscribe(async (result: Query<DocumentData>) => {
      let meals: Meal[] = [];
      let querySnapshot = await getDocs(result);
      querySnapshot.forEach((doc) => {
        meals.push(doc.data() as Meal);
      });
      this.createdHistory = meals;
    });
  }

  filter(): void {

  }
}
