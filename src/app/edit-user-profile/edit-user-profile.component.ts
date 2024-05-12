import { Component } from '@angular/core';
import { ReactiveFormsModule , FormBuilder, FormsModule,Validators,ValidationErrors, NgForm } from '@angular/forms';
import { FireBaseService } from '../services/firebase.service';
import { User } from '../interfaces/User';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-edit-user-profile',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './edit-user-profile.component.html',
  styleUrl: './edit-user-profile.component.css'
})
export class EditUserProfileComponent {

  currentUser: User | null = null;
  userPhotoUrl: string = '../../assets/images/login_user.jpg';
  private currentUserSubscription!: Subscription;

  ngOnInit(): void {
    this.currentUserSubscription = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
    console.log("initt " + this.currentUser?.id);
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }
  constructor(private firebaseService: FireBaseService, private authService:AuthService, private formBuilder: FormBuilder, private router:Router) {}
  userDepartment: string = 'testt';
  userInterests: string = 'testtt';


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
    age: ['', [Validators.required, Validators.min(12),Validators.max(100)]],
    location: ['', [Validators.required, Validators.maxLength(50)]],
    email: ['', [Validators.required,Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],

  }, 
  );

  saveProfile(): void {
    if (this.currentUser && this.currentUser.id) {
      const user: User = {
        id: this.currentUser.id,
        name: this.editUserProfileForm.value.userName || '',
        age: parseInt(this.editUserProfileForm.value.age || '') ,
        email: this.editUserProfileForm.value.email  || '',
        location: this.editUserProfileForm.value.location  || '',
        phone: this.editUserProfileForm.value.phoneNumber || '',
        department: this.userDepartment,
        interested: this.userInterests
      };
      console.log(this.currentUser?.id);
      this.firebaseService.updateUserInfo(user);
      this.router.navigate(['/user-profile']);
    } else {
      // Handle case where currentUser or id is not available
      console.error('Current user or id is not available');
    }
  }
}
