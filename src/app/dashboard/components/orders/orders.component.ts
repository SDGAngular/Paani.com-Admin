import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { FirebaseControllerService } from 'src/app/core/services/firebase-controller.service';
import { LoaderService } from '../../services/loader.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  selectedOrder: any;

  constructor(
    private firebase: FirebaseControllerService,
    private loader: LoaderService,
    private searchService: SearchService
  ) {}
  allOrders: any = [];
  copyAllOrders: any;
  totalOrder: any = 0;
  deliveredOrder: any = 0;
  pendingOrder: any = 0;
  showSelected: any;

  recentOrders: any;

  ngOnInit(): void {
    this.loader.start();
    this.firebase.showRecords('orders').subscribe((data) => {
      const allProducts = data.docs.map((doc: any) => {
        return { id: doc.id, ...(doc.data() as any) };
      });
      this.loader.stop();
      this.allOrders = allProducts;
      this.copyAllOrders = _.cloneDeep(allProducts);

      console.log(this.allOrders);
      this.recentOrders = this.allOrders.slice(
        Math.max(this.copyAllOrders.length - 3, 0)
      );
      this.recentOrders.forEach((eachRec: any) => {
        eachRec.isExpanded = false;
      });

      this.updateCount();
    });

    this.searchService.searchSubject.subscribe((data)=>{
      this.searchText(data.text);
    })
  }
  searchText(text:any):void{
  
     text = text.toLowerCase();
 
     if (text
       === '') {
       this.allOrders = _.cloneDeep(this.copyAllOrders);
     }
     else {
       this.allOrders = this.copyAllOrders.filter((eachProd: any) => {
         return eachProd.orderID.toLowerCase().indexOf(text) > -1;
       });
       
     }
   }

  selectOrder(order: any): void {
    this.showSelected = true;
    this.selectedOrder = order;
  }

  updateCount(): void {
    this.deliveredOrder = 0;
    this.totalOrder = 0;
    this.pendingOrder = 0;
    this.copyAllOrders.forEach((eachOrder: any) => {
      if (eachOrder.status === 'delivered') {
        this.deliveredOrder += 1;
      } else if (eachOrder.status === 'pending') {
        this.pendingOrder += 1;
      }

      this.totalOrder += 1;
    });
  }
}
