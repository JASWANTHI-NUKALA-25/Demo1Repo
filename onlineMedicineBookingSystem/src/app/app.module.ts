import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { MedicineCreationComponent } from './medicine-creation/medicine-creation.component';
import { MedicineListComponent } from './list-of-medicines/list-of-medicines.component';
import { MedicinesCartComponent } from './medicines-cart/medicines-cart.component';
import { ToastrModule } from 'ngx-toastr';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { UpdateUserProfileComponent } from './update-user-profile/update-user-profile.component';
import { AddMedicineComponent } from './add-medicine/add-medicine.component';
import { UpdateMedicineComponent } from './update-medicine/update-medicine.component';
import { BookedMedicinesDetailsComponent } from './booked-medicines-details/booked-medicines-details.component';



@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    MedicineCreationComponent,
    MedicineListComponent,
    MedicinesCartComponent,
    MainScreenComponent,
    UpdateUserProfileComponent,
    AddMedicineComponent,
    UpdateMedicineComponent,
    BookedMedicinesDetailsComponent,
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
