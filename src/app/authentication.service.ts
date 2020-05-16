import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

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
          return userData;
         }
       )
    );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    //let user = this.username
    console.log(user)
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username')
  }

}
