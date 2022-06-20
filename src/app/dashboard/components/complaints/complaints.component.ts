import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { uniqueId } from 'lodash';
import { AuthService } from 'src/app/auth/services/auth-service.service';
import { FirebaseControllerService } from 'src/app/core/services/firebase-controller.service';
import { LoaderService } from '../../services/loader.service';
import { SearchService } from '../../services/search.service';
import * as XLSX from 'xlsx';
import { GenerateExcelService } from '../../services/generate-excel.service';
@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css'],
})
export class ComplaintsComponent implements OnInit {
  totalComplaints = 0;
  allComplaints: any = [];
  copyComplaints: any = [];
  resolvedComplaints = 0;
  showSelected:any;
  isEdit:boolean = false;
  unresolvedComplaints = 0;
  selectedComplaint: any;

  constructor(
    private firebase: FirebaseControllerService,
    private searchService: SearchService,
    private loader: LoaderService,
    private excelService: GenerateExcelService
  ) {}

  ngOnInit(): void {
    this.loader.start();
    this.searchService.searchSubject.subscribe((data:any)=>{
      this.searchText(data.text);
    });
    this.firebase.showRecords('complaints').subscribe((data) => {
      const allComplaints = data.docs.map((doc: any) => {
        return { id: doc.id, ...(doc.data() as any) };
      });
      this.loader.stop();
      this.allComplaints = allComplaints;
      this.copyComplaints = _.cloneDeep(allComplaints);
      console.log(allComplaints);
      allComplaints.forEach((eachComplaint:any)=>{
        
        eachComplaint.orderCost =0;
        eachComplaint.returnedItems.forEach((eachProd:any)=>{
          eachComplaint.orderCost+=(eachProd.qty*eachProd.price);
        })
      });

      this.updateCount();
      
    });
  }
  searchText(text:any):void{
  
     text = text.toLowerCase();
 
     if (text
       === '') {
       this.allComplaints = _.cloneDeep(this.copyComplaints);
     }
     else {
       this.allComplaints = this.copyComplaints.filter((eachComplaint: any) => {
         return eachComplaint.id.toLowerCase().indexOf(text) > -1;
       });
       
     }
   }
  updateCount():void{
    this.totalComplaints=0;
    this.resolvedComplaints=0;
    this.unresolvedComplaints=0;
    this.allComplaints.forEach((eachComplaint:any)=>{
      if(eachComplaint.status==='UNRS'){
        this.unresolvedComplaints+=1;
      }
      else{
        this.resolvedComplaints+=1
      }
      this.totalComplaints+=1;

    });
  }

  downloadExcel():void{

    let element = document.getElementById('complaints-table');
   
    const fileName = 'Complaints-Table';

    this.excelService.downloadExcel(element,fileName);
    
  }

  saveEditData():void{
    this.loader.start();
    this.updateCount();
    const recordid = this.selectedComplaint.id;
    this.firebase.updateRecords('complaints',recordid, this.selectedComplaint).then((data:any)=>{
      this.isEdit=false;
      this.loader.stop();
      
    });
  }


  selectComplaint(complaint: any): void {
    this.showSelected=true;
    this.selectedComplaint=complaint;

  }
}
