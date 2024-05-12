import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { job } from '../interfaces/job';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private savedJobsSubject = new BehaviorSubject<job[]>([]);
  savedJobs$ = this.savedJobsSubject.asObservable();

  constructor() {
    // Retrieve saved jobs from browser storage on service initialization
    this.loadSavedJobs();
  }

  saveJob(job: job) {
    const currentSavedJobs = this.savedJobsSubject.value;
    const updatedSavedJobs = [...currentSavedJobs, job];
    this.savedJobsSubject.next(updatedSavedJobs);
    // Save updated saved jobs to browser storage
    this.saveSavedJobs(updatedSavedJobs);
  }

  removeSavedJob(job: job) {
    const currentSavedJobs = this.savedJobsSubject.value;
    const updatedSavedJobs = currentSavedJobs.filter(savedJob => savedJob.id !== job.id);
    this.savedJobsSubject.next(updatedSavedJobs);
    // Save updated saved jobs to browser storage
    this.saveSavedJobs(updatedSavedJobs);
  }

  getSavedJobs(): job[] {
    return this.savedJobsSubject.value;
  }

  private saveSavedJobs(savedJobs: job[]) {
    localStorage.setItem('savedJobs', JSON.stringify(savedJobs)); // Save saved jobs to localStorage
  }

  private loadSavedJobs() {
    const savedJobsJson = localStorage.getItem('savedJobs');
    if (savedJobsJson) {
      const savedJobs = JSON.parse(savedJobsJson);
      this.savedJobsSubject.next(savedJobs);
    }
  }
}