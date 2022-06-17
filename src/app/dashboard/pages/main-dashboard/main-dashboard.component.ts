import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { FirebaseControllerService } from 'src/app/core/services/firebase-controller.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { WebStorageService } from 'src/app/core/services/web-storage.service';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { HeaderComponent } from 'src/app/core/components/header/header.component';
@Component({
  selector: 'app-main-dashboard',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('1000ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('1000ms ease-in', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
  ],

  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css'],
})
export class MainDashboardComponent implements OnInit {
  @ViewChild(HeaderComponent)
  private headerComponent?: HeaderComponent;
  [x: string]: any;
  sliderIndex: number = 0;
  elem: any;
  allProducts: any;
  copyAllProducts: any;

  advertiseMents = [
    {
      imageSrc:
        'https://media.istockphoto.com/photos/containers-for-water-of-different-shapes-3d-illustration-picture-id1205272029?k=20&m=1205272029&s=612x612&w=0&h=30b6CTQJAiXgEc1gz3l5EmX-pu5c_5PgwhInO89q5PA=',
      category: 'Water Containers',
      desc: 'Up to 50% Off. Use Code JalPani',
    },

    {
      imageSrc:
        'https://5.imimg.com/data5/JX/CN/MY-37425915/750ml-copper-water-bottle-500x500.jpg',
      category: 'Copper Water Bottles',
      desc: 'Up to 20% Off. Use Code MyBottle',
    },
  ];

  constructor(
    private webStorage: WebStorageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
   
  ) {}

  ngOnInit(): void {
    const allProducts = this.activatedRoute.snapshot.data[
      'productDetails'
    ].docs.map((doc: any) => {
      return { id: doc.id, ...(doc.data() as any) };
    });
    console.log(allProducts);
    this.allProducts = allProducts;
    this.webStorage.set('allProducts', allProducts);

    console.log(this.allProducts);
    this.copyAllProducts = _.cloneDeep(allProducts);

    const allUsers = this.activatedRoute.snapshot.data['userDetails'].docs.map(
      (doc: any) => {
        return { id: doc.id, ...(doc.data() as any) };
      }
    );

    const loggedInUser = this.webStorage.get('userID');
    allUsers.forEach((eachUser: any) => {
      if (eachUser.userID === loggedInUser) {
        
        this.webStorage.set('userDetails', eachUser);
        this.webStorage.set('myCart', eachUser.cart);
        // this.headerComponent!.cartCount = eachUser.cart.length;
        console.log(eachUser.orders);
        this.webStorage.set('orders', eachUser.orders);
      }
    });
  }
  showProduct(product: any): void {
    this.webStorage.set('selectedProduct', product);
    this.router.navigate(['products/all-products', product.id]);
  }

  changeSlider(change: string): void {
    console.log('Slider Index', this.sliderIndex);
    if (change === 'inc') {
      if (this.advertiseMents.length > this.sliderIndex + 1) {
        this.sliderIndex += 1;
      } else {
        console.log(this.sliderIndex);
        this.sliderIndex = 0;
      }
    } else {
      if (this.sliderIndex >= 1) {
        this.sliderIndex -= 1;
      } else {
        console.log(this.sliderIndex);
        this.sliderIndex = this.advertiseMents.length - 1;
      }
    }
  }
}
