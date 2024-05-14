import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FirebaseServerApp } from 'firebase/app';
import { FireBaseService } from '../services/firebase.service';
import { job } from '../interfaces/job';
import { User } from '../interfaces/User';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  jobId: string = ''; 
  jobb!: job;
  currentUser: User | null = null;
  private currentUserSubscription!: Subscription;
  
  // filteredHeroes!: any[]; // Use non-null assertion operator
  filteredHeroes: any[] = [];
  appliedUsersObjects:Array<User>=[];
  appliedUsersids:Array<string>=[];




  constructor(private router: Router,
    private route: ActivatedRoute, private fireService:FireBaseService,
    private authService:AuthService
  ){}

  ngOnInit(): void {
    
    this.currentUserSubscription = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
    // Retrieve the job ID from the route parameters
    this.route.paramMap.subscribe(params => {
      this.jobId = params.get('id') ?? ''; // Use nullish coalescing operator
      // Use the job ID to fetch the job details from your service
      console.log("jobb id " + this.jobId);
      
      this.fireService.getJobDetails(this.jobId).subscribe(
        jobDetails => {
          this.jobb = jobDetails;
          console.log("on details page: ", this.jobb);
          this.appliedUsersids = this.jobb.applicantsId;
          console.log("iddd " + this.jobb.applicantsId);
          this.appliedUsersids.forEach(userId=>{
            this.fireService.getUserByEmail(userId).subscribe(
              user => {
                this.appliedUsersObjects.push(user); // Push the emitted user object into the array
              },
              error => {
                console.error('Error fetching user:', error);
              }
            );
          });
          this.filteredHeroes = this.appliedUsersObjects;

        },
        error => {
          console.error("Error fetching job details:", error);
        }
      );
    });
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }


  searchText: string = '';
  applicants = [
    { name:'Habiba Mohamed',email:'Habiba@gmail.com',phoneNumber:'02484848',address:"cairo",department:"sales",interested_in:"Design",cv:"Habiba.pdf" },
    { name:"Rokaia",email:"Habiba@gmail.com",phoneNumber:'02484848',address:"cairo",department:"sales",interested_in:"Design",cv:"Habiba.pdf" },
    { name:"Eman",email:"Habiba@gmail.com",phoneNumber:'02484848',address:"cairo",department:"sales",interested_in:"Design",cv:"Habiba.pdf" },
    { name:"Shimaa",email:"Habiba@gmail.com",phoneNumber:'02484848',address:"cairo",department:"sales",interested_in:"Design",cv:"Habiba.pdf" },

  ];


  filterHeroes() {
    if (!this.searchText) {
      // this.filteredHeroes = this.applicants;
      console.log("hhh " + this.filterHeroes )
    } else {
      this.filteredHeroes = this.filteredHeroes.filter(applicant =>
        applicant.name.toLowerCase().includes(this.searchText) || applicant.email.toLowerCase().includes(this.searchText)|| applicant.phoneNumber.toLowerCase().includes(this.searchText)|| applicant.address.toLowerCase().includes(this.searchText)|| applicant.department.toLowerCase().includes(this.searchText)|| applicant.interested_in.toLowerCase().includes(this.searchText)|| applicant.cv.toLowerCase().includes(this.searchText)
      );
    }
  }
}
