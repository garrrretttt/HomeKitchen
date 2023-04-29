import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from './account.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseUISignInFailure, FirebaseUISignInSuccessWithAuthResult } from 'firebaseui-angular';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HomeKitchen';

  constructor(
    public accountService: AccountService,
    public fireAuth: AngularFireAuth,
    // public db: Firestore
  ) {}

  ngOnInit(){}

  successLoginCallback(result: FirebaseUISignInSuccessWithAuthResult){
    
  }

  errorLoginCallback(result: FirebaseUISignInFailure){
    
  }

}
