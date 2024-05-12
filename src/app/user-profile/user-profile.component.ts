import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  userName: string = 'John Doe';
  userAge: number = 30;
  userCity: string = 'New York';
  userLocation: string = 'USA';
  userPhotoUrl: string = '../../assets/images/login_user.jpg';
  userEmail: string = 'john.doe@example.com';
  userPhoneNumber: string = '+1234567890';
  userDepartment: string = 'Computer Science';
  userInterests: string = 'Web Development, Machine Learning';
}
