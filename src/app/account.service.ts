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
    return '';
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
      mealsBooked: [],
      mealsCreated: []
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

  async getAccount(id?: string): Promise<Account> {
    if (id) {
      return await this.getAccountByUid(id);
    }
    else if (this.account) {
      return this.account
    }
    else {
      return await this.getAccountByUid(this.getUid())
    }
  }

  async createAccount(account: Account) {
    let docRef = doc(this.accountRef, this.userId);
    await setDoc(docRef, account);
  }

  async updateAccount(account: Account) {
    this.account = account;
    let docRef = doc(this.accountRef, this.userId);
    await updateDoc(docRef, account as any);
  }

  async deleteAccount() {
    let docRef = doc(this.accountRef, this.userId);
    await deleteDoc(docRef);
    this.fireAuth.currentUser.then(user => user?.delete())
  }

  createMeal(mealId: string) {
    if (this.account) {
      this.account.mealsCreated.push(mealId);
      this.updateAccount(this.account);
    }
  }

  deleteMeal(mealId: String) {
    if (this.account) {
      let mealIndex = this.account.mealsCreated.findIndex(x => x == mealId);
      this.account.mealsCreated.splice(mealIndex, 1);
      this.updateAccount(this.account);
    }
  }

  isMealChef(mealId: string): boolean {
    if (this.account?.mealsCreated.includes(mealId)) {
      return true;
    }
    return false;
  }

  bookMeal(mealId: string) {
    if (this.account) {
      this.account.mealsBooked.push(mealId);
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

  async hasBookedMeal(mealId: string): Promise<boolean> {
    let hasBooked = (await this.getAccount()).mealsBooked.includes(mealId);
    if (this.account) {
      return this.account.mealsBooked.includes(mealId);
    }
    return hasBooked;
  }

  async getBookedMeals(): Promise<string[]> {
    let mealIds: string[] = (await this.getAccount()).mealsBooked;
    return mealIds;
  }

  async getCreatedMeals(): Promise<string[]> {
    let mealIds: string[] = (await this.getAccount()).mealsCreated;
    return mealIds;
  }

}
