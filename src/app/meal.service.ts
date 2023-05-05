import { Injectable, inject } from '@angular/core';
import { Meal } from 'src/app/meal';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  fireStore: Firestore = inject(Firestore);
  fireAuth: AngularFireAuth = inject(AngularFireAuth);

  mealRef = collection(this.fireStore, 'meals');

  constructor() { }

  async getMeal(mealId: string): Promise<Meal> {
    let q = query(this.mealRef, where('id', '==', mealId));
    let querySnapshot = await getDocs(q);
    let meal: Meal = {
      id: '',
      dishName: '',
      partySize: 0,
      tags: [],
      dietaryRestrictions: [],
      cost: 0,
      location: '',
      startDate: new Date(),
      duration: 0,
      picture: '',
      chefId: '',
      ratings: [],
      accountsBooked: []
    };
    querySnapshot.forEach((doc) => {
      let data = doc.data()
      data['startDate'] = data['startDate'].toDate();
      meal = data as Meal;
    });
    return meal;
  }

  async getMeals(): Promise<Meal[]> {
    let meals: Meal[] = [];
    let q = query(this.mealRef, orderBy('startDate'));
    let querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let data = doc.data()
      data['startDate'] = data['startDate'].toDate();
      meals.push(data as Meal);
    });
    return meals;
  }

  async createMeal(meal: Meal): Promise<string> {
    let docRef = await addDoc(this.mealRef, meal);
    meal.id = docRef.id;
    await setDoc(docRef, meal);
    return docRef.id;
  }

  async updateMeal(mealId: string, meal: Meal) {
    let docRef = doc(this.mealRef, mealId);
    await updateDoc(docRef, meal as any);
  }

  async deleteMeal(mealId: string) {
    let docRef = doc(this.mealRef, mealId);
    await deleteDoc(docRef);
  }

  isValidMeal(meal: Meal): boolean {
    if (meal.dishName != '' && meal.cost != 0 && meal.partySize != 0
      && new Date(meal.startDate) >= new Date()
      && meal.duration != 0 && meal.location != '') {
      return true;
    }
    return false;
  }

  bookMeal(meal: Meal, uid: string) {
    meal.accountsBooked.push(uid);
    this.updateMeal(meal.id, meal);
  }

  unbookMeal(meal: Meal, uid: string) {
    let mealIndex = meal.accountsBooked.findIndex(x => x == uid);
    meal.accountsBooked.splice(mealIndex, 1);
    this.updateMeal(meal.id, meal);
  }

}
