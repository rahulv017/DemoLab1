import { Injectable } from '@angular/core';
import { RouteReuseStrategy, Router } from '@angular/router';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
//import '../assets/dummy.json';
import { Observable } from 'rxjs';
import {User} from './User';
import { RowFilter } from './filtering/RowFilter';
import { Status } from './status';
import { Deep } from './Deep';
import { Dashboard } from './Dashboard';
import { throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { LabLinking } from './lab-linking';
import { PathService } from './path.service';


@Injectable({
  providedIn: 'root'
})
export class InputServiceService {
   url="http://localhost:8080";
   path:string;
   port:string;
  constructor(private route:Router, private _http:HttpClient,private pathS:PathService) {
    this.path=this.pathS.getPath();
    this.port=this.pathS.getPort();
    console.log(this.path);
   }

   private _url:string=this.path+this.port+'/search';
 //  private jwtToken:string="Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJQaXl1c2giLCJleHAiOjE1ODY5NzUzMDgsImlhdCI6MTU4NjkzOTMwOH0.eltQ1vAmfLjmzarkarnP466hCtteqvN6oix49qx6-OY";

  getUserData(patientID:number):Observable<User[]>
  {
   let JsonData={'adbsID':[patientID]};
   //  const headers = { 'Authorization': this.jwtToken};
     console.log(patientID);
     // return this._http.get<User[]>(this._url);
     return this._http.post<User[]>(this._url,JsonData);
    
  }

  getUserDataBrief():Observable<User[]>
  {
   //let JsonData={'adbsID':[patientID]};
   let _url1 : string=this.path+this.port+'/brieftable';
  //   const headers = { 'Authorization': this.jwtToken};
   //  console.log(patientID);
      return this._http.get<User[]>(_url1);
    // return this._http.post<User[]>(this._url,JsonData,{headers});
    
  }

  getBreifTable(data:string):Observable<User[]>
  {
    let _url1:string=this.path+'/filter';
  //  let JsonData={'adbsID':[patientID]};
   //  const headers = { 'Authorization': this.jwtToken};
     console.log(data);
     // return this._http.get<User[]>(this._url);
     return this._http.post<User[]>(_url1,data);
  }

  getLabStatusDetails():Observable<LabLinking[]>
  {
    let _url1:string=this.path+this.port+'/status/true';
    //let JsonData={'assess_id':data.Assessment_ID};
  //  const headers = { 'Authorization': this.jwtToken};
   // console.log(JsonData);
    // return this._http.post<Status>(_url1,JsonData,{headers});
     return this._http.get<LabLinking[]>(_url1,).pipe(catchError(this.handleError));
     

  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  getLabSpecificDetails(data)
  {
    let _url1:string=this.path+this.port+'/getlabdetails';
    //let JsonData={'assess_id':data.Assessment_ID};
  //  const headers = { 'Authorization': this.jwtToken};
    console.log(data);
     return this._http.post<Status>(_url1,data);
     //return this._http.get<LCL[]>(_url1);
  }

  saveBriefUpdated(data:User)
  {
    let _url1:string=this.path+this.port+'/updatebrieftable';
   // let JsonData={'assess_id':data.Assessment_ID};
 //   const headers = { 'Authorization': this.jwtToken};
    console.log(data);
    // return this._http.post<Status>(_url1,JsonData,{headers});
     return this._http.put(_url1,data);
  }

  getCompleteDeepTable():Observable<Deep[]>
  {
    let _url1:string=this.path+this.port+'/deeptable';
   // let JsonData={'assess_id':data.Assessment_ID};
   // const headers = { 'Authorization': this.jwtToken};
   // console.log(data);
    // return this._http.post<Status>(_url1,JsonData,{headers});
     return this._http.get<Deep[]>(_url1);
  }

  getUserDataByAssID(patientID:string):Observable<User>
  {
    let _url1:string=this.path+this.port+'/searchbyassessment';
   let JsonData={"D_no":patientID};
  //   const headers = { 'Authorization': this.jwtToken};
     console.log(patientID);
      //return this._http.get<User>(this._url);
     return this._http.post<User>(_url1,JsonData);
    
  }
  saveDeepUser(data:Deep)
  {
    let _url1:string=this.path+this.port+'/insert';
   // let JsonData={'assess_id':data.Assessment_ID};
  //  const headers = { 'Authorization': this.jwtToken};
    console.log(data);
    // return this._http.post<Status>(_url1,JsonData,{headers});
     return this._http.post(_url1,data);
  }

  getDashboardData():Observable<Dashboard[]>
  {
    let _url1:string=this.path+this.port+'/dashboard';
    // let JsonData={'assess_id':data.Assessment_ID};
  //   const headers = { 'Authorization': this.jwtToken};
    // console.log(data);
     // return this._http.post<Status>(_url1,JsonData,{headers});
      return this._http.get<Dashboard[]>(_url1);
  }

}
