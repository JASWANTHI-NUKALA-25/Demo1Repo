import { Injectable } from '@angular/core';
import { Medicine } from '../medicine-creation/medicine.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Medicine[] = [];

  addToCart(medicine: Medicine): void {
    this.cart.push(medicine);
  }

  getCart(): Medicine[] {
    return this.cart;
  }

  clearCart(): void {
    this.cart = [];
  }
  
  
  removeFromCart(medicineName: string): void {
    console.log('Removing from cart:', medicineName);
    const index = this.cart.findIndex(item => item.medicineName === medicineName);
  
    if (index !== -1) {
      this.cart.splice(index, 1);
    }
  }
  walletBalanceUpdated: Subject<number> = new Subject<number>();
}
