import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponentComponent } from './error-component/error-component.component';

const routes: Routes = [
  {path:'',loadChildren:()=>import("./auth/auth.module").then(mod=>mod.AuthModule)},
  {path:'dashboard',loadChildren:()=>import("./dashboard/dashboard.module").then(mod=>mod.DashboardModule)},
  {path:'products',loadChildren:()=>import("./products/products.module").then(mod=>mod.ProductsModule)},
  {path:'complaints',loadChildren:()=>import("./complaints/complaints.module").then(mod=>mod.ComplaintsModule)},
  {path:'error',component:ErrorComponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
