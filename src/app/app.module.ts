import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FirebaseUIModule, firebase } from 'firebaseui-angular';
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MealDetailComponent } from './meal/meal-detail.component';
import { MealListComponent } from './meal-list/meal-list.component';
import { EditMealComponent } from './edit-meal/edit-meal.component';
import { CreateMealComponent } from './create-meal/create-meal.component';
import { MealCardComponent } from './meal-card/meal-card.component';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { CreateAccountComponent } from './create-account/create-account.component';
import { AccountComponent } from './account/account.component';
import { EditAccountComponent } from './edit-account/edit-account.component';

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false
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
    MealCardComponent,
    CreateAccountComponent,
    AccountComponent,
    EditAccountComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatStepperModule,
    MatTabsModule,
    MatSidenavModule,
    MatListModule,
    BrowserAnimationsModule,
  ],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
  bootstrap: [AppComponent]
})
export class AppModule { }
