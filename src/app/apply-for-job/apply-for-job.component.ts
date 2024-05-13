import { Component } from '@angular/core';
import {AbstractControl, ValidationErrors, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { validateResumeFormat } from '../validators/resume-format.validator';
import { FireBaseService } from '../services/firebase.service';
import { job } from '../interfaces/job';

validateResumeFormat

@Component({
  selector: 'app-apply-for-job',
  templateUrl: './apply-for-job.component.html',
  styleUrl: './apply-for-job.component.css'
})
export class ApplyForJobComponent {
  jobId: string = ''; 
  jobb!: job;


  constructor(private formBuilder:FormBuilder,private router: Router,
    private route: ActivatedRoute, private fireService:FireBaseService
  ){}
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

  ngOnInit(): void {
    // Retrieve the job ID from the route parameters
    this.route.paramMap.subscribe(params => {
      this.jobId = params.get('id') ?? ''; // Use nullish coalescing operator
      // Use the job ID to fetch the job details from your service
      console.log("jobb id " + this.jobId);
      
      this.fireService.getJobDetails(this.jobId).subscribe(
        jobDetails => {
          this.jobb = jobDetails;
          console.log("on details page: ", this.jobb);
        },
        error => {
          console.error("Error fetching job details:", error);
        }
      );
    });
  }
}
