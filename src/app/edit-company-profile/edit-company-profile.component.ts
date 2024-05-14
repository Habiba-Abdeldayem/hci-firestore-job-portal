import { Component } from '@angular/core';
import { User } from '../interfaces/User';
import { Subscription } from 'rxjs';
import { FireBaseService } from '../services/firebase.service';
import { AuthService } from '../services/auth.service';
import { Route, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-company-profile',
  templateUrl: './edit-company-profile.component.html',
  styleUrl: './edit-company-profile.component.css'
})
export class EditCompanyProfileComponent {
  
  currentUser: User | null = null;
  private currentUserSubscription!: Subscription;
  constructor(private firebaseService: FireBaseService, 
    private authService:AuthService,
     private router:Router,
    private formBuilder:FormBuilder) {}

  ngOnInit(): void {
    this.currentUserSubscription = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
    console.log("initt " + this.currentUser?.id);
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }

  editUserProfileForm = this.formBuilder.group({
    userName: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z0-9_]*$/) // Only letters, numbers, and underscores allowed
      ]
    ],
    email: ['', [Validators.required,Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
    aboutUs:[''],
    phone:['']

  }, 
  );

  saveProfile(): void {
    if (this.currentUser && this.currentUser.id) {
      const user: User = {
        id: this.currentUser.id,
        name: this.editUserProfileForm.value.userName || '',
        age: 0 ,
        email: this.currentUser.email  || '',
        location:'',
        phone: this.editUserProfileForm.value.phone || '',
        department: '',
        interested: '',
        aboutAs: this.editUserProfileForm.value.aboutUs || '',
        isCompany:true
      };
      console.log(this.currentUser?.id);
      this.authService.updateUserInfo(user);
      this.router.navigate(['/company-profile']);
    } else {
      // Handle case where currentUser or id is not available
      console.error('Current user or id is not available');
    }
  }

}
