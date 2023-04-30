import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from './account.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseUISignInFailure, FirebaseUISignInSuccessWithAuthResult } from 'firebaseui-angular';
import { Firestore } from '@angular/fire/firestore';
import { collection, doc, setDoc } from 'firebase/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HomeKitchen';

  fireStore: Firestore = inject(Firestore);
  fireAuth: AngularFireAuth = inject(AngularFireAuth);

  constructor(
    public accountService: AccountService,
    private router: Router,
    // public db: Firestore
  ) { }

  ngOnInit() { }

  async successLoginCallback(result: FirebaseUISignInSuccessWithAuthResult) {
    if((await this.accountService.accountExists()).valueOf()){
      this.router.navigate(['/home']);
    }
    else{
      this.router.navigate(['/account/create'])
    }
  }

  errorLoginCallback(result: FirebaseUISignInFailure) {

  }

}
