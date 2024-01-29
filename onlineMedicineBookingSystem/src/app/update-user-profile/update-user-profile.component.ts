import { Component } from '@angular/core';
import { UserService } from '../list-of-medicines/user-service';
import { Router } from '@angular/router';
import { loggedInService } from '../medicines-cart/loggedIn-service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-user-profile',
  templateUrl: './update-user-profile.component.html',
  styleUrls: ['./update-user-profile.component.css']
})
export class UpdateUserProfileComponent {
  loggedInUser: any;
  userProfileForm: FormGroup;
  updatedData:any;
  popupp=false;
  walletLimitExceeded=false;
  constructor(
    private loggedInService: loggedInService,
    private userService: UserService,
    private fb: FormBuilder,
    private router:Router
  ) {
    // Create the form group with null as default values
    this.userProfileForm = this.fb.group({
      userName: [''],
  userEmail: [''],
  userWalletBalance: [''],
  userMobileNumber: [''],
  userAddressLine1: [''],
  userAddressLine2: ['']
      // Add other form controls based on your user model
    });
  }

  ngOnInit(): void {
    
    // Retrieve logged-in user details from the service
    this.loggedInUser = this.loggedInService.getLoggedInUserInfo();
    const userJsonData = localStorage.getItem('data')
    if (userJsonData) {
      this.updatedData=JSON.parse(userJsonData)
    }
 
    // Set the initial values in the form
    this.userProfileForm.patchValue({
      userId: this.updatedData.userId,
      userName: this.updatedData.userName,
      userEmail:this.updatedData.userEmail,
      userMobileNumber: this.updatedData.userMobileNumber,
      userWalletBalance: this.updatedData.userWalletBalance,
      userAddressLine1: this.updatedData.userAddressLine1,
      userAddressLine2: this.updatedData.userAddressLine2,
      // Set other form control values as needed
      
    });
    
    
  }
  updateProfile() {
    // Get the updated values from the form
    const updatedUser = this.userProfileForm.value;
  
    // Get the userId from the loggedInUser or your authentication service
    const userId = this.updatedData.userId; // Adjust this based on your actual user object
  
    // Calculate the new wallet balance by adding the given amount to the previous balance
    const newWalletBalance = this.updatedData.userWalletBalance + updatedUser.userWalletBalance;
  
    // Check if the new wallet balance exceeds the limit (1000)
    if (newWalletBalance > 1000) {
      // Show a popup indicating the limit is 1000
      this.showLimitPopup();
      return;
    }
  
    // Set the new wallet balance in the updatedUser object
    updatedUser.userWalletBalance = newWalletBalance;
  
    // Update the user profile
    this.userService.updateUser(userId, updatedUser).subscribe(
      (response) => {
        // Handle the response
        console.log('User updated successfully', response);
        this.popupp = true;
  
        // Update the user information in the loggedInService
        this.loggedInUser = { ...this.loggedInUser, ...updatedUser };
        this.loggedInService.setLoggedInUserInfo(this.loggedInUser);
  
        // Update local storage with the new user data
        const userJsonData = JSON.stringify(this.loggedInUser);
        localStorage.setItem('data', userJsonData);
  
        // Navigate to the medicines booking page
        this.router.navigate(['/listOfMedicines']);
      },
      (error) => {
        // Handle the error
        console.error('Error updating user', error);
      }
    );
  }
  
  showLimitPopup() {
    // Show a popup indicating the wallet balance limit is 1000
    // You can implement your own logic to display the popup here
    console.log('Wallet balance limit exceeded');
    // For example, you might set a flag to display a message in your template
    this.walletLimitExceeded = true;
  }
  
  
  closePopup(){
    this.router.navigate(['/listOfMedicines']);
    
  }
  
  
}
