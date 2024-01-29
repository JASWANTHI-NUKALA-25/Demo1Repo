import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Medicine } from './medicine.model';
@Injectable({
    providedIn: 'root'
})
export class MedicineService {
    private apiUrl = 'http://localhost:9000/getAllMedicines';
    private baseUrl='http://localhost:9000';

    constructor(private http: HttpClient) {}

    getAllMedicines(): Observable<Medicine[]> {
        return this.http.get<Medicine[]>(this.apiUrl);
    }

    deleteMedicine(medicineId: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/deleteMedicine/${medicineId}`);
      }
      getMedicineDetails(medicineId: number): Observable<any> {
        const url = `${this.baseUrl}/medicines/${medicineId}`; // Adjust the URL structure based on your backend API
    
        return this.http.get(url);
      }
    
      updateMedicineDetails(medicineId: number, adminId: number, updatedMedicine: any): Observable<any> {
        const url = `${this.baseUrl}/updateMedicine/${adminId}/${medicineId}`; // Adjust the URL structure based on your backend API
    
        return this.http.put(url, updatedMedicine);
      }

}