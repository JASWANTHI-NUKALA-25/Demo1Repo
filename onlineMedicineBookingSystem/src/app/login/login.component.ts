import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { loggedInService } from '../medicines-cart/loggedIn-service';
import { UserService } from '../list-of-medicines/user-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 
  
  private apiUrl = 'http://localhost:9000/user/login2';
  
  userName: string = '';
  userEmail:string='';
  password: string = '';
  errorMessage: string = '';
  isLoggedIn: boolean = false;
  user: any;
  passwordVisible: boolean = false;
  showForgotPasswordPopup: boolean = false;
  popupUserEmail: string = '';
  popupNewPassword: string = '';
  popupConfirmPassword: string = '';
  popupErrorMessage: string = '';
  popupp=false;
  constructor(private http: HttpClient, private router: Router, private loggedInService: loggedInService,private userService: UserService) { }
  
  login(): void {
    if (!this.userEmail || !this.password) {
      if (!this.userEmail) {
        this.errorMessage = 'User Email is required.';
      } else {
        this.errorMessage = 'Password is required.';
      }
      return;
    }
  
    this.http.get<any>(`${this.apiUrl}/${this.userEmail}/${this.password}`)
      .subscribe(
        data => {
          console.log(data);
          console.log('Data received:', data);
          
          console.log(data);
          this.isLoggedIn = true;
          this.user = data;
          localStorage.setItem('userId', JSON.stringify(data.userId));
          localStorage.setItem('data',JSON.stringify(data));
  
          this.loggedInService.setLoggedInUserInfo(data);
  
          console.log(this.loggedInService.getLoggedInUserInfo()?.userId);
          this.popupp=true;
          // alert('Login Successfull!');
          console.log(this.user.userName);
          localStorage.setItem('userName', this.user.userName);
  
          localStorage.setItem('adminName', this.user.userName);
          // Check if the response indicates admin status
          if (data.adminEmail && data.adminEmail.toLowerCase().startsWith('admin')) {
            console.log('Admin login detected', data);
            this.router.navigateByUrl('/medicineCreation');
          } else {
            console.log('Regular user login detected', data);
            
            
          }
          this.userName = '';
          this.userEmail = '';
          this.password = '';
          this.errorMessage = '';
        },
        error => {
          console.error(error);
          if (error.status === 401) {
            this.errorMessage = 'Invalid credentials. Please try again.';
          } else {
            this.errorMessage = 'An unexpected error occurred. Please try again later.';
          }
        }
      );
  }

  navigateToAppComponent(): void {
    this.router.navigate(['/mainComponent']);
  }
  openPopup(): void {
    this.showForgotPasswordPopup = true;
  }

  closePopup(): void {
    this.showForgotPasswordPopup = false;
    this.popupp=false
    this.router.navigateByUrl('/listOfMedicines');
  }
  showForgotPasswordPopup1(){
    this.showForgotPasswordPopup=true;
  }
  saveNewPassword(): void {
    // Check if passwords match
    if (this.popupNewPassword !== this.popupConfirmPassword) {
        // Handle password mismatch
        this.popupErrorMessage = 'Passwords do not match';
        return;
    }

    // Call the service to update the password
    this.userService
        .updateUserPassword(this.popupUserEmail, this.popupNewPassword)
        .subscribe(
            (data) => {
                console.log('Password updated successfully', data);
                // Close the popup or perform additional actions
                alert('Password updated Successfully');
                this.closePopup();
                this.userName = '';
                this.userEmail = '';
                this.password = '';
                this.popupErrorMessage = ''; // Reset the error message
            },
            (error) => {
                console.error('Error updating password', error);

                // Set the error message based on the specific error
                if (error.status === 404) {
                    this.popupErrorMessage = 'User with the given Email not found';
                } else {
                    this.popupErrorMessage = 'Please Enter the data in fields';
                }
            }
        );
}
togglePasswordVisibility(): void {
  this.passwordVisible = !this.passwordVisible;
}
}