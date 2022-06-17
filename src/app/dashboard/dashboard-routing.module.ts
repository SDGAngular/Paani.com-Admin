import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainDashboardComponent } from './pages/main-dashboard/main-dashboard.component';
import { ProductsResolver } from './services/products.resolver';
import { UserDetailsResolver } from './services/user-details.resolver';

const routes: Routes = [
  {
    path:'main-dashboard',
  component:MainDashboardComponent,
  resolve:{
    productDetails:ProductsResolver,
    userDetails: UserDetailsResolver
  }
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
