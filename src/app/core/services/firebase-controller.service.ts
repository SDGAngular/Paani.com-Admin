import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseControllerService {
  allRecords: any=[];
  constructor(private fireStore: AngularFirestore) { }

  public  showRecords(key?:string):Observable<any>{

    if(key){
      return  this.fireStore.collection(key).get();
    }
    return  this.fireStore.collection('products').get();
   
  }

  addNewRecord(key:any,record:any){
return this.fireStore.collection(key).add(record);
  }

  updateRecords(key:string, recordid: any, record: any)
  {
    this.fireStore.doc(key+'/' + recordid).update(record);
  }

  delete_record(key:any,record_id:any): any
  {
    return this.fireStore.doc(key+'/' + record_id).delete();
  }


}
