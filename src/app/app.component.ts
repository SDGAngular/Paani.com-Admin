import { Component } from '@angular/core';
import { LoaderService } from './dashboard/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public loader: LoaderService){}
  title = 'paani-admin';
}
