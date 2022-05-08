import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private authService: AuthService, private router: Router) { }


  ngOnInit(): void {
  }

  loginWithEmailAndPassword(): any {
    console.log(this.email, this.password);
    this.loading = true;
    this.authService.login(this.email, this.password).then((data: any) => {


      this.router.navigate(['dashboard/main-dashboard']);

    }, (error: any) => { console.log(error);
      this.invalidLogin = true;
      this.loading = false; })
   

  }

}
