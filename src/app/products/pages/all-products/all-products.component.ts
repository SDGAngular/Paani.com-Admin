import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HeaderComponent } from 'src/app/core/components/header/header.component';
import { FirebaseControllerService } from 'src/app/core/services/firebase-controller.service';
import { WebStorageService } from 'src/app/core/services/web-storage.service';
import { LoaderService } from 'src/app/dashboard/services/loader.service';
@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})

export class AllProductsComponent implements OnInit {
  @ViewChild(HeaderComponent)
private headerComponent?: HeaderComponent; 
  allProducts: any = [];
  featuredProducts: any;
  selectedID: any;
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
  constructor(
    private activatedRoute: ActivatedRoute,
    public router:Router,
    private loader: LoaderService,
    private spinner: NgxSpinnerService,
    public fireController: FirebaseControllerService,public webstorage: WebStorageService) { }

  ngOnInit(): void {


    this.loader.isLoading.next(true);
  this.activatedRoute.params.subscribe(( params:any) => this.selectedID = params.id );
  console.log(this.selectedID);
  
  this.fireController.showRecords('products').subscribe(
(data:any)=>{
  const allProducts = data.docs.map((doc: any) => {
    this.loader.isLoading.next(false);
    return { id: doc.id, ...doc.data() as any }

  });
  this.allProducts = allProducts;
  const myCart = this.webstorage.get('myCart');
  if(myCart){
    this.allProducts.forEach((eachProd:any) => {
      myCart.forEach((eachProdInCart:any) => {
        if(eachProdInCart.id ===eachProd.id){
          eachProd.isAdded = true;

          
        }
        
      });
    });
  }
 
  this.selectedProduct = allProducts.filter((data:any)=>{
    return data.id === this.selectedID;
  })[0];
  
  this.setFeatured();
  this.spinner.hide();
}
    
  )


    
    }

  setFeatured(): void {
    this.featuredProducts = this.allProducts.filter((eachProd:any)=>{
    return eachProd.isFeatured && eachProd.id!==this.selectedProduct.id;
    })
  }


  setSelected(product:any): void {
    this.router.navigate(['products/all-products',product.id]);
    this.ngOnInit();
  }
 

  addToCart(product:any):void {
    if(!product.isAdded){
      this.headerComponent!.cartCount+=1;
      product.isAdded = true;
      product.qty = 1;
      this.spinner.show();
      console.log(this.headerComponent?.cartCount as any);
      const userData = this.webstorage.get('userDetails');
      userData.cart.push(product);
      this.fireController.updateRecords('users',userData.id,userData).then((data)=>{
  this.spinner.hide();
      });
      let myCart = this.webstorage.get('myCart')
      if(!myCart){
         myCart = [product];
       
      }
      else{
        myCart.push(product);
      }

      this.webstorage.set('myCart',myCart);
     
    }
    
  }

  
 

 

}
