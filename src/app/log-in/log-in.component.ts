import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {AbstractControl, ValidationErrors, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  constructor(private formBuilder:FormBuilder,private router: Router, public fAuth:AuthService){}
  loginError = false;


  async login(email: string, password: string) {
    try {
      await this.fAuth.signin(email, password);
      // If login is successful, navigate to home page
      this.router.navigate(['/home']);
    } catch (error: any) {
      console.error('Login error:', error);
      this.loginError = true;

    }
  }
  

  loginForm = this.formBuilder.group({
  email: ['', [
    Validators.required,
    Validators.email,
  ]],
  password: ['', [
    Validators.required,
  ]]
  });

}
