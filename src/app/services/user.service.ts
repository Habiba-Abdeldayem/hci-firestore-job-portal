// user.service.ts
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isCompany: boolean = false;
  private username: string = '';

  constructor() { }

  // getUser() : User | null{
  //   return this.auth.currentUser;
  // }
  setIsCompany(value: boolean) {
    this.isCompany = value;
  }

  getIsCompany(): boolean {
    return this.isCompany;
  }

  setUsername(username: string) {
    this.username = username;
  }

  getUsername(): string {
    return this.username;
  }
}
