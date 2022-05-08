import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseControllerService {
  allRecords: any=[];
  constructor(private fireStore: AngularFirestore) { }

  public  showRecords():Observable<any>{
    return  this.fireStore.collection('products').get();
   
  }

  updateRecords(recordid: any, record: any)
  {
    this.fireStore.doc('products/' + recordid).update(record);
  }


}
