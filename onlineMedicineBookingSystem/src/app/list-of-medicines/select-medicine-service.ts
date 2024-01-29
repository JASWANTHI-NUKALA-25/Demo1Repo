// selected-medicine.service.ts
import { Injectable } from '@angular/core';
import { Medicine } from './medicine2.model';

@Injectable({
  providedIn: 'root'
})
export class SelectedMedicineService {
  private selectedMedicine: Medicine | null = null;

  setSelectedMedicine(medicine: Medicine): void {
    this.selectedMedicine = medicine;
  }

  getSelectedMedicine(): Medicine | null {
    return this.selectedMedicine;
  }
}
