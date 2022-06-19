import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public searchSubject:BehaviorSubject<any>= new BehaviorSubject<any>({
    tab:'',
    searchText:''
  });
  constructor() { }

  triggerSearch(searchtext:any):void{
    this.searchSubject.next(searchtext);
  }
}
