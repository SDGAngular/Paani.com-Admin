import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComplaintsRoutingModule } from './complaints-routing.module';
import { ComplaintsComponent } from './pages/complaints/complaints.component';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
@NgModule({
  declarations: [
    ComplaintsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    MatMenuModule,
    MatIconModule,
    ComplaintsRoutingModule
  ]
})
export class ComplaintsModule { }
