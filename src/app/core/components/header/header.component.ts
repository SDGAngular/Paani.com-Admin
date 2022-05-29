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
  ngOnInit(): void {
    const myCart = this.webStorage.get('myCart');
    if(myCart){
      this.cartCount = myCart.length;
    }

  }
  goToCart():void {
    this.router.navigate(['products/product-cart']);
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
