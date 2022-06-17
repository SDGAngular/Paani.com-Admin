import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MatProgressBar, MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatProgressBarModule
  ],
  exports:[
    HttpClientModule,
    HeaderComponent,
    FooterComponent,
    SpinnerComponent
  ]
})
export class CoreModule { }
