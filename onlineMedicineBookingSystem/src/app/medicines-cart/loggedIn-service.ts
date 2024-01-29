import { Injectable } from '@angular/core';
 
@Injectable({
  providedIn: 'root',
})
export class loggedInService {
  private loggedInUserInfo: any;
 
  setLoggedInUserInfo(user: any): void {
    this.loggedInUserInfo = user;
  }
 
  getLoggedInUserInfo():any {
    return this.loggedInUserInfo;
  }
}