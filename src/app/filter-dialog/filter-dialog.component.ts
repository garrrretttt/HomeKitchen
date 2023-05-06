import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Meal } from '../meal';
import { DocumentData, Query } from 'firebase/firestore';

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

  query: Query<DocumentData>;

  constructor(
    public dialogRef: MatDialogRef<FilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FilterDialogInput
  ) {
    this.query = data.query;
  }




  cancel(): void {
    this.dialogRef.close(this.query);
  }

  confirm(): void {
    this.dialogRef.close(this.query);
  }
}

export interface FilterDialogInput {
  query: Query<DocumentData>;
  isExplore: boolean;
}