import { Component, Input, OnInit } from '@angular/core';
import { Medicine } from '../medicine-creation/medicine.model';
import { MedicineService } from '../medicine-creation/medicine.service';
import { SelectedMedicineService } from './select-medicine-service';
import { Router } from '@angular/router';
import { CartService } from './cart-service';
import { UserService } from './user-service';
import { loggedInService } from '../medicines-cart/loggedIn-service';

@Component({
  selector: 'list-of-medicines',
  templateUrl: './list-of-medicines.component.html',
  styleUrls: ['./list-of-medicines.component.css']
})
export class MedicineListComponent implements OnInit {
  medicines: Medicine[] = [];
  filteredMedicines: any[] = [];
  userId:number=0;
  userName: string = '';
  userWalletBalance:any=''
  showUserCard: boolean = false;
  searchTerm: string = '';
  amountToAdd: number | null = 0.0; 
  popupp=false;
  constructor(
    private router: Router,
    private medicineService: MedicineService,
    private selectedMedicineService: SelectedMedicineService,
    private cartService: CartService,
    private userService:UserService,
    private logged:loggedInService
  ) {}

  ngOnInit(): void {
    this.medicineService.getAllMedicines().subscribe((medicines) => {
      this.medicines = medicines;
      this.filteredMedicines = medicines;
    });
      
    
   const storedUserId = localStorage.getItem('userId');
   const storedUserName = localStorage.getItem('userName');
   const storedWalletBalance=localStorage.getItem('userWalletBalance');

   this.userName = storedUserName || ''; 
    this.userId = this.logged.getLoggedInUserInfo()?.userId;
    this.userWalletBalance=this.logged.getLoggedInUserInfo()?.userWalletBalance
    //this.userWalletBalance=storedWalletBalance;
    //this.userName = this.logged.getLoggedInUserInfo()?.userName;
  }

  @Input() mediciness: Medicine[] = [];

  selectMedicine(medicine: Medicine): void {
    this.selectedMedicineService.setSelectedMedicine(medicine);
    this.cartService.addToCart(medicine);
    
    if(medicine.medicineQuantity==0){
      alert('Insufficient Quantity');
    }
    else{
    // alert('Medicine Added to Cart!');
    this.popupp=true
    }
  }
  searchMedicines() {
    this.filteredMedicines = this.medicines.filter(medicine =>
      medicine.medicineName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  logout(){
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    this.router.navigate(['/mainComponent']);
    this.showUserCard=false;
  }
  jj(){
    this.showUserCard=true
  }
  addWalletBalance(): void {
    const amountToAdd = prompt('Enter the amount to add to wallet balance:', '0');
    if (amountToAdd) {
      this.amountToAdd = +amountToAdd; // Convert the input to a number if needed

      // Call the service to add wallet balance
      this.userService.addWalletBalance(this.userId, this.amountToAdd).subscribe(
        () => {
          alert('Wallet balance added successfully!');
          
   
        },
        error => {
          console.error('Error adding wallet balance:', error);
          // Handle the error, show a message, etc.
        }
      );
    } else {
      alert('Please enter a valid amount.');
    }
  }
  gotoCart(){
    this.router.navigate(['/medicinesCart']);
  }
  updateUser(){
    console.log(  this.userWalletBalance)
    this.router.navigate(['/updateUser']);
  }
  closePopup(){
this.popupp=false;
  }
  orders(){
    this.router.navigate(['/orders']);
  }
}
