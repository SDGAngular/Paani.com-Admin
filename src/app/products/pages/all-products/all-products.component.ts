import { Component, OnInit } from '@angular/core';
import { FirebaseControllerService } from 'src/app/core/services/firebase-controller.service';
import * as _ from 'lodash';
import { WebStorageService } from 'src/app/core/services/web-storage.service';
@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})

export class AllProductsComponent implements OnInit {
  allProducts: any = [];
  featuredProducts: any;
  selectedProduct: any;
  searchText: any;
  deleteProductId:any =-1;
  selectedIndex: any = -1;
  newProduct: any = {
    productTitle: '',
    productDesc: '',
    price: '',
    isFeatured: '',
    coverImg: ''
  }
  constructor(public fireController: FirebaseControllerService,public webstorage: WebStorageService) { }

  ngOnInit(): void {

  this.allProducts = this.webstorage.get('allProducts');
  this.selectedProduct= this.webstorage.get('selectedProduct')
  this.setFeatured();
  }

  setFeatured(): void {
    this.featuredProducts = this.allProducts.filter((eachProd:any)=>{
    return eachProd.isFeatured && eachProd.id!==this.selectedProduct.id;
    })
  }


  setSelected(product:any): void {
this.selectedProduct = product;
this.setFeatured();
this.webstorage.set('selectedProduct',product);
  }
 

  
 

 

}
