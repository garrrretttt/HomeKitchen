import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Meal } from '../meal';
import { Query } from 'firebase/firestore';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.css']
})
export class FilterDialogComponent {
  dishName?: string;
  minPartySize?: number;
  maxPartySize?: number;
  tags?: string[];
  dietaryRestrictions?: string[];
  minCost?: number;
  maxCost?: number;
  //location: string;
  //startDate: Date;
  minDuration?: number;
  maxDuration?: number;
  minRating?: number;
  removeFull: boolean = false; //stored by id

  query: Query<Meal[]>;

  constructor(
    public dialogRef: MatDialogRef<FilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FilterDialogInput
  ) {
    this.query = data.query;
  }




  cancel(): void {
    this.dialogRef.close({ confirm: false });
  }

  confirm(): void {
    this.dialogRef.close({ confirm: true });
  }
}

export interface FilterDialogInput {
  query: Query<Meal[]>;
  isExplore: boolean;
}