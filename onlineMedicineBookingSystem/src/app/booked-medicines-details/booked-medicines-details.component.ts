import { Component } from '@angular/core';
import { BookingService } from './BookingService';

@Component({
  selector: 'app-booked-medicines-details',
  templateUrl: './booked-medicines-details.component.html',
  styleUrls: ['./booked-medicines-details.component.css']
})
export class BookedMedicinesDetailsComponent {
  // userId: number = 1; // Replace with the actual user ID
  bookingDetails: any[] = [];
  updatedData: any;
  orders: any[] = []; 
  bookingId: any;
  medicineId: any;
  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('data');
    const medicineDataId=localStorage.getItem('medicineId');
    const bookedId = localStorage.getItem('bookedId');
  if (userData) {
    this.updatedData = JSON.parse(userData);
    this.getBookingDetails(); // Call getBookingDetails after setting updatedData
  }
  }

  getBookingDetails(): void {
    if (!this.updatedData || !this.updatedData.userId) {
      console.error('User data is undefined or missing userId');
      return;
    }
  
    this.bookingService.getBookingDetailsByUserId(this.updatedData.userId).subscribe(
      (data) => {
        this.bookingDetails = data;
        console.log(this.bookingDetails);  // Log the data
      },
      (error) => {
        console.error('Error fetching booking details:', error);
      }
    );
  }
  cancelBooking(bookedId: number, medicineDataId: number): void {
    this.bookingService.cancelBooking(this.bookingId, this.medicineId).subscribe(
      () => {
        console.log(`Booking with ID ${this.bookingId} and Medicine ID ${this.medicineId} has been canceled.`);
        // Optionally, update your component or perform additional logic
      },
      (error) => {
        console.error('Error canceling booking:', error);
        // Handle errors as needed
      }
    );
  }
}
