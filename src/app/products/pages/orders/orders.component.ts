import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { each } from 'lodash';
import { HeaderComponent } from 'src/app/core/components/header/header.component';
import { FirebaseControllerService } from 'src/app/core/services/firebase-controller.service';
import { WebStorageService } from 'src/app/core/services/web-storage.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  allOrders?: any;
  searchText: any;
  cloneOrders: any;
  innerWidth?: number;
  @HostListener('window:resize', ['$event'])
  @ViewChild(HeaderComponent)
  private headerComponent?: HeaderComponent; 
  onResize(event: any) {
    this.innerWidth = window.innerWidth;

    console.log(this.innerWidth);
  }
  constructor(private router: Router,
    private fireController: FirebaseControllerService,
    private webstorage: WebStorageService) {}

  ngOnInit(): void {
    this.allOrders = this.webstorage.get('orders');
    const userDetails = this.webstorage.get('userDetails');
    this.innerWidth = window.innerWidth;
    console.log(this.innerWidth);

    this.allOrders.forEach((eachOrder: any) => {
      const orderID = eachOrder.orderID.split('-')[0];
      eachOrder.isExpanded = false;
      if (eachOrder.status === 'pending') {
        eachOrder.steps = 2;
      } else {
        eachOrder.steps = 4;
      }
      console.log(orderID);
      eachOrder.orderID = orderID;
    });

    this.allOrders[0].isExpanded = true;
    this.cloneOrders = _.cloneDeep(this.allOrders);
  }
  goToProduct(product: any): void {
    this.router.navigate(['products/all-products', product.id]);
  }
  repeatOrders(order:any):void {
    order.products.forEach((eachProduct:any)=>{
      this.addToCart(eachProduct);
    })
  }

  addToCart(product:any):void {
    
      
      product.isAdded = true;
      // this.spinner.show();
   
      const userData = this.webstorage.get('userDetails');
      
      
      let myCart = this.webstorage.get('myCart')
      if(!myCart){
         myCart = [product];
       
      }
      else{
        var count =0;
        var selectedIndex=0
        myCart.forEach((eachProd:any,index:any)=>{
          if(eachProd.id===product.id){
            count+=1;
            selectedIndex=index;

          }
        });
        if(count===1){
          if(myCart[selectedIndex].qty+(product.qty)<=5){
            myCart[selectedIndex].qty+=(product.qty);
          }else{
            alert('cannot add more than 5 units');
          }
        }
        else{
          myCart.push(product);
          this.headerComponent!.cartCount+=1;
        }
     
      }
      userData.cart= myCart;
      this.fireController.updateRecords('users',userData.id,userData).then((data)=>{
        // this.spinner.hide();
            });
      this.webstorage.set('myCart',myCart);
     
    
    
  }
  initiateRefund(orderId: any): void {
    console.log(orderId);
    this.router.navigate(['complaints/initiate-refund/' + orderId]);
  }
  sortOrders(event: any): void {
    if (this.searchText.indexOf('pending') > -1) {
      this.allOrders = this.cloneOrders.filter((eachOrder: any) => {
        eachOrder.isExpanded = true;
        return eachOrder.status === 'pending';
      });
    } 
    else if (this.searchText.indexOf('delivered') > -1) {
      this.allOrders = this.cloneOrders.filter((eachOrder: any) => {
        eachOrder.isExpanded = true;
        return eachOrder.status === 'delivered';
      });
    }
    else if (this.searchText.indexOf('Refund') > -1) {
      this.allOrders = this.cloneOrders.filter((eachOrder: any) => {
        eachOrder.isExpanded = true;
        return eachOrder.status.includes('Refund') ;
      });
    
    
    }
    else if (this.searchText === '') {
      this.allOrders = this.cloneOrders;
      this.allOrders.forEach((eachOrder: any) => {
        eachOrder.isExpanded = false;
      });
      this.allOrders[0].isExpanded = true;
    } else {
      this.allOrders = this.cloneOrders.filter((eachOrder: any) => {
        eachOrder.isExpanded = true;
        
        return eachOrder.orderID.indexOf(this.searchText) > -1;
      });
     
    }
  }

  toggleAccordian(order: any): void {
    this.allOrders.forEach((eachOrder: any) => {
      if (eachOrder.id !== order.id) {
        eachOrder.isExpanded = false;
      }
    });
    order.isExpanded = !order.isExpanded;
  }
}
