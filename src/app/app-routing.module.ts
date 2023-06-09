import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MealDetailComponent } from './meal/meal-detail.component';
import { MealListComponent } from './meal-list/meal-list.component';
import { EditMealComponent } from './edit-meal/edit-meal.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CreateMealComponent } from './create-meal/create-meal.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { AccountComponent } from './account/account.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { ExploreComponent } from './explore/explore.component';
import { CreateRatingComponent } from './create-rating/create-rating.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', redirectTo: 'meal/list', pathMatch: 'full' },
  { path: 'meal/view/:id', component: MealDetailComponent },
  { path: 'meal/edit/:id', component: EditMealComponent },
  { path: 'meal/create', component: CreateMealComponent },
  { path: 'meal/list', component: MealListComponent },
  { path: 'account/view', component: AccountComponent },
  { path: 'account/view/:id', component: AccountComponent },
  { path: 'account/edit', component: EditAccountComponent },
  { path: 'account/create', component: CreateAccountComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'explore', component: ExploreComponent },
  { path: 'account/rate/:id/:meal', component: CreateRatingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
