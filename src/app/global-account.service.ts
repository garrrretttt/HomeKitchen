import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { Account } from './account';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { User } from './users';

@Injectable({
  providedIn: 'root'
})
export class GlobalAccountService {

  constructor(private http: HttpClient) { }

  signupObj:any = {
    userName: ' ',
    email: ' ',
    password: ' '
  };
  loginObj: any = {
    userName: ' ',
    password: ' '
  };

  private usersUrl = 'api/login-component';
  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type':'application/json' })
  };

  getUsers(): Observable<User[]>{

    return this.http.get<User[]>(this.usersUrl)
      .pipe(
        catchError(this.handleError<User[]>('getUsers', []))
      );

  }

  getUser(userName: string, password: string){
    const url = `${this.usersUrl}/${userName && password}`;
    return this.http.get<User>(url).pipe(
      catchError(this.handleError<User>(`getAccount id=${userName}`))
    );
  }



  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }

}
