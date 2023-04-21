import { Injectable } from '@angular/core';
import { Account } from 'src/app/account';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  private accountsUrl = 'api/accounts';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.accountsUrl)
      .pipe(
        catchError(this.handleError<Account[]>('getAccounts', []))
      );
  }

  getAccount(id: number): Observable<Account> {
    const url = `${this.accountsUrl}/${id}`;
    return this.http.get<Account>(url).pipe(
      catchError(this.handleError<Account>(`getAccount id=${id}`))
    );
  }

  addAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(this.accountsUrl, account, this.httpOptions).pipe(
      catchError(this.handleError<Account>('addAccount'))
    );
  }

  updateAccount(accounts: Account): Observable<any> {
    return this.http.put(this.accountsUrl, accounts, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateAccount'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
