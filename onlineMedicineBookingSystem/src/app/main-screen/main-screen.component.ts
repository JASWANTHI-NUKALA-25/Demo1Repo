import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent  {
  title = 'onlineMedicineBookingSystem';
  public isAppVisible = true;

  constructor(private router: Router) {}

  hideAppAndNavigate() {
    this.isAppVisible = false;
    // Navigate to SignupComponent
    this.router.navigate(['/SignupComponent']);
  }
  hideAppAndNavigateLogin(){
    this.isAppVisible=false;
    this.router.navigate(['/LoginComponent']);
  }
}
