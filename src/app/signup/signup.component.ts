// signup.component.ts
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

////////////////////

isSignedIn =false
// constructor(public fAuth: AuthService, public router: Router, public alertCtrl: AlertController, private firestore: AngularFirestore) { } 
// ngOnInit() {
//   if (localstorage.getItem('user') !== null)
//     this.isSignedIn = true
//     else
//     this.issignedIn = false

//  }

/////////////////////////

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    public fAuth:AuthService
  ) {}

  signUpForm = this.formBuilder.group({
    userName: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z0-9_]*$/) // Only letters, numbers, and underscores allowed
      ]
    ],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]],
    isCompany: [false], // Default value set here
  });

  register(): void {
  const { userName, email, password } = this.signUpForm.value;
  const isCompany = this.signUpForm.get('isCompany')?.value as boolean; // Ensure isCompany is boolean

  // Set user details in the UserService
  this.userService.setUsername(userName||'');
  this.userService.setIsCompany(isCompany);

  // Proceed with any other registration logic (e.g., API calls, validation)

  // For example, navigate to login after registration
  this.router.navigate(['/login']);
}

// async onSignup ( username:string, email: string, password: string) {
//   await this.fAuth.signup ( username, email, password).then(result => {
 
//  // if (this.fAuth.isLoggedIn){
//  // this.issignedIn = true
//  // this.router.navigate(['tabs']);
//  // }
//  });
//  // const alert = await this.alertCtrl.create({
//  // header: "Registered",
//  // message: "Registered Successfully",
//  // buttons: ['OK']
//  // });
//  // alert.present();
//  }
 



////////try with company cheackbx//////////

async onSignup ( username:string, email: string, password: string,isCompany:boolean) {
 await this.fAuth.signup ( username, email, password,isCompany).then(result => {

  const { userName, email, password } = this.signUpForm.value;
  const isCompany = this.signUpForm.get('isCompany')?.value as boolean; // Ensure isCompany is boolean

  // Set user details in the UserService
  this.userService.setUsername(userName||'');
  this.userService.setIsCompany(isCompany);


// if (this.fAuth.isLoggedIn){
// this.issignedIn = true
// this.router.navigate(['tabs']);
// }
});
// const alert = await this.alertCtrl.create({
// header: "Registered",
// message: "Registered Successfully",
// buttons: ['OK']
// });
// alert.present();
}


///////////////////

}
