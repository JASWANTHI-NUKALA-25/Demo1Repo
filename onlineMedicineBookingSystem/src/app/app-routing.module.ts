import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { MedicineListComponent } from './list-of-medicines/list-of-medicines.component';
import { MedicinesCartComponent } from './medicines-cart/medicines-cart.component';
import { AppComponent } from './app.component';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { MedicineCreationComponent } from './medicine-creation/medicine-creation.component';
import { UpdateUserProfileComponent } from './update-user-profile/update-user-profile.component';
import { AddMedicineComponent } from './add-medicine/add-medicine.component';
import { UpdateMedicineComponent } from './update-medicine/update-medicine.component';
import { BookedMedicinesDetailsComponent } from './booked-medicines-details/booked-medicines-details.component';

const routes: Routes = [
  {path: 'signup', component: SignupComponent },
  {path:'login',component:LoginComponent},
  {path: 'SignupComponent', component: SignupComponent },
  {path:'LoginComponent',component:LoginComponent},
  {path:'listOfMedicines',component:MedicineListComponent},
  {path:'medicinesCart',component:MedicinesCartComponent},
  {path:'MedicineListComponent', component:MedicineListComponent},
  {path:'medicineCreation',component:MedicineCreationComponent},
  {path:'appComponent',component:AppComponent},
  { path: '', redirectTo: '/mainComponent', pathMatch: 'full' }, // Redirect to mainComponent on the default path
  { path: 'mainComponent', component: MainScreenComponent },
  {path:'updateUser',component:UpdateUserProfileComponent},
  {path:'addMedicine',component:AddMedicineComponent},
  {path:'updateMedicine/:id',component:UpdateMedicineComponent},
  {path:'orders',component:BookedMedicinesDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
