import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {

  constructor(private router: Router, private loginservice: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    console.log(this.router.url.toString());
    
    if(this.router.url.toString()=="/signUp"){
      //this.router.navigate(['/signUp']);
      return false;
    }
    else if(this.loginservice.isUserLoggedIn())
      return true;
    this.router.navigate(['']);
    return false;
  }

}