import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email?: string;
  register?:boolean;
  password?: string;
  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.pattern('"[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$"')]),
    password: new FormControl('',[Validators.required,Validators.minLength(5)])
}); 
registrationForm = new FormGroup({
  email: new FormControl('',[Validators.required,Validators.pattern('"[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$"')]),
  password1: new FormControl('',[Validators.required,Validators.minLength(5)]),
  password2: new FormControl('',[Validators.required,Validators.minLength(5)]),
  name: new FormControl('',[Validators.required,Validators.minLength(5)]),
  
}); 
  loading: boolean = false;
  invalidLogin?: boolean;
  constructor(private authService: AuthService, private router: Router) { }


  ngOnInit(): void {
  }

  loginWithEmailAndPassword(): any {
    console.log(this.loginForm);
    this.loading = true;
    this.router.navigate(['dashboard/main-dashboard']);
    // this.authService.login(this.loginForm.get('email'), this.loginForm.get('password')).then((data: any) => {


    //   this.router.navigate(['dashboard/main-dashboard']);

    // }, (error: any) => { console.log(error);
    //   this.invalidLogin = true;
    //   this.loading = false; })
   

  }

  openRegistration():void {
this.register = true;
  }

  openLogin():void {
    this.register=false;
  }

}
