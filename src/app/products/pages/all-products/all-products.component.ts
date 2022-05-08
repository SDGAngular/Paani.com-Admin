import { Component, OnInit } from '@angular/core';
import { FirebaseControllerService } from 'src/app/core/services/firebase-controller.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})

export class AllProductsComponent implements OnInit {
  allProducts: any = [];
  copyAllProducts: any;
  searchText: any;
  selectedIndex:any = -1;
  constructor(public fireController: FirebaseControllerService) { }

  ngOnInit(): void {

    this.fireController.showRecords().subscribe((data) => {
      const allProducts = data.docs.map((doc: any) => {
        return { id: doc.id, ...doc.data() as any }
      })
      this.allProducts = allProducts;
      this.copyAllProducts = _.cloneDeep(allProducts);

    });



  }


  EnableEdit(index:any,saveDetils?:boolean):void{
    this.selectedIndex = index;
    if(saveDetils){

      this.selectedIndex = -1;
      const recordid = this.allProducts[index].id;
      this.fireController.updateRecords(recordid,this.allProducts[index]);
    }
  }

  searchProducts(): any {
    console.log("hello");
    this.searchText = this.searchText.toLowerCase();

    if (this.searchText
     === '') {
      this.allProducts = _.cloneDeep(this.copyAllProducts);
    }
    else {
     this.allProducts = this.copyAllProducts.filter((eachProd: any) => {
        return eachProd.productTitle.toLowerCase().indexOf(this.searchText) > -1 || eachProd.productDesc.toLowerCase().indexOf(this.searchText) > -1 || eachProd.id.toLowerCase().indexOf(this.searchText) > -1
      });
      console.log(this.allProducts);
    }

  }

}
