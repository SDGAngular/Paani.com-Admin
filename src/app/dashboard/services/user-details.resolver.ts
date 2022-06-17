import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { FirebaseControllerService } from 'src/app/core/services/firebase-controller.service';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsResolver implements Resolve<boolean> {
  constructor(private fireController: FirebaseControllerService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.fireController.showRecords('users');
  }
}
