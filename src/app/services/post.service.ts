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

  // private jobs: job[] = [
  //   {
  //     id:1,
  //     companyName:'UI company',
  //     jobTitle:'UI designer',
  //     location: '12 street nasr city',
  //     salaryRange: '8000~9000',
  //     minSalary:8000,
  //     maxSalary:9000,
  //     description: 'company that offer ui services',
  //     isSaved: true,
  //     pausedate:new Date()
  //   },
  //   {
  //     id: 2,
  //     companyName:'Back end company',
  //     jobTitle:'Back-End Developer',
  //     location: '30 street 6 october',
  //     salaryRange: '9000~10000',
  //     minSalary:9000,
  //     maxSalary:10000,
  //     description: 'company that offer back end services',
  //     isSaved: true,
  //     pausedate:new Date()
  //   },
  //   {
  //     id: 3,
  //     companyName:'Front end company',
  //     jobTitle:'Front-End Developer',
  //     location: '29 street el saida zinab',
  //     salaryRange: '7000~8000',
  //     minSalary:7000,
  //     maxSalary:8000,
  //     description: 'company that provide front end services',
  //     isSaved: true,
  //     pausedate:new Date()
  //   },
  //   {
  //     id: 4,
  //     companyName:'Test_company',
  //     jobTitle:'Test Engineering',
  //     location: '15 street elabassia',
  //     salaryRange: '5000~7000',
  //     minSalary:5000,
  //     maxSalary:7000,
  //     description: 'company that offer test services',
  //     isSaved: true,
  //     pausedate:new Date()
  //   },
    

  // ];
  private jobsSubject = new BehaviorSubject<job[]>([]);



  

  addJob(newJob: job) {
    this.jobs.push(newJob);
    this.firebaseService.addOrUpdateJob(newJob);
    this.jobsSubject.next(this.jobs);
  }

  updateJob(updatedJob: job) {
    const index = this.jobs.findIndex(job => job.id === updatedJob.id);
    // this.firebaseService.addOrUpdateJob(updatedJob);

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

  getJobs() {
    return this.firebaseService.getJobs();
  }
  getJobDetails(jobId:number){
    return this.jobs[jobId];   
  }
}
