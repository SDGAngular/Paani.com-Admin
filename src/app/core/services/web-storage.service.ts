import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebStorageService {

  constructor()  { }

  get(key:string):any{
return JSON.parse(sessionStorage.getItem(key) as string);

  }

  set(key:string,body:any):void{
    
    sessionStorage.setItem(key,JSON.stringify(body));

  }
}
