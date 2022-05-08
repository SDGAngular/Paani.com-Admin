import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',loadChildren:()=>import("./auth/auth.module").then(mod=>mod.AuthModule)},
  {path:'dashboard',loadChildren:()=>import("./dashboard/dashboard.module").then(mod=>mod.DashboardModule)},
  {path:'products',loadChildren:()=>import("./products/products.module").then(mod=>mod.ProductsModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
