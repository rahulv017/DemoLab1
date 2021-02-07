import { Component, ViewChild, ElementRef,AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { PathService } from './path.service';

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
   port=window.location.href;
  constructor( private router:Router, private loginservice:AuthenticationService,private pathS:PathService)
  {
    sessionStorage.setItem('validLogin',"false");
    if(sessionStorage.getItem('validLogin')=="false")
    {
      this.validLogin=false;
    }
    this.path=this.path.substring(0,this.path.lastIndexOf('/'));
  //this.port=this.port.substring(this.port.lastIndexOf(':'),this.port.lastIndexOf('/'));
 // this.port=':8080'; 
  this.pathS.setPath(this.path);
 //   this.pathS.setPort(this.port);
    console.log(this.pathS.getPath()+this.pathS.getPort());
    //this.validLogin = this.loginservice.isUserLoggedIn();
    this.roles = sessionStorage.getItem('roles');
    this.validLogin = false;
    this.validSignUp = false;
  }

  username = '';
  password = '';
  validLogin;
  validSignUp;
  roles;
  lab = ["[lab]","[cohort]"]
  

  checkLogin() {
    (this.loginservice.authenticate(this.username, this.password).subscribe(
      data => {
        sessionStorage.setItem("validLogin","true");
       this.validLogin= sessionStorage.getItem("validLogin")=="true"? true:false;
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

  onSignUp()
  {
    console.log("sigining up");
    this.validSignUp = true;
    this.router.navigate(['/signUp']);
    //this.validSignUp = false;
  }
}