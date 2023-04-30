import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MealDetailComponent } from './meal/meal-detail.component';
import { MealListComponent } from './meal-list/meal-list.component';
import { LoginComponent } from './login/login.component';
import { EditMealComponent } from './edit-meal/edit-meal.component';
import { CreateMealComponent } from './create-meal/create-meal.component';
import { CreateAccountComponent } from './create-account/create-account.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', redirectTo: 'meal/list', pathMatch: 'full' },
  { path: 'meal/view/:id', component: MealDetailComponent },
  { path: 'meal/edit/:id', component: EditMealComponent },
  { path: 'meal/create', component: CreateMealComponent },
  { path: 'meal/list', component: MealListComponent },
  { path: 'login', component: LoginComponent},
  {path: 'account/create', component: CreateAccountComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }