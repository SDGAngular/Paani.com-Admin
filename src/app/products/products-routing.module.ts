import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './pages/all-products/all-products.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProductCartComponent } from './product-cart/product-cart.component';

const routes: Routes = [
  {
    path:'all-products/:id',
    component: AllProductsComponent
  },

  {
    path:'product-cart',
    component: ProductCartComponent,
  },
  {
    path:'orders',
    component: OrdersComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
