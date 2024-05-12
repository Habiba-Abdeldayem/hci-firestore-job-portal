// user.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isCompany: boolean = false;
  private username: string = '';

  constructor() { }

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
