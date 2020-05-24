import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-background-cohort',
  templateUrl: './background-cohort.component.html',
  styleUrls: ['./background-cohort.component.css']
})
export class BackgroundCohortComponent implements OnInit {
  title: String;
  opened:boolean;

  constructor(private router: Router,private appService: AppService) {
    this.opened=false;
   }

   

  ngOnInit(): void {
    this.router.navigate(['/first']);
    this.appService.getTitle().subscribe(appTitle => this.title = appTitle);
  
  }

}
