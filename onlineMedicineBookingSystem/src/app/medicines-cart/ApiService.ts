// api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { loggedInService } from './loggedIn-service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:9000'; // Replace with your actual API URL

  constructor(private http: HttpClient,private loggedInService:loggedInService) {}

  
  bookMedicines(userId:any, medicineQuantities: any[]): Observable<any> {
    
    return this.http.post<any>(`${this.baseUrl}/bookMedicines`, { userId, medicineQuantities });
}
updateWalletBalance(userId: string): Observable<any> {
  // Make an HTTP request to update the wallet balance
  return this.http.post(`/updateWalletBalance/${userId}`, {});
}
}
