import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {AbstractControl, ValidationErrors, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  constructor(private formBuilder:FormBuilder,private router: Router){}
  navigateToHomePage(){
    this.router.navigate(['/home'])
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
