import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { uniqueId } from 'lodash';
import { FirebaseControllerService } from 'src/app/core/services/firebase-controller.service';
import { WebStorageService } from 'src/app/core/services/web-storage.service';
import { LoaderService } from 'src/app/dashboard/services/loader.service';

@Component({
  selector: 'app-initiate-refund',
  templateUrl: './initiate-refund.component.html',
  styleUrls: ['./initiate-refund.component.css']
})
export class InitiateRefundComponent implements OnInit {
  selectedID: any;
  allOrders: any;
  selectedOrder: any;
  reasonForReturn?: string='';
  hasError?: boolean;
  errorMsg?: string;

  constructor(private activatedRoute: ActivatedRoute,
    private webStorage:WebStorageService,
    private loader: LoaderService,
    public router: Router,
    private firebaseService: FirebaseControllerService) { }

  ngOnInit(): void 
  {
    this.activatedRoute.params.subscribe(( params:any) => this.selectedID = params.id );
    this.allOrders = this.webStorage.get('orders');
    this.allOrders.forEach((eachOrder:any)=>{
      if(eachOrder.orderID.includes(this.selectedID)){
        this.selectedOrder = eachOrder;
        return
      }
    });
    console.log(this.selectedOrder);
    this.selectedOrder.isExpanded = true;


  }

  selectProduct(product:any){
    product.isSelected=!product.isSelected;
  }

  submitComplaint():void {
    var count =0;
    var returnedProducts:any=[]
    this.selectedOrder.products.forEach((eachProduct:any)=>{
      if (eachProduct.isSelected===true)
      {
        eachProduct.isRefundedInitiated = true;
        eachProduct.isRefunded = false;
        count+=1;
        returnedProducts.push(eachProduct);
      }
    });
    if(this.reasonForReturn===''){
    this.hasError=true;
    this.errorMsg = 'Reason is Required';
    }
    else if(count===0){
      this.hasError=true;
      this.errorMsg='Atleast one product needs to be selected';
    }
    else{
 
      const userDetails=this.webStorage.get('userDetails');
      userDetails.orders.forEach((eachOrder:any)=>{
        if(eachOrder.orderID === this.selectedOrder.orderID){
          eachOrder.isRefunded = true;
          eachOrder.status = 'Refund Initiated';
         eachOrder.products = this.selectedOrder.products;
        }
      });
      this.webStorage.set('userDetails',userDetails);
      this.webStorage.set('orders',userDetails.orders);
      this.firebaseService.updateRecords('users',userDetails.id,userDetails);
      const data={
        complaintDesc:this.reasonForReturn,
        id: uniqueId(),
        status:'UNRS',
        userID:userDetails.id,
        userName:userDetails.name,
        returnedItems:returnedProducts

      } as any;
      this.loader.isLoading.next(true);
      this.firebaseService.addNewRecord('complaints',data).then((data:any)=>{
        this.router.navigate(['/products/orders']);
        this.loader.isLoading.next(false); 
      });


      


    }
   
    
  }

}
