import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { MedicineService } from './medicine.service';

@Component({
  selector: 'app-medicine-creation',
  templateUrl: './medicine-creation.component.html',
  styleUrls: ['./medicine-creation.component.css']
})
export class MedicineCreationComponent implements OnInit {
  
  private apiUrl = 'http://localhost:9000/createmedicines'; // Update the API URL to match your backend endpoint
  medicineName: string = '';
  medicineDescription: string = '';
  medicineQuantity: any;
  medicinePrice: any;
  errorMessage: string = '';
  adminName:String=''
  showUserCard: boolean = false;
  medicineDetails: any[] = [];
  //showUpdateFormFlag: boolean = false;
  updateMedicineId: string = '';
  updateMedicinePrice: number = 0;
  updateMedicineQuantity: number = 0;
  showUpdateFormFlag = false;
  medicines: any[] = [];

  showUpdateForm() {
    // Set default values or fetch the values to be updated
    this.updateMedicineId = '...'; // Set the actual Medicine ID
    this.updateMedicinePrice = 0; // Set the actual Medicine Price
    this.updateMedicineQuantity = 0; // Set the actual Medicine Quantity

    this.showUpdateFormFlag = true;
  }
  ngOnInit(): void {
    this.getAllMedicines();
   
   const storedUserName = localStorage.getItem('adminName');
   this.adminName = storedUserName || ''; 
   
   
    //this.userName = this.logged.getLoggedInUserInfo()?.userName;
  }
  constructor(private http: HttpClient ,private router:Router,private medicinesService: MedicineService) {}

  createMedicine(): void {
    const medicine = {
      medicineName: this.medicineName,
      medicineDescription: this.medicineDescription,
      medicineQuantity: this.medicineQuantity,
      medicinePrice: this.medicinePrice
    };

    const adminId = 1; // Replace this with the actual adminId

    this.http.post<any>(`${this.apiUrl}/${adminId}`, [medicine])
      .pipe(
        catchError(error => {
          console.error('Error creating medicine:', error);
          this.errorMessage = 'Error creating medicine. Please try again later.';
          return throwError(error);
        })
      )
      .subscribe(
        response => {
          console.log('Medicine created successfully:', response);
          this.medicineName = '';
        this.medicineDescription = '';
        this.medicineQuantity = null;
        this.medicinePrice = null;
          // Handle success: navigate to another page or perform other actions
        }
      );
  }
  jj(){
    this.showUserCard=true
  }
  logout(){
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    this.router.navigate(['/mainComponent']);
    this.showUserCard=false;
  }
 
 
  // Other properties...

  // Method to toggle the update form visibility
  toggleUpdateForm() {
    this.showUpdateFormFlag = !this.showUpdateFormFlag;
    
    // Add or remove the 'visible' class based on the flag
    if (this.showUpdateFormFlag) {
      document.getElementById('updateMedicine')?.classList.add('visible');
    } else {
      document.getElementById('updateMedicine')?.classList.remove('visible');
    }
  }
  getAllMedicines() {
    this.medicinesService.getAllMedicines().subscribe(
      (data) => {
        this.medicines = data;
      },
      (error) => {
        console.error('Error fetching medicines', error);
      }
    );
  }
  addMedicine(){
    this.router.navigate(['/addMedicine'])
  }
  // Inside your Angular component
  // Inside your Angular component
deleteMedicine(medicine: any): void {
  // Assuming medicine has an 'id' property
  const medicineId1 = medicine.medicineId;

  // Send a request to the backend to delete the medicine
  this.medicinesService.deleteMedicine(medicineId1).subscribe(
    () => {
      // On successful deletion, update the medicines array in the frontend
      this.medicines = this.medicines.filter(m => m.id !== medicineId1);
      console.log('Medicine deleted successfully.');
      this.ngOnInit()
    },
    (error) => {
      console.error('Error deleting medicine:', error);
      // Handle error, show an alert, etc.
    }
  );
}
updateMedicine(medicineId: number):void{
this.router.navigate(['/updateMedicine',medicineId])
}
}
