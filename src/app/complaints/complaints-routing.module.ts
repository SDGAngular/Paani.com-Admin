import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComplaintsComponent } from './pages/complaints/complaints.component';
import { InitiateRefundComponent } from './pages/initiate-refund/initiate-refund.component';

const routes: Routes = [

  {
    path:'all-complaints',
    component: ComplaintsComponent
  },
  {
    path:'initiate-refund/:id',
    component:InitiateRefundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComplaintsRoutingModule { }
