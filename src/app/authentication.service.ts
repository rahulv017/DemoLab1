import { Injectable } from '@angular/core';
import {map, catchError} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient:HttpClient) { }
  
  authenticate(username, password) {
    return this.httpClient.post<any>('https://localhost:8443/authenticate',{"username":username,"password":password}).pipe(
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


 /* private handleError(error: HttpErrorResponse) {
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
  };*/


  
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
  }

}
