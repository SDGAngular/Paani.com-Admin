import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainDashboardComponent } from './pages/main-dashboard/main-dashboard.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StoreComponent } from './components/store/store.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ComplaintsComponent } from './components/complaints/complaints.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';




@NgModule({
  declarations: [
    MainDashboardComponent,
    DashboardComponent,
    StoreComponent,
    AnalyticsComponent,
    OrdersComponent,
    ComplaintsComponent,
  
    
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    HttpClientModule,
    DashboardRoutingModule,
    MatProgressBarModule
  ]
})
export class DashboardModule { }
