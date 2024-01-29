
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Medicine } from '../list-of-medicines/medicine2.model';
import { SelectedMedicineService } from '../list-of-medicines/select-medicine-service';
import { Router } from '@angular/router';
import { CartService } from '../list-of-medicines/cart-service';
import { ApiService } from './ApiService';
import { loggedInService } from './loggedIn-service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'medicines-cart',
  templateUrl: './medicines-cart.component.html',
  styleUrls: ['./medicines-cart.component.css']
})
export class MedicinesCartComponent implements OnInit {
  cart: { medicine: Medicine; quantity: number }[] = [];
  showbutton = true;
  hidebutton = true;
  hhh = true;
  hide = true;
  buttonHide=true;
  userId:number=0;
  showPopup = false;
  showPopup2=false;
  localstoragedata:any;
  popupErrorMessage='';
  userProfileForm : FormGroup | undefined ;
  arrayBookedMedicines: any[]=[];

  constructor(private cartService: CartService, private router: Router, private apiService: ApiService,private loggedInService:loggedInService,private cdr: ChangeDetectorRef,private fb: FormBuilder) {}
  @Output() walletBalanceUpdated = new EventEmitter<number>();
  ngOnInit(): void {
    this.cart = this.cartService.getCart().map((medicine) => ({ medicine, quantity: 1 }));
    //this.userId = this.loggedInService.getLoggedInUserInfo()?.userId;
    this.localstoragedata=localStorage.getItem('userId');
    const storedCart = localStorage.getItem('cart');

    

  }

  clearCart(): void {
    this.cartService.clearCart();
    this.cart = [];
  }

  navigateToListOfMedicines(): void {
    this.showbutton = true;
    this.hidebutton = true;
    this.hhh = true;
    this.hide = true;
    this.buttonHide=true;
    this.router.navigate(['/MedicineListComponent']).then(() => {
      this.showbutton = false;
      this.hidebutton = false;
      this.hhh = false;
      this.hide = false;
      this.buttonHide=false;
    });
  }
  bookMedicines(): void {
    this.localstoragedata = localStorage.getItem('userId');
  
    if (this.localstoragedata) {
      const userJsonData = localStorage.getItem('data');
  
      if (userJsonData) {
        const user = JSON.parse(userJsonData);
  
        // Check if the user has a non-empty address
        if (!user.userAddressLine1 || !user.userAddressLine2) {
          // Show a popup indicating that the address needs to be updated
          this.popupErrorMessage = 'Please update your address before booking medicines.';
          this.showPopup2 = true;
          return; // Stop further execution
        }
  
        const medicineQuantities = this.cart.map(item => ({
        
          medicineName: item.medicine.medicineName,
          medicineQuantity: item.quantity
        }));
  
        const invalidQuantityItem = this.cart.find(item => item.quantity > item.medicine.medicineQuantity);
  
        if (invalidQuantityItem) {
          // Show a popup indicating insufficient quantity
          this.popupErrorMessage = `Insufficient quantity for ${invalidQuantityItem.medicine.medicineName}.`;
          this.showPopup2 = true;
          return;
        }
  
        // Check wallet balance before booking medicines
       
            if (!user.userWalletBalance) {
              this.popupErrorMessage = 'Insufficient wallet balance. Please add funds.';
              this.showPopup2 = true;
            } else {
              // Book medicines
              this.apiService.bookMedicines(this.localstoragedata, medicineQuantities).subscribe(
                (response) => {
                  localStorage.setItem('data', JSON.stringify(response.user));
                  console.log("this",response);
                  console.log('Successfully Booked');
                  localStorage.setItem('bookedId',JSON.stringify(response.bookingId))
                  if (response.bookedMedicines && Array.isArray(response.bookedMedicines)) {
                    // Create an array to store medicine IDs
                    const medicineIds: any[] = [];
                
                    // Loop through the booked medicines and store their IDs
                    for (const bookedMedicine of response.bookedMedicines) {
                      // Assuming that each bookedMedicine object has a property 'medicine' containing 'medicineId'
                      const medicineId = bookedMedicine.medicine?.medicineId;
                
                      // Check if medicineId is defined and not already in the array
                      if (medicineId !== undefined && !medicineIds.includes(medicineId)) {
                        medicineIds.push(medicineId);
                      }
                    }
                
                    // Save the array of medicine IDs to local storage
                    localStorage.setItem('medicineIds', JSON.stringify(medicineIds));
                  } else {
                    console.error('Invalid structure for bookedMedicines:', response.bookedMedicines);
                    // Handle the invalid structure as needed
                  }
                  this.showPopup = true;
                  // After booking, update wallet balance
                  // this.updateWalletBalance();
                },
                (error) => {
                  console.error('Error booking medicines:', error);
                  // For other errors, display a generic error message
                  this.popupErrorMessage = 'An error occurred. Please try again later.';
                  this.showPopup = true;
                }
              );
            }
          (error: any) => {
            console.error('Error checking wallet balance:', error);
            // Handle the error, show a generic error message, or take appropriate action
          }
        
      } else {
        console.error('User information is not available.');
      }
    } else {
      console.error('User information is not available.');
    }
  }
  
  
  // updateWalletBalance(): void {
  //   // Assuming your API endpoint for updating wallet balance is '/updateWalletBalance'
  //   this.apiService.updateWalletBalance(this.localstoragedata).subscribe(
  //     (response: any) => {
  //       console.log(response)
  //       console.log('Wallet balance updated successfully');
  //       // Emit the event to notify the parent component
  //       this.walletBalanceUpdated.emit(response.updatedWalletBalance);
  //     },
  //     (error: any) => {
  //       console.error('Error updating wallet balance:', error);
  //       // Handle the error
  //     }
  //   );
  // }
  
  // Function to check if the user address is valid (adjust as per your user object structure)
  isUserAddressValid(): boolean {
    const user = this.loggedInService.getLoggedInUserInfo();
    return user?.userAddressLine1 && user?.userAddressLine2;
  }
  
  removeFromCart(medicineName: string): void {
    const index = this.cart.findIndex(item => item.medicine.medicineName === medicineName);
  
    if (index !== -1) {
      this.cartService.removeFromCart(this.cart[index].medicine.medicineName);
      // You might want to update the view explicitly after removing an item
      this.cdr.detectChanges();
    }
    this.ngOnInit()
  }
  closePopup(): void {
    this.showPopup = false;
    this.showPopup2=false;
    this.cartService.clearCart();
          this.cart = []; // Update the local cart variable
          this.cdr.detectChanges();
  }
  closePopup2(): void {
   
    this.showPopup2=false;
    
  }
  calculateTotalPrice(): number {
    return this.cart.reduce((total, cartItem) => {
      return total + cartItem.medicine.medicinePrice * cartItem.quantity;
    }, 0);
  }
}

