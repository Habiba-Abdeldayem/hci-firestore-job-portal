import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { job } from '../interfaces/job';
import { FireBaseService } from '../services/firebase.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent {
  jobId: string = ''; 
  jobb!: job;
  
  constructor(private route: ActivatedRoute, private postService: PostService
    , private fireService:FireBaseService , private router:Router
  ) { }
  
  ngOnInit(): void {
    // Retrieve the job ID from the route parameters
    this.route.paramMap.subscribe(params => {
      this.jobId = params.get('id') ?? ''; // Use nullish coalescing operator
      // Use the job ID to fetch the job details from your service
      
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

  applyNow(){
    this.router.navigate(['/apply-now', this.jobId]);
  }
}
