import { Component, ViewChild, ElementRef,AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DemoLab';
  email:string;
  pass:string;
  @ViewChild('userForm',{read: ElementRef,static:false}) userForm:ElementRef;

  constructor( private router:Router, private loginservice:AuthenticationService)
  {
    this.validLogin = this.loginservice.isUserLoggedIn();
  }

  username = '';
  password = '';
  validLogin
  

  checkLogin() {
    (this.loginservice.authenticate(this.username, this.password).subscribe(
      data => {
       this.validLogin= true;
    }, error=>{
      this.validLogin = false;
    }
    )
    );
  }

  ngAfterViewInit()
  {
    console.log(this.userForm.nativeElement);
  
  }
}
