import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { UserService } from "./user.service";
import { User } from "../interfaces/User";
import { FireBaseService } from "./firebase.service";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class AuthService {
  isLoggedIn=false;
  isCompany=false;
  public currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  constructor(
    private afAuth: AngularFireAuth, 
    private router: Router,
    private firestore: AngularFirestore,
    public userServ: UserService,
    private firebaseService: FireBaseService
  ) {
    
  }
  
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

  async signup(username: string, email: string, password: string, isCompany: boolean) {
    try {
      await this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.firestore.collection("users").doc(res.user?.uid).set({
          id:res.user?.uid,
          name: username,
          email: email,
          password: password,
          isCompany: isCompany,
          usersID: res.user?.uid
        });
      });
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  async signin(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      const userDoc = await this.firestore.collection('users').doc(result.user?.uid).get().toPromise();
      if (userDoc) {
        const currentUser = userDoc.data() as User;
        this.setIsCompany(currentUser.isCompany);
        this.currentUserSubject.next(currentUser); // Update the subject
        console.log("User signed in:", currentUser);

      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }
  updateUserInfo(user:User){
    this.currentUserSubject.next(user); 
    this.firebaseService.updateUserInfo(user);
  }
  setIsCompany(value: boolean) {
    this.isCompany = value;
  }

  getIsCompany(): boolean {
    return this.isCompany;
  }

  // setUsername(username: string) {
  //   this.username = username;
  // }

  // getUsername(): string {
  //   return this.username;
  // }

  logout(): void {
    this.afAuth.signOut();
    this.currentUserSubject.next(null); // Clear currentUser in the subject
    this.router.navigate(['/login']);
  }
}
