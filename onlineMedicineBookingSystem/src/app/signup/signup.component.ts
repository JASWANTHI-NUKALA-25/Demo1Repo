import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  passwordVisible: boolean = false;
  userName: string = '';
  userPassword: string = '';
  userEmail: string = '';
  userMobileNumber: number = 0;
  errorMessage: string = '';
  popupp=false;
  constructor(private http: HttpClient, private router: Router) { }

  onSignup(): void {
    if (!this.userName || !this.userPassword || !this.userEmail || !this.userMobileNumber) {
      if (!this.userName) {
        this.errorMessage = 'Username is required';
      } else if (!this.userPassword) {
        this.errorMessage = 'Password is required';
      } else if (!this.userEmail) {
        this.errorMessage = 'Email is required';
      } else if (this.userMobileNumber && this.userMobileNumber.toString().length > 10) {
        this.errorMessage = 'Mobile Number should not exceed 10 digits';
      } else {
        this.errorMessage = 'Mobile Number is required';
      }
      return;
    }
  
    const data = {
      userName: this.userName,
      userPassword: this.userPassword,
      userEmail: this.userEmail,
      userMobileNumber: this.userMobileNumber
    };
  
    this.http.post('http://localhost:9000/user/signup', data).subscribe(
      (result) => {
        console.log(result);
        // alert('Registered Successfully')
        this.popupp=true;
      },
      (error) => {
        console.error(error);
        
        if (error.status === 400 && error.error === 'Validation error: Mobile number cannot exceed 10 digits') {
          this.errorMessage = 'Mobile Number cannot exceed 10 digits';
        } 
        else if(error.status === 400 && error.error === 'Validation error: Password must be at least 6 characters long')
        {
          this.errorMessage = 'Password must be atleast 6 characters';
        }else if (error.status === 409) {
          this.errorMessage = 'Email already exists. Please use a different email address.';
        } else {
          this.errorMessage = 'Error during signup. Please try again.';
        }
      }
    );
  }

  navigateToAppComponent(): void {
    this.router.navigate(['/mainComponent']);
  }
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
  closePopup(){
    this.router.navigate(['/mainComponent']);
  }
}
