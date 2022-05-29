import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { WebStorageService } from 'src/app/core/services/web-storage.service';
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
    email: new FormControl('',[Validators.required,Validators.email]),
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
  constructor(
    private spinner: NgxSpinnerService,
    private authService: AuthService, private router: Router,private webStorage:WebStorageService) { }


  ngOnInit(): void {
  }

  loginWithEmailAndPassword(): any {
    
    this.loading = true;
    this.spinner.show();
    this.authService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value).then((data: any) => {
     
      
      this.webStorage.set('userID',data.user.uid);
      this.spinner.hide();
      this.webStorage.set('myCart',[]);
      this.router.navigate(['dashboard/main-dashboard']);

    }, (error: any) => { console.log(error.message);
      this.invalidLogin = true;
      this.spinner.hide();
      this.loading = false; })
   

  }

  openRegistration():void {
this.register = true;
  }

  openLogin():void {
    this.register=false;
  }

}
