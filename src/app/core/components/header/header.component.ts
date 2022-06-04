import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth-service.service';
import { WebStorageService } from '../../services/web-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService,
    private webStorage: WebStorageService) {}
  cartCount =0;
  url:any;
  ngOnInit(): void {
    const myCart = this.webStorage.get('myCart');
    if(myCart){
      this.cartCount = myCart.length;
    }

   this.url= this.router.url;
   if(this.url.indexOf('all-products')>-1){
     this.url='all-products'
   }

  }

  goToOrders(): void {
    this.router.navigate(['/products/orders']);
  }
  goToCart():void {
    this.router.navigate(['products/product-cart']);
  }

  goToProducts():void {
    this.router.navigate(['products/all-products','Zv3jYJtXWRY6l669weee']);
  }

  goToDashboard() {
    this.router.navigate(['dashboard/main-dashboard']);
  }

  logOut() {
    this.authService.logout().then((data: any) => {
      this.router.navigate([''])
    });

   
  }
}
