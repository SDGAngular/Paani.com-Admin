import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { AllProductsComponent } from './pages/all-products/all-products.component';
import { HeaderComponent } from '../core/components/header/header.component';
import { FooterComponent } from '../core/components/footer/footer.component';
import { CoreModule } from '../core/core.module';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ProductCartComponent } from './product-cart/product-cart.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProgressBarComponent } from './pages/orders/progress-bar/progress-bar.component';


@NgModule({
  declarations: [
    AllProductsComponent,
    ProductCartComponent,
    OrdersComponent,
    ProgressBarComponent,
 
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    NgxSpinnerModule,
    ProductsRoutingModule,
    
  ]
})
export class ProductsModule { }
