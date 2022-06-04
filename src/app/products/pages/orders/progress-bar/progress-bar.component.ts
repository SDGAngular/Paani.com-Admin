import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {

  constructor() { }
  progress?: any;
  circles:any;
  actives?:any
  currentActive=1;
  @Input() steps:any;


  ngOnInit(): void {

     this.progress = document.getElementById('progress');
     if(status==='delivered'){
       this.currentActive = 4;
     }
     else{
      this.currentActive = 2;
     }

     this.circles = document.querySelectorAll('.circles');
    
 
  }

 update() {
    this.circles.forEach((circle:any, index:any) => {
      if(index < this.currentActive) {
        circle.classList.add('active')
      } else {
        circle.classList.remove('active')
      }

     })
     this.actives = document.querySelectorAll('.active');
 
    let pm=2
    console.log(this.progress);
     this.progress.style.width = '50%';
     console.log(this.progress.style.width)



}


}
