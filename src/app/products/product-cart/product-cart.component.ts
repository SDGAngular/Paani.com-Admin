import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { random } from 'lodash';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { HeaderComponent } from 'src/app/core/components/header/header.component';
import { SpinnerComponent } from 'src/app/core/components/spinner/spinner.component';
import { FirebaseControllerService } from 'src/app/core/services/firebase-controller.service';
import { WebStorageService } from 'src/app/core/services/web-storage.service';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css'],
})
export class ProductCartComponent implements OnInit {
  @ViewChild(HeaderComponent)
  private headerComponent?: HeaderComponent;

  constructor(
    private router: Router,
    private webStorage: WebStorageService,
    private firebaseService: FirebaseControllerService,
    private spinner: NgxSpinnerService
  ) {}
  myCart: any;
  totalAmount = 0;
  loggedInUser: any;
  appliedCoupon: any;
  discPercentage: number = 0;
  discount = 0;
  discountedPrice = 0;
  ngOnInit(): void {
    this.loggedInUser = this.webStorage.get('userDetails');

    this.myCart = this.webStorage.get('myCart');
    this.setTotalAmount();
    // this.firebaseService.showRecords('users').subscribe((data)=>{
    //   const allUsers = data.docs.map((doc: any) => {
    //     return { id: doc.id, ...doc.data() as any }
    //   });
    //   allUsers.forEach((eachUser:any)=>{
    //     if(eachUser.id===this.loggedInUser.id){
    //       // this.myCart=eachUser.cart;

    //       this.spinner.hide();
    //     }
    //   })

    // })
  }

  saveProductData(record: any): Promise<void> {
    this.webStorage.set('myCart', this.myCart);
    return this.firebaseService.updateRecords(
      'users',
      this.loggedInUser.id,
      record
    );
  }

  changeQty(change: any, prod: any): void {
    if (change === 'inc' && prod.qty < 5) {
      prod.qty += 1;
      this.setTotalAmount();
      this.loggedInUser.cart = this.myCart;

      this.saveProductData(this.loggedInUser);
    } else if (change === 'dec') {
      if (prod.qty > 1) {
        prod.qty -= 1;
        this.loggedInUser.cart = this.myCart;
        this.saveProductData(this.loggedInUser);
        this.setTotalAmount();
      }
    }
  }

  deleteProduct(prod: any): void {
    this.myCart = this.myCart.filter((eachCartItem: any) => {
      return eachCartItem.id !== prod.id;
    });
    this.loggedInUser.cart = this.myCart;
    this.webStorage.set('myCart', this.myCart);
    this.headerComponent!.cartCount -= 1;
    this.saveProductData(this.loggedInUser);
    this.setTotalAmount();
    if (this.myCart.length === 0) {
      this.appliedCoupon = '';
    }
  }

  applyCoupon(couponCode: any): void {
    if (this.myCart.length !== 0) {
      this.appliedCoupon = couponCode;
      if (couponCode === 'mybottle') {
        this.discPercentage = 10;

        this.setTotalAmount();
      }
      if (couponCode === 'jalpani') {
        this.discPercentage = 20;
        this.setTotalAmount();
      }
    }
  }

  setTotalAmount(): void {
    this.totalAmount = 0;
    this.myCart.forEach((eachProd: any) => {
      this.totalAmount += eachProd.qty * eachProd.price;
    });
    this.discount = parseInt(`${this.totalAmount * (this.discPercentage / 100)}`) ;
    this.discountedPrice = this.totalAmount - this.discount;
  }
  generateUUID() {
    // Public Domain/MIT
    var d = new Date().getTime(); //Timestamp
    var d2 =
      (typeof performance !== 'undefined' &&
        performance.now &&
        performance.now() * 1000) ||
      0; //Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = Math.random() * 16; //random number between 0 and 16
        if (d > 0) {
          //Use timestamp until depleted
          r = (d + r) % 16 | 0;
          d = Math.floor(d / 16);
        } else {
          //Use microseconds since page-load if supported
          r = (d2 + r) % 16 | 0;
          d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
  }

  placeOrders(): void {
    this.spinner.show();
    let order = {
      mode: 'UPI',
      orderCost: this.totalAmount,
      partner: 'jal pvt ltd',
      orderID: this.generateUUID(),
      products: this.myCart,
      status: 'pending',
    };
    this.firebaseService.addNewRecord('orders',order);

    if (this.loggedInUser.orders) {
      this.loggedInUser.orders.unshift(order);
    } else {
      this.loggedInUser.orders = [order];
    }

    this.webStorage.set('orders', this.loggedInUser.orders);
    this.saveProductData(this.loggedInUser).then((data) => {
      this.myCart = [];
      this.headerComponent!.cartCount = 0;
      this.setTotalAmount();
      this.loggedInUser.cart = [];
      this.webStorage.set('myCart', []);
      this.spinner.hide();
      this.router.navigate(['products/orders']);
    });
  }
}
