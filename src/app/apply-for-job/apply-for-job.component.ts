import { Component } from '@angular/core';
import {AbstractControl, ValidationErrors, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { validateResumeFormat } from '../validators/resume-format.validator';

validateResumeFormat

@Component({
  selector: 'app-apply-for-job',
  templateUrl: './apply-for-job.component.html',
  styleUrl: './apply-for-job.component.css'
})
export class ApplyForJobComponent {
  constructor(private formBuilder:FormBuilder,private router: Router){}
 applyForJobForm = this.formBuilder.group({
    fullName: ['', Validators.required],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
    address: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    department: ['', Validators.required],
    jobType: ['', Validators.required],
    resume: ['', [Validators.required],

    // resume: ['', [Validators.required,validateResumeFormat],
  ]
  });
}
