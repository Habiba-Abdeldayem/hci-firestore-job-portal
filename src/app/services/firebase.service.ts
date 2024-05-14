import { Injectable } from "@angular/core";
import { Firestore, collection,collectionData,DocumentReference } from "@angular/fire/firestore";

import { Observable } from "rxjs";
import { addDoc, deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

import { user } from "@angular/fire/auth";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { job } from "../interfaces/job";
import { User } from "../interfaces/User";
import { coerceStringArray } from "@angular/cdk/coercion";

@Injectable({
    providedIn: 'root' // to have singleton
  })
  
  
  export class FireBaseService{
    constructor(private firestore:Firestore, private http:HttpClient){}
    usersUrl = 'https://firestore.googleapis.com/v1/projects/job-portal-340aa/databases/(default)/documents/users'
    jobsUrl = 'https://firestore.googleapis.com/v1/projects/job-portal-340aa/databases/(default)/documents/jobs'

    getUsers(): Observable<User[]> {
        return this.http.get<any>(this.usersUrl).pipe(
          map(response => {
            if (response.documents) {
              const users = response.documents.map((doc: any) => doc.fields);
              return users.map((userData: any)  => {
                if (true) {
                  return this.mapApplicantUserDataToUser(userData);
                }
                return null;
              });
            } else {
              return []; // Return an empty array if documents array is not available
            }
          })
        );
      }

      updateUserInfo(user: any) {
        console.log("update firesroe " + user.id);
        const usersCollection = collection(this.firestore,'users');
        const userDocument = doc(usersCollection,user.id);
        updateDoc(userDocument,user);
        
    }
    getUserByEmail(email: string): Observable<User> {
        return this.http.get<any>(this.usersUrl).pipe(
          map(response => {
            // Extract user data from the response
            const users = response.documents.map((doc: any) => doc.fields);
            // Find user data with matching email
            const userData = users.find((userData: any) => userData.email && userData.email.stringValue === email);
            if (userData) {
              // Map user data to User object
              return this.mapApplicantUserDataToUser(userData);
            } else {
              throw new Error('User not found');
            }
          })
        );
      }
      getApplicants(jobId:string){
        const jobb=this.getJobDetails(jobId);
        
      }
      getJobs():Observable<job[]>{
        const jobsCollection = collection(this.firestore, 'jobs');
        const jobs = collectionData(jobsCollection);
        console.log(jobs)
        return jobs as Observable<job[]>;
      }
      deleteJobs(idToRemove: number) {
        const jobsCollectionRef = collection(this.firestore, 'jobs');
        const jobDocRef = doc(jobsCollectionRef, idToRemove.toString());
        deleteDoc(jobDocRef);
        console.log("job deleted!");
        
      }
      addOrUpdateJob(newJob:job): void {
        const jobsCollection = collection(this.firestore, 'jobs');
        const jobId = newJob.id.toString();
        const jobDoc = doc(jobsCollection, jobId);
        console.log('Job Added!');
        setDoc(jobDoc, newJob);
      }

      getJobDetails(id: string): Observable<job> {
        return this.http.get<any>(this.jobsUrl).pipe(
          map(response => {
            // Check if response contains documents array
            if (response.documents) {
              // Map job documents to job objects
              const jobs = response.documents.map((doc: any) => doc.fields);
              // Find job with matching ID
              const jobData = jobs.find((jobData: any) => jobData.id && jobData.id.integerValue === id);
              if (jobData) {
                // Map job data to job object
                return this.mapJobDataToJobObj(jobData);
              } else {
                throw new Error('Job not found');
              }
            } else {
              throw new Error('Invalid response format: documents array not found');
            }
          }),
       )
       
      }
      getJobByCompanyName(companyName: string): Observable<job> {
        return this.http.get<any>(this.jobsUrl).pipe(
          map(response => {
            // Extract user data from the response
            const jobs = response.documents.map((doc: any) => doc.fields);
            // Find user data with matching email
            const jobData = jobs.find((jobData: any) => jobData.companyName && jobData.companyName.stringValue === companyName);
            if (jobData) {
              // Map user data to User object
              return this.mapJobDataToJobObj(jobData);
            } else {
              throw new Error('job not found');
            }
          })
        );
      }

      applyForJob(jobId: string, applicantId: any): void {
        this.getJobDetails(jobId).subscribe((appliedJob) => {
          if (appliedJob) {
            // Access the applicantsId array from the applied job object
            const applicantsId: Array<string> = Array.isArray(appliedJob.applicantsId) ? appliedJob.applicantsId : [];
      
            // Check if the applicant's ID already exists in the array
            if (!applicantsId.includes(applicantId)) {
              // Add the applicant's ID to the applicantsId array
              applicantsId.push(applicantId);
      
              // Update the job document in Firestore with the updated applicantsId array
              const jobRef = doc(this.firestore, 'jobs', jobId);
              updateDoc(jobRef, { applicantsId })
                .then(() => {
                  console.log(`Applicant ${applicantId} applied for job ${jobId} successfully.`);
                })
                .catch((error) => {
                  console.error('Error applying for job:', error);
                });
            } else {
              console.log(`Applicant ${applicantId} has already applied for job ${jobId}.`);
            }
          } else {
            console.error(`Job details not found for job ID ${jobId}.`);
          }
        });
      }
      
      
      
      
    
    private mapApplicantUserDataToUser(userData: any): User {
    const namee = userData.name && userData.name.stringValue ? userData.name.stringValue : ''; // Check if userData.name exists and is not undefined
    const idd = userData.idd && userData.idd.stringValue ? userData.idd.stringValue : ''; // Check if userData.name exists and is not undefined

    const age = userData.age && userData.age.integerValue ? userData.age.integerValue : 0; // Check if userData.age exists and is not undefined
    const email = userData.email && userData.email.stringValue ? userData.email.stringValue : ''; // Check if userData.name exists and is not undefined
    
    const city = userData.city && userData.city.stringValue ? userData.city.stringValue : ''; // Check if userData.name exists and is not undefined
    const location = userData.location && userData.location.stringValue ? userData.location.stringValue : ''; // Check if userData.name exists and is not undefined
    const phone = userData.phone && userData.phone.stringValue ? userData.phone.stringValue : ''; // Check if userData.name exists and is not undefined
    const department = userData.department && userData.department.stringValue ? userData.department.stringValue : ''; // Check if userData.name exists and is not undefined
    const interested = userData.interested && userData.interested.stringValue ? userData.interested.stringValue : ''; // Check if userData.name exists and is not undefined
    const aboutAs = userData.aboutAs && userData.aboutAs.stringValue ? userData.aboutAs.stringValue : ''; // Check if userData.name exists and is not undefined
    const isCompany = userData.isCompany && userData.isCompany.booleanValue ? userData.isCompany.booleanValue : false; // Check if userData.name exists and is not undefined
    const user = new User(idd,namee,age,email,location,phone,department,interested,aboutAs,isCompany);
    return user;
}

private mapJobDataToJobObj(jobData: any): job {
  const id = jobData.id && jobData.id.integerValue ? jobData.id.integerValue : 0;
  const companyName = jobData.companyName && jobData.companyName.stringValue ? jobData.companyName.stringValue : '';
  const jobTitle = jobData.jobTitle && jobData.jobTitle.stringValue ? jobData.jobTitle.stringValue : '';
  const location = jobData.location && jobData.location.stringValue ? jobData.location.stringValue : '';
  const salaryRange = jobData.salaryRange && jobData.salaryRange.stringValue ? jobData.salaryRange.stringValue : '';
  const minSalary = jobData.minSalary && jobData.minSalary.integerValue ? jobData.minSalary.integerValue : 0;
  const maxSalary = jobData.maxSalary && jobData.maxSalary.integerValue ? jobData.maxSalary.integerValue : 0;
  const description = jobData.description && jobData.description.stringValue ? jobData.description.stringValue : '';
  const isSaved = jobData.isSaved && jobData.isSaved.booleanValue ? jobData.isSaved.booleanValue : false;
  const applicantsId = jobData.applicantsId? jobData.applicantsId : null;


  // Retrieve pausedate, assuming it's stored as a timestamp field in userData
  const pausedate = jobData.pausedate && jobData.pausedate.timestampValue ? new Date(jobData.pausedate.timestampValue) : new Date();
  const jobDetails: job = {
    id,
    companyName,
    jobTitle,
    location,
    salaryRange,
    minSalary,
    maxSalary,
    description,
    isSaved,
    pausedate,
    applicantsId
  };
  return jobDetails;

}


}
