import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from 'src/app/core/components/header/header.component';
import { WebStorageService } from 'src/app/core/services/web-storage.service';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css'],
})
export class ProductCartComponent implements OnInit {
  @ViewChild(HeaderComponent)
  private headerComponent?: HeaderComponent;

  constructor(private webStorage: WebStorageService) {}
  myCart: any;
  totalAmount = 0;
  appliedCoupon: any;
  discPercentage: number=0;
  discount = 0;
  discountedPrice = 0;
  ngOnInit(): void {
    this.myCart = this.webStorage.get('myCart');
    this.setTotalAmount();
  }

  changeQty(change: any, prod: any): void {
    if (change === 'inc' && prod.qty < 5) {
      prod.qty += 1;
      this.setTotalAmount();
    } else if (change === 'dec') {
      if (prod.qty > 1) {
        prod.qty -= 1;
        this.setTotalAmount();
      }
    }
  }

  deleteProduct(prod: any): void {
    this.myCart = this.myCart.filter((eachCartItem: any) => {
      return eachCartItem.id !== prod.id;
    });
    this.webStorage.set('myCart', this.myCart);
    this.headerComponent!.cartCount -= 1;
    this.setTotalAmount();
    if(this.myCart.length ===0){
      this.appliedCoupon ='';
    }
  }

  applyCoupon(couponCode: any): void {

    if(this.myCart.length!==0){
      this.appliedCoupon = couponCode;
      if (couponCode === 'mybottle' ) {
        this.discPercentage = 10;
       
  
        this.setTotalAmount();
      }
      if (couponCode === 'jalpani' ) {
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
    this.discount = this.totalAmount * (this.discPercentage / 100);
    this.discountedPrice = this.totalAmount - this.discount;
  }
}
