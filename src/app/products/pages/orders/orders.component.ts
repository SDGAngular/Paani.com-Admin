import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { each } from 'lodash';
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
  onResize(event: any) {
    this.innerWidth = window.innerWidth;

    console.log(this.innerWidth);
  }
  constructor(private router: Router, private webstorage: WebStorageService) {}

  ngOnInit(): void {
    this.allOrders = this.webstorage.get('orders');
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
    } else if (this.searchText.indexOf('delivered') > -1) {
      this.allOrders = this.cloneOrders.filter((eachOrder: any) => {
        eachOrder.isExpanded = true;
        return eachOrder.status === 'delivered';
      });
    } else if (this.searchText === '') {
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
