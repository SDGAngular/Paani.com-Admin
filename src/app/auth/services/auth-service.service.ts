import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authService:AngularFireAuth) {
   }

    //login

    register(email:any,password:any):any 
    {

     return this.authService.createUserWithEmailAndPassword(email,password);

    }
    login(email:any, password: any): any{
    return this.authService.signInWithEmailAndPassword(email,password)
    }

    logout():any{
     return this.authService.signOut();
    }
}
