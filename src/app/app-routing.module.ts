import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LogInComponent } from './log-in/log-in.component';
import { ApplyForJobComponent } from './apply-for-job/apply-for-job.component';
import { PostJobComponent } from './post-job/post-job.component';
import {HomeComponent } from './home/home.component';
import {SavedJobComponent } from './saved-job/saved-job.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { EditUserProfileComponent } from './edit-user-profile/edit-user-profile.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { EditCompanyProfileComponent } from './edit-company-profile/edit-company-profile.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {path: '', component:SignupComponent},
  {path: 'signup', component:SignupComponent},
  {path: 'login', component:LogInComponent},
  {path: 'home', component:HomeComponent}, // modify it
  {path: 'saved-jobs', component:SavedJobComponent},
  {path: 'post-jobs', component:PostJobComponent},
  {path: 'com', component:ApplyForJobComponent},
  { path: 'job-details/:id', component: JobDetailsComponent },
  { path: 'apply-now/:id', component: ApplyForJobComponent },

  { path: 'user-profile', component: UserProfileComponent },
  { path: 'edit-profile', component: EditUserProfileComponent },
  { path: 'company-profile', component: CompanyProfileComponent },
  { path: 'edit-company-profile', component: EditCompanyProfileComponent },
  { path: 'search/:id', component: SearchComponent }




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
