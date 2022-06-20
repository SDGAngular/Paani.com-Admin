import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth-service.service';
import { LoaderService } from 'src/app/dashboard/services/loader.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    public loader: LoaderService,
  ) {}
  cartCount = 0;
  isSideBarOpen = false;
  userDetails: any;
  url: any;
  @Input() hideCart?:boolean
  @Input() hideNav?:boolean
  ngOnInit(): void {
   

    this.url = this.router.url;
    if (this.url.indexOf('all-products') > -1) {
      this.url = 'all-products';
    }
  }

  openSideBar(): void {
    this.isSideBarOpen = !this.isSideBarOpen;
  }
  goToOrders(): void {
    this.router.navigate(['/products/orders']);
  }
  goToCart(): void {
    this.router.navigate(['products/product-cart']);
  }

  goToProducts(): void {
    this.router.navigate(['products/all-products', 'Zv3jYJtXWRY6l669weee']);
  }

  goToDashboard() {
    this.router.navigate(['dashboard/main-dashboard']);
  }

  logOut() {
    sessionStorage.clear();
    this.authService.logout().then((data: any) => {
      this.router.navigate(['']);
    });
  }
}
