import { Injectable } from '@angular/core';
import { RowFilter } from './filtering/RowFilter';

@Injectable({
  providedIn: 'root'
})
export class ColFilterService {

  constructor() { }
  userList:string;

  setData(data:string)
  {
    this.userList=data;
  }

  getData():string
  {
    let d=this.userList;
    //this.userList=null;
    return d;
  }
}
