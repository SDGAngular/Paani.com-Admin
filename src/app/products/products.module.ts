import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { AllProductsComponent } from './pages/all-products/all-products.component';
import { HeaderComponent } from '../core/components/header/header.component';
import { FooterComponent } from '../core/components/footer/footer.component';
import { CoreModule } from '../core/core.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AllProductsComponent,
 
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ProductsRoutingModule,
    
  ]
})
export class ProductsModule { }
