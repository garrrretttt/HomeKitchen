import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MealComponent } from './meal/meal.component';

const routes: Routes = [
  { path: 'meal/view/$id', component: MealComponent },
  { path: 'meal/edit/$id', component: MealComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }