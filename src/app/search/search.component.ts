import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchText: string = '';
  applicants = [
    { name:'Habiba Mohamed',email:'Habiba@gmail.com',phoneNumber:'02484848',address:"cairo",department:"sales",interested_in:"Design",cv:"Habiba.pdf" },
    { name:"Rokaia",email:"Habiba@gmail.com",phoneNumber:'02484848',address:"cairo",department:"sales",interested_in:"Design",cv:"Habiba.pdf" },
    { name:"Eman",email:"Habiba@gmail.com",phoneNumber:'02484848',address:"cairo",department:"sales",interested_in:"Design",cv:"Habiba.pdf" },
    { name:"Shimaa",email:"Habiba@gmail.com",phoneNumber:'02484848',address:"cairo",department:"sales",interested_in:"Design",cv:"Habiba.pdf" },

  ];

  filteredHeroes!: any[]; // Use non-null assertion operator

  constructor() {}

  ngOnInit(): void {
    this.filteredHeroes = this.applicants;
  }

  filterHeroes() {
    if (!this.searchText) {
      this.filteredHeroes = this.applicants;
    } else {
      this.filteredHeroes = this.applicants.filter(applicant =>
        applicant.name.toLowerCase().includes(this.searchText) || applicant.email.toLowerCase().includes(this.searchText)|| applicant.phoneNumber.toLowerCase().includes(this.searchText)|| applicant.address.toLowerCase().includes(this.searchText)|| applicant.department.toLowerCase().includes(this.searchText)|| applicant.interested_in.toLowerCase().includes(this.searchText)|| applicant.cv.toLowerCase().includes(this.searchText)
      );
    }
  }
}
