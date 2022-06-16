import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FirebaseControllerService } from 'src/app/core/services/firebase-controller.service';
import { WebStorageService } from 'src/app/core/services/web-storage.service';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email?: string;
  register?: boolean;
  password?: string;
  credAdded?:boolean = false;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });
  registrationForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('"[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2, 4}$"'),
    ]),
    password1: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    password2: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });
  loading: boolean = false;
  invalidLogin?: boolean;
  errorMsg: any;
  constructor(
    private spinner: NgxSpinnerService,
    private firebaseService: FirebaseControllerService,
    private authService: AuthService,
    private router: Router,
    private webStorage: WebStorageService
  ) {}

  ngOnInit(): void {}

  loginWithEmailAndPassword(): any {
    this.loading = true;
    this.spinner.show();
    this.authService
      .login(
        this.loginForm.get('email')?.value,
        this.loginForm.get('password')?.value
      )
      .then(
        (data: any) => {
          this.webStorage.set('userID', data.user.uid);
          this.spinner.hide();
          // this.webStorage.set('myCart',[]);

          this.router.navigate(['dashboard/main-dashboard']);
        },
        (error: any) => {
          console.log(error.message);
          this.invalidLogin = true;
          this.errorMsg = 'Invalid Login Credentials';
          this.spinner.hide();
          this.loading = false;
        }
      );
  }

  openRegistration(): void {

    this.invalidLogin = false;
    this.register = true;
  }

  openLogin(): void {
    this.invalidLogin = false;
    this.register = false;
  }
  addCred():void {
    this.credAdded=!this.credAdded;
    console.log('pcii')
    if(this.credAdded){
    this.loginForm.patchValue({
      'email':'admin@paani.com',
      'password':'Voidmain1@'
    });
    }
    else{
      this.loginForm.reset();
    }
    
  }
  registerNewUser(): void {
    const email = this.registrationForm.get('email')?.value;
    const pwd1 = this.registrationForm.get('password1')?.value;
    const pwd2 = this.registrationForm.get('password2')?.value;
    const name = this.registrationForm.get('name')?.value;
    console.log(name);
    if (pwd1 === pwd2) {
      this.authService.register(email, pwd1).then((data: any) =>
       {
        if (data) {
          console.log(data);
          this.webStorage.set('userID', data.user.uid);
          this.firebaseService.addNewRecord('users', {
            userID: data.user.uid,
            cart: [],
            address: '',
            phoneNumber: '',
            orders: [],
            isPremium: true,
            pinCode: '',
          });
        }
      },
      (error:any)=>{
        this.errorMsg = error.errors[0].message;
        this.invalidLogin=true;
       
      });
    } else {
      this.invalidLogin = true;
      this.errorMsg = 'Both Passwords dont match';
    }
  }
}
