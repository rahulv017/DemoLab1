import { Injectable } from '@angular/core';
import { LCL } from './Lcl_Lab';

@Injectable({
  providedIn: 'root'
})
export class LCLReportService {

  constructor() { }
  private userLi
   getData():LCL
   {
    let temp:LCL=this.userLi;
    // console.log(temp[0]);
     this.userLi=undefined;
     return temp;

   }

   setData(dataList:LCL)
   {
     this.userLi=dataList;
     console.log(this.userLi);
   }
}
