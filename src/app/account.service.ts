import { Injectable, inject } from '@angular/core';
import { Account } from './account';
import { Firestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  userId?: string;
  account?: Account;
  fireStore: Firestore = inject(Firestore);
  fireAuth: AngularFireAuth = inject(AngularFireAuth);

  accountRef = collection(this.fireStore, 'accounts');

  constructor() {
    this.fireAuth.onAuthStateChanged(async user => {
      if (user) {
        this.userId = user.uid;
        this.account = await this.getAccountByUid(this.userId)
      }
      else {
        this.account = undefined;
      }
    })
  }

  getUid() {
    if (this.userId) {
      return this.userId;
    }
    return undefined;
  }

  async getAccountByUid(userId: string): Promise<Account> {
    let q = query(this.accountRef, where('uid', '==', userId));
    let querySnapshot = await getDocs(q);
    let account: Account = {
      uid: '',
      isChef: false,
      first: '',
      last: '',
      dietaryRestrictions: [],
      bio: '',
      profilePicture: '',
      ratings: { 'Diner': [], 'Chef': [] },
      username: '',
      password: '',
      mealsBooked: []
    }
    querySnapshot.forEach((doc) => {
      account = doc.data() as Account;
    });
    return account;
  }

  async accountExists(): Promise<boolean> {
    let docRef = doc(this.accountRef, this.userId);
    let docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return true;
    }
    else {
      return false;
    }
  }

  userIsChef(): boolean {
    if (this.account) {
      return this.account.isChef;
    }
    return false;
  }

  getAccount() {
    return this.account;
  }

  async createAccount(account: Account) {
    let docRef = doc(this.accountRef, this.userId);
    await setDoc(docRef, account);
  }

  async updateAccount(account: Account) {
    let docRef = doc(this.accountRef, this.userId);
    await updateDoc(docRef, account as any);
  }

  async deleteAccount() {
    let docRef = doc(this.accountRef, this.userId);
    await deleteDoc(docRef);
    this.fireAuth.currentUser.then(user => user?.delete())
  }

  bookMeal(mealId: string) {
    if (this.account) {
      this.account?.mealsBooked.push(mealId);
      this.updateAccount(this.account);
    }
  }

  unbookMeal(mealId: string) {
    if (this.account) {
      let mealIndex = this.account.mealsBooked.findIndex(x => x == mealId);
      this.account.mealsBooked.splice(mealIndex, 1);
      this.updateAccount(this.account);
    }
  }

  hasBookedMeal(mealId: string): boolean {
    if (this.account?.mealsBooked.includes(mealId)) {
      return true;
    }
    return false;
  }

}
