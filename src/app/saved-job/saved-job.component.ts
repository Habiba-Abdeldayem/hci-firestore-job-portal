import { Component, OnInit } from '@angular/core';
import { job } from '../interfaces/job';
import { JobService } from '../services/job.service';
import {Router} from '@angular/router';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-saved-job',
  templateUrl: './saved-job.component.html',
  styleUrls: ['./saved-job.component.css']
})
export class SavedJobComponent implements OnInit {
  savedJobs: job[] = [];
  
  constructor(private jobService: JobService,private router: Router,private postService:PostService) {}

  ngOnInit() {
    this.savedJobs = this.jobService.getSavedJobs(); // Retrieve saved jobs from service
  }
  
  viewDetails(job: job) {
    this.router.navigate(['/job-details']);
    
  }

  unsaveJob(job: job) {
    this.postService.changeSavingStatus(job);// Remove job from saved list
    this.jobService.removeSavedJob(job);
    this.savedJobs = this.jobService.getSavedJobs(); // Update saved jobs list
  }

  
}