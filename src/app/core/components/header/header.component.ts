import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  goToDashboard() {
    this.router.navigate(['dashboard/main-dashboard']);
  }

  logOut() {
    this.authService.logout().then((data: any) => {
      this.router.navigate([''])
    });

   
  }
}
