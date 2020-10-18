import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
   roles=['Lab','Cohort'];
   role:string;
   invalidSignUp:boolean;
   username:string;
   password:string;
  constructor(private signUp:AuthenticationService,private router: Router) { }

  ngOnInit() {
      

  }


   checkSignUp()
   {
        this.signUp.signUpService(this.username,this.password,this.role).subscribe(response => this.fetchData(response));
   }

   fetchData(data:string)
   {
          if(data=="Success")
          {

              window.alert("Sucessfull !!Login Again");
                 
               this.router.navigate(['']);
          }
          else{
            window.alert("Unsuccessful attempt!!SignUp Again");
          }
   }
   
}
