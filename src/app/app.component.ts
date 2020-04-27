import { Component, ViewChild, ElementRef,AfterViewInit } from '@angular/core';
import { LabUser } from './lab-user';
import { Router } from '@angular/router';

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

  login:LabUser=new LabUser();
  constructor( private user:LabUser,private router:Router)
  {
  
  }
  onClick()
  {
    alert('You entered '+ this.login.username+' '+ this.login.pass);
    if(this.login.username==='vyasrahul017@gmail.com'&&this.login.pass==='rahul')
    {
      alert("Correct!!!");
      this.router.navigate(['/rackDetails']);
    }
    else{
          alert('Incorrect !! Try again');
          this.login.username='';
          this.login.pass='';
    }
    
  //  alert("OK!!");
  }

  ngAfterViewInit()
  {
    console.log(this.userForm.nativeElement);
  
  }
}
