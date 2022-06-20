import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Route, Router } from '@angular/router';
import {
  Chart,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  registerables,
  Title,
} from 'chart.js';
import { AuthService } from 'src/app/auth/services/auth-service.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css'],
})
export class MainDashboardComponent implements OnInit {

  
  innerWidth?: number;
  [x: string]: any;
  dark?: boolean;
  searchedText:any;
  appliedTab?: string;
  showSideBar?: boolean = true;
  searchForm = new FormControl('');
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
    if(this.innerWidth<768){
      this.showSideBar=false;
    }
    else{
      this.showSideBar=true;
    }

    console.log(this.innerWidth);
  }

  constructor(private elementRef: ElementRef, 
    private searchService: SearchService,
    private authService: AuthService,
    private router:Router
    ) {}

  ngOnInit(): void {
    Chart.register(
      LineController,
      LineElement,
      PointElement,
      LinearScale,
      Title
    );
    Chart.register(...registerables);
    this.appliedTab = 'analytics';
    // this.searchForm?.valueChanges.subscribe((data)=>{
    //   console.log(data);
    // })
    // this.plotSalesChart();
    // this.plotComplaints();
    // this.plotRevenueChart();
  }

  

  logOut() {
    this.authService.logout().then((data: any) => {
      this.router.navigate([''])
    });

   
  }
  
  hideSideBar(): void {
    this.showSideBar = !this.showSideBar;
  }
  setTab(tab: string): void {
    this.appliedTab = tab;
  }
  toggleDark(): void {
    console.log('toggling');
    this.dark = !this.dark;
    if (this.dark) {
      document.body.classList.add('dark');
      this.ngOnInit();
    } else {
      document.body.classList.remove('dark');
      this.ngOnInit();
    }
  }
  searchText(){
    this.searchService.triggerSearch({
      text:this.searchedText,
      tab:this.appliedTab
    });

  }
 
  plotSalesChart(): void {
    let htmlRef = this.elementRef.nativeElement.querySelector(
      `#sales`
    ) as HTMLCanvasElement;
    const ctx = htmlRef.getContext('2d');

    const labels = ['January', 'February', 'March', 'April'];

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Net Sales',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: [100, 200, 150, 250],
        },
      ],
    };

    const config = {
      type: 'line',
      data: data,
      options: {},
    };
    const sales = new Chart(ctx as any, config as any);
  }

  plotComplaints(): void {
    let htmlRef = this.elementRef.nativeElement.querySelector(
      `#complaints`
    ) as HTMLCanvasElement;
    const ctx = htmlRef.getContext('2d');

    const myChart = new Chart(ctx as any, {
      type: 'pie',
      data: {
        labels: ['Resolved', 'Unresolved'],
        datasets: [
          {
            label: 'Complaints',
            data: [12, 19],
            backgroundColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
            borderWidth: 1,
          },
        ],
      },
      options: {},
    });
  }
  plotRevenueChart(): void {
    let htmlRef = this.elementRef.nativeElement.querySelector(
      `#revenue`
    ) as HTMLCanvasElement;
    const ctx = htmlRef.getContext('2d');
    const myChart = new Chart(ctx as any, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'April'],
        datasets: [
          {
            label: 'Total Revenue (in INR)',
            data: [50000, 45000, 55000, 76000],
            backgroundColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
