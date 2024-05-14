import { Component } from '@angular/core';
import { User } from './interfaces/User';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Job Portal';
constructor(private authService:AuthService){}
  
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
  logout(){
    this.authService.logout();
   }
}

