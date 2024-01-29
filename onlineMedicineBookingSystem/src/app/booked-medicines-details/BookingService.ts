// booking.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private baseUrl = 'http://localhost:9000';

  constructor(private http: HttpClient) {}

  getBookingDetailsByUserId(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/bookedDetails/${userId}`);
  }

  cancelBooking(bookingId: number, medicineId: number): Observable<any> {
    const url = `${this.baseUrl}/cancel/${bookingId}/${medicineId}`;
    return this.http.delete(url);
  }
}
