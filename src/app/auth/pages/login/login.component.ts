import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/dashboard/services/loader.service';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email?: string;
  password?: string;
  loading: boolean = false;
  invalidLogin?: boolean;
  constructor(private authService: AuthService,
    private loader: LoaderService,
    private router: Router) { }


  ngOnInit(): void {
  }
  enterTestCredentials():void{
    this.email='admin@paani.com';
    this.password='Voidmain1@'
  }
  loginWithEmailAndPassword(): any {
    this.loader.start();
    console.log(this.email, this.password);
    this.loading = true;
    this.authService.login(this.email, this.password).then((data: any) => {


      this.router.navigate(['dashboard/main-dashboard']);
      this.loader.stop();

    }, (error: any) => { console.log(error);
      this.invalidLogin = true;
      this.loader.stop();
      this.loading = false; })
   

  }

}
