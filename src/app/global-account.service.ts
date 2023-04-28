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

  userId?: number;

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

  private usersUrl = 'api/accounts';
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

  getAccount(userName: string): Observable<Account> {
    const url = `${this.usersUrl}/${userName}`;
    return this.http.get<Account>(url).pipe(
      catchError(this.handleError<Account>(`this.getAccount userName=${userName}`))
    );
  }

  // onSignUp2(): void{
  //   this.getUsers().subscribe
  //   (users => this.signupObj = users);
  //   this.signupObj = {
  //     userName: ' ',
  //     email: ' ',
  //     password: ' '
  //   };
  // }

  addAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(this.usersUrl, account, this.httpOptions).pipe(
      catchError(this.handleError<Account>('addAccount'))
    );
  }

  updateAccount(accounts: Account): Observable<any> {
    return this.http.put(this.usersUrl, accounts, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateAccount'))
    );
  }

  setActiveUser(id: number){

    this.userId = id;

  }



  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }

}
