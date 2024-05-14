import { Component } from '@angular/core';
import { User } from '../interfaces/User';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrl: './company-profile.component.css'
})
export class CompanyProfileComponent {
  currentUser: User | null = null;
  userPhotoUrl: string = '../../assets/images/login_user.jpg';
  private currentUserSubscription!: Subscription;

  constructor(private authService: AuthService, private router:Router) {}

  ngOnInit(): void {
    this.currentUserSubscription = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }

  
  

}
