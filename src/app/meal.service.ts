import { Injectable } from '@angular/core';
import { Meal } from 'src/app/meal';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  constructor(private http: HttpClient) { }

  private mealsUrl = 'api/meals';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getMeals(): Observable<Meal[]> {
    return this.http.get<Meal[]>(this.mealsUrl)
      .pipe(
        catchError(this.handleError<Meal[]>('getMeals', []))
      );
  }

  getMeal(id: number): Observable<Meal> {
    const url = `${this.mealsUrl}/${id}`;
    return this.http.get<Meal>(url).pipe(
      catchError(this.handleError<Meal>(`getMeal id=${id}`))
    );
  }

  addMeal(meal: Meal): Observable<Meal> {
    return this.http.post<Meal>(this.mealsUrl, meal, this.httpOptions).pipe(
      catchError(this.handleError<Meal>('addMeal'))
    );
  }

  updateMeal(meal: Meal): Observable<any> {
    return this.http.put(this.mealsUrl, meal, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateMeal'))
    );
  }

  deleteMeal(id: number): Observable<Meal> {
    const url = `${this.mealsUrl}/${id}`;

    return this.http.delete<Meal>(url, this.httpOptions).pipe(
      catchError(this.handleError<Meal>('deleteMeal'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
