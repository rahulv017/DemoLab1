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
   path=window.location.href;
  constructor( private router:Router, private loginservice:AuthenticationService)
  {
    this.path=this.path.substring(0,this.path.lastIndexOf('/'));
    this.validLogin = this.loginservice.isUserLoggedIn();
    this.roles = sessionStorage.getItem('roles');
  }

  username = '';
  password = '';
  validLogin;
  roles;
  lab = ["[lab]","[cohort]"]
  

  checkLogin() {
    (this.loginservice.authenticate(this.username, this.password).subscribe(
      data => {
       this.validLogin= true;
       console.log(data);
       //if(role)
      this.roles = data.roles;
      console.log(this.roles);
    }, error=>{
     // alert(error);
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
