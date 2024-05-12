import { Component } from '@angular/core';
import { ReactiveFormsModule , FormBuilder, FormsModule,Validators,ValidationErrors, NgForm } from '@angular/forms';
import { FireBaseService } from '../services/firebase.service';
import { User } from '../interfaces/User';



@Component({
  selector: 'app-edit-user-profile',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './edit-user-profile.component.html',
  styleUrl: './edit-user-profile.component.css'
})
export class EditUserProfileComponent {
  constructor(private firebaseService: FireBaseService, private formBuilder: FormBuilder) {}
  // userName: string = '';
  // userAge: number | null = null;
  // userEmail: string = '';
  // userPhoneNumber: string = '';
  userDepartment: string = 'testt';
  userInterests: string = 'testtt';
  // userCity: string = '';
  // userLocation: string = '';
  userPhotoUrl: string = '../../assets/images/login_user.jpg';

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
    const user: User = {
      name: this.editUserProfileForm.value.userName || '',
      age: parseInt(this.editUserProfileForm.value.age || '') ,
      email: this.editUserProfileForm.value.email  || '',
      location: this.editUserProfileForm.value.location  || '',
      phone: this.editUserProfileForm.value.phoneNumber || '',
      department: this.userDepartment,
      interested: this.userInterests
    };

    this.firebaseService.updateUserInfo(user);
  }
}
