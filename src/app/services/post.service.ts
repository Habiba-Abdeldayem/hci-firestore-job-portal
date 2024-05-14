import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { job } from '../interfaces/job';
import { FireBaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  jobs:job[] = [];
  constructor(private firebaseService:FireBaseService) {
    this.firebaseService.getJobs().subscribe((jobs: job[]) => {
      this.jobs = jobs;
    });
   }

  private jobsSubject = new BehaviorSubject<job[]>([]);

  addJob(newJob: job) {
    this.jobs.push(newJob);
    this.firebaseService.addOrUpdateJob(newJob);
    this.jobsSubject.next(this.jobs);
  }

  updateJob(updatedJob: job) {
    const index = this.jobs.findIndex(job => job.id === updatedJob.id);
    this.firebaseService.addOrUpdateJob(updatedJob);

    if (index !== -1) {
      this.jobs[index] = updatedJob;
      this.jobsSubject.next([...this.jobs]); // Emitting a new array to trigger the observable
    }
  }
  changeSavingStatus(job: job) {
    const index = this.jobs.findIndex(j => j.id === job.id);
    if (index !== -1) {
      this.jobs[index].isSaved = true;
      this.jobsSubject.next([...this.jobs]); // Emitting a new array to trigger the observable
    }
  }
}
