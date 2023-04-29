import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { FirebaseUIModule, firebase, firebaseui } from 'firebaseui-angular';
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { provideAuth,getAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MealDetailComponent } from './meal/meal-detail.component';
import { RouterModule } from '@angular/router';
import { MealListComponent } from './meal-list/meal-list.component';
import { EditMealComponent } from './edit-meal/edit-meal.component';
import { CreateMealComponent } from './create-meal/create-meal.component';
import { LoginComponent } from './login/login.component';
import { MealCardComponent } from './meal-card/meal-card.component';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
    },
  ],
};

@NgModule({
  declarations: [
    AppComponent,
    MealDetailComponent,
    MealListComponent,
    EditMealComponent,
    CreateMealComponent,
    LoginComponent,
    MealCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
  ],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
  bootstrap: [AppComponent]
})
export class AppModule { }
