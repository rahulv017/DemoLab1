import { Injectable } from '@angular/core';
import {map, catchError} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { throwError } from 'rxjs';
import{Observable} from 'rxjs';
import { PathService } from './path.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  path=this.pathS.getPath();
  port;
  constructor(private httpClient:HttpClient,private pathS:PathService) {
    
    this.port=this.pathS.getPort();
   }
  
  authenticate(username, password) {
    //console.log(this.path);
    return this.httpClient.post<any>(this.pathS.getPath()+this.pathS.getPort()+'/authenticate',{"username":username,"password":password}).pipe(
       map(
         userData => {
          sessionStorage.setItem('username',username);
          let tokenStr= 'Bearer '+userData.jwt;
          console.log(tokenStr);
          sessionStorage.setItem('token', tokenStr);
          sessionStorage.setItem('roles', userData.roles);
          return userData;
         }
       )

       
    );
  }

  signUpService(uname:string,pass:string,roles:string):Observable<string>
  {
    console.log(uname+pass+roles);
    let jsonData = {'uname' : uname,
                    'pass' : pass,
                    'roles' : roles  };
    return this.httpClient.put<string>(this.pathS.getPath()+this.pathS.getPort()+'/signup',jsonData);//.pipe(catchError(this.handleError));
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
      'INVALID CREDENTIALS');
  };


  
  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    //let user = this.username
    console.log(user)
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('roles');
    sessionStorage.setItem('validLogin',"false");
  }

}