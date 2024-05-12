// app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './log-in/log-in.component';
import { PostJobComponent } from './post-job/post-job.component';
import { ApplyForJobComponent } from './apply-for-job/apply-for-job.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { firebaseConfig } from './firebase-config';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { SavedJobComponent } from './saved-job/saved-job.component';
import { PauseDialogComponent } from './pause-dialog-component/pause-dialog-component.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FirestoreModule, provideFirestore } from '@angular/fire/firestore'; // Import FirestoreModule
import { AngularFireAuthModule } from '@angular/fire/compat/auth'; // Import AngularFireAuthModule
import { FirebaseAppModule, provideFirebaseApp } from '@angular/fire/app'; // Import FirebaseAppModule
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { SearchComponent } from './search/search.component';
import { SearchApplicantsComponent } from './search-applicants/search-applicants.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    SignupComponent,
    PostJobComponent,
    ApplyForJobComponent,
    JobDetailsComponent,
    UserProfileComponent,
    HomeComponent,
    SavedJobComponent,
    PauseDialogComponent,
    CompanyProfileComponent,
    SearchComponent,
    SearchApplicantsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    AppRoutingModule,
    FormsModule,
    MatIconModule,
    MatSlideToggleModule,
    RouterModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AngularFireModule.initializeApp(firebaseConfig),
    FirestoreModule, // Add FirestoreModule
    AngularFireAuthModule, // Add AngularFireAuthModule
    FirebaseAppModule, // Add FirebaseAppModule
    HttpClientModule,
    CommonModule,
    provideFirebaseApp(() => 
      initializeApp({  apiKey: "AIzaSyAqicjQ37TRJE8rTDrTerHN6EVdqZemfJU",
    authDomain: "job-portal-340aa.firebaseapp.com",
    projectId: "job-portal-340aa",
    storageBucket: "job-portal-340aa.appspot.com",
    messagingSenderId: "385116633606",
    appId: "1:385116633606:web:2704e5bedc66da8ee12187"})
  ),
  provideFirestore(()=>getFirestore())
  ],
  providers: [
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
