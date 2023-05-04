import { Injectable, inject } from '@angular/core';
import { Rating } from './rating';
import { Firestore, addDoc } from '@angular/fire/firestore';
import { collection, getDocs, orderBy, query, setDoc, where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  fireStore: Firestore = inject(Firestore);

  constructor() { }

  async getRatings(uid: string): Promise<Rating[]> {
    let ratings: Rating[] = [];
      let q = query(collection(this.fireStore, 'ratings'), where('ratedUid', '==', uid), orderBy('date', 'desc'));
      let querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        ratings.push(doc.data() as Rating);
      });
    return ratings;
  }

  async createRating(rating: Rating){
    let docRef = await addDoc(collection(this.fireStore, 'ratings'), rating);
    rating.id = docRef.id;
    await setDoc(docRef, rating);
  }

}
