import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MealDetailComponent } from './meal/meal-detail.component';
import { MealListComponent } from './meal-list/meal-list.component';

const routes: Routes = [
  { path: 'meal/view/:id', component: MealDetailComponent },
  { path: 'meal/edit/:id', component: MealDetailComponent },
  { path: 'meal/list', component: MealListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }