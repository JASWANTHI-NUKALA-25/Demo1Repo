import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { loggedInService } from '../medicines-cart/loggedIn-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:9000/user'; // Replace with your actual API base URL
  

  constructor(private http: HttpClient, private logged: loggedInService) {}

  addWalletBalance(userId: any, walletBalance: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/${userId}/${walletBalance}`, {});
  }

  updateUser(userId: number, user: any): Observable<any> {
    console.log(user);
    return this.http.put(`${this.baseUrl}/updateUser/${userId}`, user,{ responseType:'json' });
  }
  updateUserPassword(userEmail: string, newPassword: string): Observable<any> {
    const url = `${this.baseUrl}/updatePassword/${userEmail}?newPassword=${newPassword}`;
    return this.http.put(url, {});
  }

}
