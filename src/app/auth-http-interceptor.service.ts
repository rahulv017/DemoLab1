import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpInterceptorService implements HttpInterceptor {
  
  constructor(private router:Router) {

  }
  
  intercept(req: HttpRequest<any>,next:HttpHandler){
    
    console.log(req.url.toString());

    if(req.url.toString()=='http://localhost:8080/signup')
    {
      console.log("Hi");
      req = req.clone();
      return next.handle(req);
    }
    
    if (sessionStorage.getItem('username') && sessionStorage.getItem('token')) {
      req = req.clone({
        setHeaders: {
          Authorization: sessionStorage.getItem('token')
        }
      })
    }
    return next.handle(req).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    if (error.error instanceof ErrorEvent) {
      sessionStorage.clear();
      
      location.reload()
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      console.log("Inside else");
      if(error instanceof HttpErrorResponse)
      {
        let errorMessage = `Error Code: ${error.status}\nUrl: ${error.url}`;
        console.log(HttpErrorResponse.name);
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
        console.log(errorMessage);
        console.log(JSON.stringify(error));
        console.log(error.headers.get("body"));
        if(error.url==="https://localhost:8443/downloadfile")
        {
          alert('FIle Not found');
        }
        else{
          alert("Invalid Credentials or Session Expired")
          sessionStorage.clear();
          location.reload();
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        

      }
      
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
     

  };
}