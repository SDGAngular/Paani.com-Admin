import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { FirebaseControllerService } from 'src/app/core/services/firebase-controller.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css'],
})
export class ComplaintsComponent implements OnInit {
  complaintTableData: any = [];
  cloneTableData: any = [];
  recipient: any;
  searchText: any;
  resolvedComplaints: number = 0;
  unresolvedComplaints: number = 0;
  escalatedComplaints: number = 0;
  sendMail: any;
  showTable?: boolean;
  constructor(private firebaseController: FirebaseControllerService) {}

  ngOnInit(): void {
    this.firebaseController.showRecords('Compalints').subscribe((data: any) => {
      const tableData = data.docs.map((doc: any) => {
        return { id: doc.id, ...(doc.data() as any) };
      });
      this.complaintTableData = tableData;
      this.cloneTableData = _.cloneDeep(tableData);
      console.log(this.complaintTableData);
      this.upDateCounts();
    });
  }

  upDateCounts(): any {
    this.unresolvedComplaints = 0;
    this.resolvedComplaints = 0;
    this.escalatedComplaints = 0;
    this.complaintTableData.forEach((eachComplaint: any) => {
      if (eachComplaint.status === 'UNRS') {
        this.unresolvedComplaints += 1;
      } else if (eachComplaint.status === 'RS') {
        this.resolvedComplaints += 1;
      } else if (eachComplaint.status === 'ESC') {
        this.escalatedComplaints += 1;
      }
    });
  }


  downloadExcel():void{
    this.showTable = true;
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 const fileName = 'Complaints-Table';
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, fileName);
    this.showTable = false;
  }
  saveRecords(record: any): any {
    this.upDateCounts();
    this.firebaseController.updateRecords('Compalints', record.id, record);
  }
  sendMessage(recipient?: any, buttonBody?: any): any {
    if (recipient) {
      this.recipient = '@' + recipient.userName;
    }
    if (buttonBody === 'inApp') {
      // body for msg
      this.sendMail = false;
    } else {
      // body for email
      this.sendMail = true;
    }
  }
  initiateRefund(record: any): any {
    record.complaintDesc = 'Refund Initiated.';
  }

  filterComplaints(): any {
    if (this.searchText === '') {
      this.complaintTableData = _.cloneDeep(this.cloneTableData);
    } else {
      this.complaintTableData = this.cloneTableData.filter(
        (eachRecord: any) => {
          return (
            eachRecord.complaintID
              .toLowerCase()
              .indexOf(this.searchText.toLowerCase()) > -1 ||
            eachRecord.userID
              .toLowerCase()
              .indexOf(this.searchText.toLowerCase()) > -1 ||
            eachRecord.userName
              .toLowerCase()
              .indexOf(this.searchText.toLowerCase()) > -1
          );
        }
      );
    }
  }
}
