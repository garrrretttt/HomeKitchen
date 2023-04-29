import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { Account } from './account';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, Subject, of } from 'rxjs';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import * as firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  userId?: string;
  user: any;
  fireStore: Firestore = inject(Firestore);
  fireAuth: AngularFireAuth = inject(AngularFireAuth);

  accountRef = collection(this.fireStore, 'accounts');

  constructor(
    private http: HttpClient,
  ) {
    this.fireAuth.onAuthStateChanged(user => {
      if (user) {
        this.userId = user.uid;
        this.getUserByUid(this.userId)
      }
      else {
        this.user = undefined;
      }
    })
  }

  async getUserByUid(userId: string) {
    let q = query(this.accountRef, where('uid', '==', userId));
    let querySnapshot = await getDocs(q);
    let data;
    querySnapshot.forEach((doc) => {
      this.user = doc.data();
    });
  }

  userIsChef(): boolean {
    if (this.user) {
      return this.user['isChef'];
    }
    return false;
  }

  private usersUrl = 'api/accounts';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getUid() {
    if (this.user) {
      return this.user['uid'];
    }
  }

  getAccounts(): Observable<Account[]> {

    return this.http.get<Account[]>(this.usersUrl)
      .pipe(
        catchError(this.handleError<Account[]>('getUsers', []))
      );

  }

  getAccount(id: number): Observable<Account> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<Account>(url).pipe(
      catchError(this.handleError<Account>(`user id=${id}`))
    );
  }

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

  getActiveUser(): Observable<Account> {
    const url = `${this.usersUrl}/${this.userId}`;
    return this.http.get<Account>(url).pipe(
      catchError(this.handleError<Account>(`user id=${this.userId}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }

}
