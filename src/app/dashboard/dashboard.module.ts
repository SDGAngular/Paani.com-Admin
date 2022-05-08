import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainDashboardComponent } from './pages/main-dashboard/main-dashboard.component';



@NgModule({
  declarations: [
    MainDashboardComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
