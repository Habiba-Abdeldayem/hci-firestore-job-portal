import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/User';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  currentUser: User | null = null;
  userPhotoUrl: string = '../../assets/images/login_user.jpg';
  private currentUserSubscription!: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUserSubscription = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }

  printt(): void {
    console.log(this.currentUser?.name);
  }
}
