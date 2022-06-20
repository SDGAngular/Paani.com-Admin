
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Chart, LinearScale, LineController, LineElement, PointElement, registerables, Title } from 'chart.js';
import * as _ from 'lodash';
import { LoaderService } from '../../services/loader.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  [x: string]: any;
  allPartners:any=[]
  notifications:any=[]
  showPartner:any;
  selectedPartner:any;
  copyAllPartners=[];

  constructor(private elementRef: ElementRef,
    private searchService: SearchService,
    private http: HttpClient,
    private loader: LoaderService,
   ) { }

  ngOnInit(): void {
    this.loader.start();
    setTimeout(()=>{
      
      this.loader.stop()
      this.http.get('../../../../assets/JSONS/partners-data.json').subscribe((data:any)=>{
        this.allPartners=data;
        this.copyAllPartners=_.cloneDeep(data);

       
        
      });

      this.http.get('../../../../assets/JSONS/analytics-notificatons.json').subscribe((data:any)=>{
        this.notifications=data;
        
      });
    
    },2000);
    
   
    this.searchService.searchSubject.subscribe((data)=>{
      console.log(data);
      this.searchText(data.text);
    })
    Chart.register(LineController, LineElement, PointElement, LinearScale, Title);
    Chart.register(...registerables);
    this.plotSalesChart();
    this.plotComplaints();
    this.plotRevenueChart();
  }

  searchText(text:any):void{
   
     text = text.toLowerCase();
 
     if (text
       === '') {
       this.allPartners = _.cloneDeep(this.copyAllPartners);
     }
     else {
       this.allPartners = this.copyAllPartners.filter((eachPartner: any) => {
         return eachPartner.partnerName.toLowerCase().indexOf(text) > -1 
       });
       
     }
   }
  plotSalesChart(): void {
    let htmlRef = this.elementRef.nativeElement.querySelector(`#sales`) as HTMLCanvasElement;
    const ctx = htmlRef.getContext('2d');

    const labels = [
      'January',
      'February',
      'March',
      'April',

    ];

    const data = {
      labels: labels,
      datasets: [{
        label: 'Net Sales',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [100, 200, 150, 250],
      }]
    };

    const config = {
      type: 'line',
      data: data,
      options: {}
    };
    const sales = new Chart(ctx as any, config as any);

  }

  plotComplaints(): void {
    let htmlRef = this.elementRef.nativeElement.querySelector(`#complaints`) as HTMLCanvasElement;
    const ctx = htmlRef.getContext('2d');


    const myChart = new Chart(ctx as any, {
      type: 'pie',
      data: {
        labels: ['Resolved','Unresolved'],
        datasets: [{
          label: 'Complaints',
          data: [12, 19],
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
           
          ],
          borderWidth: 1
        }]
      },
      options: {
      
      }
    });

  }
plotRevenueChart(): void {
  let htmlRef = this.elementRef.nativeElement.querySelector(`#revenue`) as HTMLCanvasElement;
    const ctx = htmlRef.getContext('2d');
    const myChart = new Chart(ctx as any, {
      type: 'bar',
      data: {
          labels: ['Jan','Feb','Mar','April'],
          datasets: [{
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
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
}

}
