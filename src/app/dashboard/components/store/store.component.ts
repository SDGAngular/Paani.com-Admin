import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { FirebaseControllerService } from 'src/app/core/services/firebase-controller.service';
import { GenerateExcelService } from '../../services/generate-excel.service';
import { LoaderService } from '../../services/loader.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  allProducts: any=[];
  copyAllProducts: any;
  recentlyAdded: any;
  totalProducts:any=0;
  featuredProducts:any=0;
  totalRevenue:any=0
  addNewProduct?: boolean;
  showSelected?: boolean;
  selectedProduct: any;
  isEdit!: boolean;
  newProduct: any = {
    productTitle: '',
    productDesc: '',
    price: '',
    isFeatured: '',
    coverImg: '',
  };

  constructor(
    private firebase: FirebaseControllerService,
    private searchService: SearchService,
    private excelService: GenerateExcelService,
    private loader: LoaderService,
  ) {}

  ngOnInit(): void {
    this.loader.start();
    this.firebase.showRecords().subscribe((data) => {
      const allProducts = data.docs.map((doc: any) => {
        return { id: doc.id, ...(doc.data() as any) };
      });
      this.allProducts = allProducts;
      this.copyAllProducts = _.cloneDeep(allProducts);
      console.log(this.allProducts);
      this.recentlyAdded = this.copyAllProducts.slice(
        Math.max(this.copyAllProducts.length - 5, 0)
      );
      this.recentlyAdded.forEach((eachRec: any) => {
        eachRec.isExpanded = false;
      });
      this.loader.stop();
      this.updateCount();
    });


    this.searchService.searchSubject.subscribe((data: any) => {
      console.log(data);
      this.searchText(data.text);
    });
  }
  enableEdit(): void {
    this.isEdit = true;
  }

  downloadExcel():void{

    let element = document.getElementById('products-table');
   
    const fileName = 'Products-Table';

    this.excelService.downloadExcel(element,fileName);
    
  }

  saveNewProduct(): void {
    this.loader.start();
    this.firebase.addNewRecord('products', this.newProduct).then((data) => {
      this.firebase.showRecords().subscribe((data) => {
        const allProducts = data.docs.map((doc: any) => {
          return { id: doc.id, ...doc.data() as any }
        })
        
        this.allProducts = allProducts;
        this.copyAllProducts = _.cloneDeep(allProducts);
        this.updateCount();
        this.addNewProduct= false;
        this.newProduct = {
          productTitle: '',
          productDesc: '',
          price: '',
          isFeatured: '',
          coverImg: ''
        }
        this.loader.stop();
      });
    })
   

  }

  saveEditData(): void {
    this.loader.start();
      const recordid = this.selectedProduct.id;
      this.firebase.updateRecords('products',recordid, this.selectedProduct).then((data:any)=>{
        this.isEdit=false;
        this.loader.stop();
      });
    
  }

  updateCount():void{
    this.featuredProducts=0;
    this.totalProducts=0;
    this.totalRevenue=0;
    this.copyAllProducts.forEach((eachProduct:any)=>{
      if(eachProduct.isFeatured){
        this.featuredProducts+=1;
      }
      this.totalProducts+=1;
      this.totalRevenue=this.totalRevenue+(eachProduct.price*eachProduct.price)
    });

  }
  

  deleteProduct(id: any): any {

    this.allProducts = this.allProducts.filter((eachProduct: any) => {
      return eachProduct.id !== id;
    });
    this.loader.start();
    this.firebase.delete_record('products', id).then((data: any) => {
     
        //For Future use
        if(this.selectedProduct.isFeatured){
          this.featuredProducts-=1;
        }
        this.totalProducts-=1;
        this.loader.stop();
        this.showSelected=false;
        

        
      
    }



    );

  }
  searchText(text:any):void{
   this.isEdit=false;
    text = text.toLowerCase();

    if (text
      === '') {
      this.allProducts = _.cloneDeep(this.copyAllProducts);
    }
    else {
      this.allProducts = this.copyAllProducts.filter((eachProd: any) => {
        return eachProd.productTitle.toLowerCase().indexOf(text) > -1 || eachProd.productDesc.toLowerCase().indexOf(text) > -1 || eachProd.id.toLowerCase().indexOf(text) > -1
      });
      
    }
  }
  enableAdd(): void {
    this.showSelected = false;
    this.addNewProduct = true;
  }
  selectProduct(product: any): void {
    this.showSelected = true;
    this.addNewProduct = false;
    this.isEdit = false;
    this.selectedProduct = product;
  }
  expandProduct(eachRec: any): void {
    this.recentlyAdded.forEach((data: any) => {
      data.isExpanded = false;
    });
    eachRec.isExpanded = !eachRec.isExpanded;
  }
}
