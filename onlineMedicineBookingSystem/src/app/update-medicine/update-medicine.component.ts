import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { MedicineService } from '../medicine-creation/medicine.service';

@Component({
  selector: 'app-update-medicine',
  templateUrl: './update-medicine.component.html',
  styleUrls: ['./update-medicine.component.css']
})
export class UpdateMedicineComponent implements OnInit{
  medicineDetails: any;
  constructor(private route:ActivatedRoute,private medicineService:MedicineService){}
  ngOnInit(): void {
    const medicineId = this.route.snapshot.params['id'];
    this.route.params.subscribe(params => {
      const medicineId = params['id'];

      this.medicineService.getMedicineDetails(medicineId).subscribe(
        (data) => {
          this.medicineDetails = data;
        },
        (error) => {
          console.error('Error fetching medicine details:', error);
        }
      );
    });
  }
  saveChanges(): void {
    this.medicineService.updateMedicineDetails(
      this.medicineDetails.medicineId,
      this.medicineDetails.adminId,
      this.medicineDetails
    ).subscribe(
      (updatedMedicine) => {
        console.log('Medicine details updated successfully:', updatedMedicine);
        // You can navigate to another page or perform other actions after a successful update
      },
      (error) => {
        console.error('Error updating medicine details:', error);
      }
    );
  }
  medicine: any = {
    medicineName: '',
    medicineQuantity: 0,
    medicinePrice: 0
    // Add other properties as needed
  };

}
