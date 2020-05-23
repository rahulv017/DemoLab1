import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpInterceptorService implements HttpInterceptor {
  
  constructor(private router:Router) { }
  
  intercept(req: HttpRequest<any>,next:HttpHandler){
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
      if(error instanceof HttpErrorResponse)
      {
        if(error.message=="File not found")
        {
          alert('FIle Not found error');
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
