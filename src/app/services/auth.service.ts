import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import {Router} from "@angular/router";

@Injectable({
    providedIn:'root'
})

export class AuthService {
    constructor(private afAuth: AngularFireAuth, private router: Router) {}
  
    async register(email: string, password: string): Promise<void> {
      try {
        const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
        // Optionally, you can do something with the user result, such as send a verification email
        console.log('Registration successful:', result.user);
        // Redirect the user to another page, such as the login page
        this.router.navigate(['/login']);
      } catch (error) {
        // Handle errors, such as displaying an error message to the user
        console.error('Registration error:', error);
        // Optionally, you can throw the error to handle it in the component
        throw error;
      }
    }
  }
  