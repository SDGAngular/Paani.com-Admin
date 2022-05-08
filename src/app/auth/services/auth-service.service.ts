import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authService:AngularFireAuth) {
   }

    //login
    login(email:any, password: any): any{
    return this.authService.signInWithEmailAndPassword(email,password)
    }
}
