import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PostService } from '../services/post.service';
import { job } from '../interfaces/job';
import {Router} from '@angular/router';
@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})
export class PostJobComponent {
  @Output() jobAdded = new EventEmitter<void>(); // Event emitter to notify HomeComponent

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private router:Router,
  ) { }

  postJobForm = this.formBuilder.group({
    companyName: ['', [Validators.required]],
    jobTitle: ['', [Validators.required, Validators.maxLength(50)]],
    location: ['', [Validators.required]],
    salaryRange: ['', [Validators.required]],
    description: ['', [Validators.required, Validators.maxLength(500)]],
  });
  jobToEdit:job | undefined;
  ngOnInit() {
    this.jobToEdit = history.state.jobToEdit; // Retrieve job to edit from state
    if (this.jobToEdit) {
      // Populate form fields with existing job details for editing
      this.postJobForm.patchValue({
        companyName: this.jobToEdit.companyName,
        jobTitle: this.jobToEdit.jobTitle,
        location: this.jobToEdit.location,
        salaryRange: this.jobToEdit.salaryRange,
        description: this.jobToEdit.description
      });
    }
  }
  
  onSubmit() {
    if (this.postJobForm.valid) {
      const today: Date = new Date();
      const editedJob: Partial<job> = {
        id: this.jobToEdit ? this.jobToEdit.id : Math.floor(Math.random() * 1000), // Use jobToEdit.id if defined, otherwise generate a random number
        companyName: this.postJobForm.value.companyName || '',
        jobTitle: this.postJobForm.value.jobTitle || '',
        location: this.postJobForm.value.location || '',
        salaryRange: this.postJobForm.value.salaryRange || '',
        minSalary: 0,
        maxSalary: 0,
        description: this.postJobForm.value.description || '',
        isSaved: true,
        pausedate:today,
      };
      if (this.jobToEdit) {
        // this.postService.updateJob(editedJob as job);
      } else {
        this.postService.addJob(editedJob as job);
      }

      this.router.navigate(['/home']);
    }
  }
  } 
  
